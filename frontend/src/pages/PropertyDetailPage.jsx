import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProperty, formatPrice } from '../api';

function PropertyDetailPage() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperty(id)
            .then((data) => {
                setProperty(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="detail-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading property details...</p>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="detail-page">
                <div className="no-results">
                    <h3>Property not found</h3>
                    <Link to="/properties" className="back-link">← Back to all properties</Link>
                </div>
            </div>
        );
    }

    const amenitiesList = property.amenities.split(',').map((a) => a.trim());

    return (
        <div className="detail-page">
            <div className="detail-container section-container">
                <Link to="/properties" className="back-link">← Back to Properties</Link>

                <div className="detail-hero">
                    <div className="detail-image-container">
                        <img src={property.image_url} alt={property.title} className="detail-image" />
                        <div className="detail-badges">
                            <span className={`badge large ${property.listing_type}`}>
                                {property.listing_type === 'buy' ? 'For Sale' : 'For Rent'}
                            </span>
                            <span className="type-badge large">{property.property_type}</span>
                        </div>
                    </div>
                </div>

                <div className="detail-grid">
                    <div className="detail-main">
                        <div className="detail-header">
                            <div>
                                <h1 className="detail-title">{property.title}</h1>
                                <p className="detail-location">📍 {property.locality}, {property.city}</p>
                            </div>
                            <div className="detail-price">
                                {formatPrice(property.price, property.listing_type)}
                            </div>
                        </div>

                        <div className="detail-specs-grid">
                            {property.bedrooms > 0 && (
                                <div className="detail-spec">
                                    <span className="spec-icon">🛏️</span>
                                    <span className="spec-value">{property.bedrooms}</span>
                                    <span className="spec-label">Bedrooms</span>
                                </div>
                            )}
                            {property.bathrooms > 0 && (
                                <div className="detail-spec">
                                    <span className="spec-icon">🚿</span>
                                    <span className="spec-value">{property.bathrooms}</span>
                                    <span className="spec-label">Bathrooms</span>
                                </div>
                            )}
                            <div className="detail-spec">
                                <span className="spec-icon">📐</span>
                                <span className="spec-value">{property.area_sqft}</span>
                                <span className="spec-label">Sq.ft</span>
                            </div>
                            <div className="detail-spec">
                                <span className="spec-icon">🪑</span>
                                <span className="spec-value">{property.furnishing}</span>
                                <span className="spec-label">Furnishing</span>
                            </div>
                            {property.parking > 0 && (
                                <div className="detail-spec">
                                    <span className="spec-icon">🅿️</span>
                                    <span className="spec-value">{property.parking}</span>
                                    <span className="spec-label">Parking</span>
                                </div>
                            )}
                            {property.floor_number && (
                                <div className="detail-spec">
                                    <span className="spec-icon">🏢</span>
                                    <span className="spec-value">{property.floor_number}/{property.total_floors}</span>
                                    <span className="spec-label">Floor</span>
                                </div>
                            )}
                        </div>

                        <div className="detail-section">
                            <h2>Description</h2>
                            <p className="detail-description">{property.description}</p>
                        </div>

                        <div className="detail-section">
                            <h2>Amenities</h2>
                            <div className="amenities-grid">
                                {amenitiesList.map((amenity, i) => (
                                    <div key={i} className="amenity-item">
                                        <span className="amenity-check">✓</span>
                                        {amenity}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="detail-section">
                            <p className="posted-date">📅 Posted on {property.posted_date}</p>
                        </div>
                    </div>

                    <div className="detail-sidebar">
                        <div className="contact-card">
                            <h3>Interested in this property?</h3>
                            <p>Get in touch with the seller/owner</p>
                            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you! We will get back to you soon.'); }}>
                                <input type="text" placeholder="Your Name" required />
                                <input type="email" placeholder="Your Email" required />
                                <input type="tel" placeholder="Your Phone" required />
                                <textarea placeholder="Your message..." rows={3}></textarea>
                                <button type="submit" className="contact-btn">Contact Now</button>
                            </form>
                            <div className="contact-phone">
                                <span>📞</span>
                                <span>+91 98765 43210</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetailPage;
