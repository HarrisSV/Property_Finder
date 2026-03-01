from sqlalchemy import Column, Integer, String, Float, Text
from database import Base


class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    city = Column(String(50), nullable=False, index=True)
    locality = Column(String(100), nullable=False)
    property_type = Column(String(50), nullable=False)  # Apartment, Villa, Plot
    listing_type = Column(String(10), nullable=False, index=True)  # buy, rent
    price = Column(Float, nullable=False, index=True)
    area_sqft = Column(Integer, nullable=False)
    bedrooms = Column(Integer, nullable=False)
    bathrooms = Column(Integer, nullable=False)
    image_url = Column(String(500), nullable=False)
    amenities = Column(Text, nullable=False)  # Comma-separated
    posted_date = Column(String(20), nullable=False)
    furnishing = Column(String(50), nullable=False, default="Semi-Furnished")
    parking = Column(Integer, nullable=False, default=1)
    floor_number = Column(Integer, nullable=True)
    total_floors = Column(Integer, nullable=True)
