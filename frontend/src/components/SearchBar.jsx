import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ initialValues = {}, compact = false }) {
    const navigate = useNavigate();
    const [city, setCity] = useState(initialValues.city || '');
    const [listingType, setListingType] = useState(initialValues.type || 'buy');
    const [minPrice, setMinPrice] = useState(initialValues.min_price || '');
    const [maxPrice, setMaxPrice] = useState(initialValues.max_price || '');
    const [search, setSearch] = useState(initialValues.search || '');

    const buyPriceRanges = [
        { label: 'Min Budget', value: '' },
        { label: '₹20 Lakh', value: '2000000' },
        { label: '₹50 Lakh', value: '5000000' },
        { label: '₹1 Cr', value: '10000000' },
        { label: '₹2 Cr', value: '20000000' },
        { label: '₹5 Cr', value: '50000000' },
    ];

    const buyMaxRanges = [
        { label: 'Max Budget', value: '' },
        { label: '₹50 Lakh', value: '5000000' },
        { label: '₹1 Cr', value: '10000000' },
        { label: '₹2 Cr', value: '20000000' },
        { label: '₹5 Cr', value: '50000000' },
        { label: '₹10 Cr+', value: '1000000000' },
    ];

    const rentPriceRanges = [
        { label: 'Min Rent', value: '' },
        { label: '₹10,000', value: '10000' },
        { label: '₹20,000', value: '20000' },
        { label: '₹30,000', value: '30000' },
        { label: '₹50,000', value: '50000' },
    ];

    const rentMaxRanges = [
        { label: 'Max Rent', value: '' },
        { label: '₹15,000', value: '15000' },
        { label: '₹25,000', value: '25000' },
        { label: '₹40,000', value: '40000' },
        { label: '₹60,000', value: '60000' },
        { label: '₹1,00,000+', value: '10000000' },
    ];

    const minRanges = listingType === 'rent' ? rentPriceRanges : buyPriceRanges;
    const maxRanges = listingType === 'rent' ? rentMaxRanges : buyMaxRanges;

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (city) params.set('city', city);
        if (listingType) params.set('type', listingType);
        if (minPrice) params.set('min_price', minPrice);
        if (maxPrice) params.set('max_price', maxPrice);
        if (search) params.set('search', search);
        navigate(`/properties?${params.toString()}`);
    };

    return (
        <form className={`search-bar ${compact ? 'compact' : ''}`} onSubmit={handleSearch}>
            <div className="search-bar-top">
                <div className="listing-toggle">
                    <button
                        type="button"
                        className={`toggle-btn ${listingType === 'buy' ? 'active' : ''}`}
                        onClick={() => { setListingType('buy'); setMinPrice(''); setMaxPrice(''); }}
                    >
                        Buy
                    </button>
                    <button
                        type="button"
                        className={`toggle-btn ${listingType === 'rent' ? 'active' : ''}`}
                        onClick={() => { setListingType('rent'); setMinPrice(''); setMaxPrice(''); }}
                    >
                        Rent
                    </button>
                </div>
            </div>
            <div className="search-bar-fields">
                <div className="search-field city-field">
                    <label>City</label>
                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">All Cities</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>
                </div>
                <div className="search-field keyword-field">
                    <label>Search</label>
                    <input
                        type="text"
                        placeholder="Search locality, project..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="search-field budget-field">
                    <label>Min Budget</label>
                    <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
                        {minRanges.map((r) => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                    </select>
                </div>
                <div className="search-field budget-field">
                    <label>Max Budget</label>
                    <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
                        {maxRanges.map((r) => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="search-btn">
                    <span className="search-icon">🔍</span>
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;
