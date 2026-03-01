from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional, List
from pydantic import BaseModel

from database import engine, get_db, Base
from models import Property
from seed import get_seed_properties

app = FastAPI(title="PropertyFinder API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic response model
class PropertyResponse(BaseModel):
    id: int
    title: str
    description: str
    city: str
    locality: str
    property_type: str
    listing_type: str
    price: float
    area_sqft: int
    bedrooms: int
    bathrooms: int
    image_url: str
    amenities: str
    posted_date: str
    furnishing: str
    parking: int
    floor_number: Optional[int] = None
    total_floors: Optional[int] = None

    class Config:
        from_attributes = True


class PropertiesListResponse(BaseModel):
    total: int
    properties: List[PropertyResponse]


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    # Seed data if empty
    from database import SessionLocal
    db = SessionLocal()
    try:
        count = db.query(Property).count()
        if count == 0:
            properties = get_seed_properties()
            db.add_all(properties)
            db.commit()
            print(f"Seeded {len(properties)} properties")
    finally:
        db.close()


@app.get("/api/properties", response_model=PropertiesListResponse)
def list_properties(
    city: Optional[str] = Query(None, description="Filter by city"),
    listing_type: Optional[str] = Query(None, alias="type", description="buy or rent"),
    property_type: Optional[str] = Query(None, description="Apartment, Villa, or Plot"),
    min_price: Optional[float] = Query(None, description="Minimum price"),
    max_price: Optional[float] = Query(None, description="Maximum price"),
    bedrooms: Optional[int] = Query(None, description="Number of bedrooms"),
    search: Optional[str] = Query(None, description="Search keyword"),
    sort_by: Optional[str] = Query("newest", description="Sort: newest, price_low, price_high"),
    db: Session = Depends(get_db),
):
    query = db.query(Property)

    if city:
        query = query.filter(Property.city == city)
    if listing_type:
        query = query.filter(Property.listing_type == listing_type)
    if property_type:
        query = query.filter(Property.property_type == property_type)
    if min_price is not None:
        query = query.filter(Property.price >= min_price)
    if max_price is not None:
        query = query.filter(Property.price <= max_price)
    if bedrooms is not None:
        query = query.filter(Property.bedrooms == bedrooms)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Property.title.ilike(search_term),
                Property.description.ilike(search_term),
                Property.locality.ilike(search_term),
            )
        )

    # Sorting
    if sort_by == "price_low":
        query = query.order_by(Property.price.asc())
    elif sort_by == "price_high":
        query = query.order_by(Property.price.desc())
    else:
        query = query.order_by(Property.posted_date.desc())

    total = query.count()
    properties = query.all()

    return PropertiesListResponse(total=total, properties=properties)


@app.get("/api/properties/{property_id}", response_model=PropertyResponse)
def get_property(property_id: int, db: Session = Depends(get_db)):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Property not found")
    return prop


@app.get("/api/cities")
def get_cities():
    return {"cities": ["Bangalore", "Mumbai"]}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
