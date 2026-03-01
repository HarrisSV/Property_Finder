const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api';

export async function fetchProperties(params = {}) {
    const queryParams = new URLSearchParams();

    if (params.city) queryParams.append('city', params.city);
    if (params.type) queryParams.append('type', params.type);
    if (params.property_type) queryParams.append('property_type', params.property_type);
    if (params.min_price) queryParams.append('min_price', params.min_price);
    if (params.max_price) queryParams.append('max_price', params.max_price);
    if (params.bedrooms) queryParams.append('bedrooms', params.bedrooms);
    if (params.search) queryParams.append('search', params.search);
    if (params.sort_by) queryParams.append('sort_by', params.sort_by);

    const response = await fetch(`${API_BASE}/properties?${queryParams.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch properties');
    return response.json();
}

export async function fetchProperty(id) {
    const response = await fetch(`${API_BASE}/properties/${id}`);
    if (!response.ok) throw new Error('Property not found');
    return response.json();
}

export function formatPrice(price, listingType) {
    if (listingType === 'rent') {
        return `₹${price.toLocaleString('en-IN')}/mo`;
    }
    if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
        return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
}
