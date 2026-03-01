import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { fetchProperties } from '../api';

function HomePage() {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperties({ sort_by: 'newest' })
            .then((data) => {
                setFeaturedProperties(data.properties.slice(0, 6));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Find Your Dream <span className="highlight">Property</span>
                    </h1>
                    <p className="hero-subtitle">
                        Discover premium properties in Bangalore & Mumbai — Buy or Rent your perfect home
                    </p>
                    <SearchBar />
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-number">20+</span>
                        <span className="stat-label">Properties Listed</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">2</span>
                        <span className="stat-label">Cities Covered</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">₹6.5L</span>
                        <span className="stat-label">Lowest Price</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">100%</span>
                        <span className="stat-label">Verified Listings</span>
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="featured-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Properties</h2>
                        <Link to="/properties" className="view-all-link">View All →</Link>
                    </div>
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading properties...</p>
                        </div>
                    ) : (
                        <div className="properties-grid">
                            {featuredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Cities Section */}
            <section className="cities-section">
                <div className="section-container">
                    <h2 className="section-title">Explore by City</h2>
                    <div className="cities-grid">
                        <Link to="/properties?city=Bangalore" className="city-card bangalore">
                            <div className="city-overlay"></div>
                            <div className="city-info">
                                <h3>Bangalore</h3>
                                <p>Silicon Valley of India</p>
                                <span className="city-cta">Explore Properties →</span>
                            </div>
                        </Link>
                        <Link to="/properties?city=Mumbai" className="city-card mumbai">
                            <div className="city-overlay"></div>
                            <div className="city-info">
                                <h3>Mumbai</h3>
                                <p>Financial Capital of India</p>
                                <span className="city-cta">Explore Properties →</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
