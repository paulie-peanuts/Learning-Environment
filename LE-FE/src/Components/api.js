// api.js
const API_URL = 'http://localhost:5152/api'; // Your API base URL

export const fetchProtectedData = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/protected`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return response.json(); // Return the data if successful
};
