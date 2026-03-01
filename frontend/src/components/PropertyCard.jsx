import { Link } from 'react-router-dom';
import { formatPrice } from '../api';

function PropertyCard({ property }) {
    const amenitiesList = property.amenities.split(',').slice(0, 3);

    return (
        <Link to={`/properties/${property.id}`} className="property-card">
            <div className="property-card-image">
                <img src={property.image_url} alt={property.title} loading="lazy" />
                <div className="property-card-badge">
                    <span className={`badge ${property.listing_type}`}>
                        {property.listing_type === 'buy' ? 'For Sale' : 'For Rent'}
                    </span>
                </div>
                <div className="property-card-type">
                    <span className="type-badge">{property.property_type}</span>
                </div>
            </div>
            <div className="property-card-content">
                <div className="property-card-price">
                    {formatPrice(property.price, property.listing_type)}
                </div>
                <h3 className="property-card-title">{property.title}</h3>
                <p className="property-card-location">
                    📍 {property.locality}, {property.city}
                </p>
                <div className="property-card-specs">
                    {property.bedrooms > 0 && (
                        <span className="spec">🛏️ {property.bedrooms} BHK</span>
                    )}
                    <span className="spec">📐 {property.area_sqft} sq.ft</span>
                    {property.bathrooms > 0 && (
                        <span className="spec">🚿 {property.bathrooms} Bath</span>
                    )}
                </div>
                <div className="property-card-amenities">
                    {amenitiesList.map((amenity, i) => (
                        <span key={i} className="amenity-tag">{amenity.trim()}</span>
                    ))}
                    {property.amenities.split(',').length > 3 && (
                        <span className="amenity-tag more">+{property.amenities.split(',').length - 3}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default PropertyCard;
