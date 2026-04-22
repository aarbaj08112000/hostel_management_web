export const BASE_URL = 'https://trang-weldable-semiacademically.ngrok-free.dev';

// Helper to get token from localStorage
const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

// Helper for authenticated headers
const getHeaders = () => {
    const headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    };
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/users/users-login`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok || data.settings.success === 0) {
        throw new Error(data.settings.message || 'Login failed');
    }

    // Store token and user data
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user_data', JSON.stringify(data.data.user_data));
    }

    return data;
};

export const fetchHostels = async (params = {}) => {
    const response = await fetch(`${BASE_URL}/core/hostle-list`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            page: params.page || 0,
            limit: params.limit || 0,
            sort: params.sort || {},
            filters: params.filters || {},
            search: params.search || {},
            is_dropdown: params.is_dropdown || "string"
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch hostels');
    }

    return await response.json();
};
