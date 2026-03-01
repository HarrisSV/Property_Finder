import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import { fetchProperties } from '../api';

function PropertiesPage() {
    const [searchParams] = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');

    const city = searchParams.get('city') || '';
    const type = searchParams.get('type') || '';
    const minPrice = searchParams.get('min_price') || '';
    const maxPrice = searchParams.get('max_price') || '';
    const search = searchParams.get('search') || '';
    const propertyType = searchParams.get('property_type') || '';

    useEffect(() => {
        setLoading(true);
        fetchProperties({
            city, type, min_price: minPrice, max_price: maxPrice,
            search, property_type: propertyType, sort_by: sortBy,
        })
            .then((data) => {
                setProperties(data.properties);
                setTotal(data.total);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [city, type, minPrice, maxPrice, search, propertyType, sortBy]);

    const getPageTitle = () => {
        let title = 'All Properties';
        if (type === 'buy') title = 'Properties for Sale';
        if (type === 'rent') title = 'Properties for Rent';
        if (city) title += ` in ${city}`;
        return title;
    };

    return (
        <div className="properties-page">
            <div className="properties-header">
                <div className="section-container">
                    <SearchBar
                        compact
                        initialValues={{ city, type, min_price: minPrice, max_price: maxPrice, search }}
                    />
                </div>
            </div>

            <div className="properties-content section-container">
                <div className="properties-toolbar">
                    <div className="toolbar-left">
                        <h2 className="page-title">{getPageTitle()}</h2>
                        <span className="results-count">{total} properties found</span>
                    </div>
                    <div className="toolbar-right">
                        <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                        <select
                            id="sort-select"
                            className="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading properties...</p>
                    </div>
                ) : properties.length === 0 ? (
                    <div className="no-results">
                        <div className="no-results-icon">🏘️</div>
                        <h3>No properties found</h3>
                        <p>Try adjusting your filters or search terms</p>
                    </div>
                ) : (
                    <div className="properties-grid">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PropertiesPage;
