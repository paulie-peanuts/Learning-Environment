// src/Components/BookSummary.js
import React, { useState } from 'react';
import axios from 'axios';

const BookSummary = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [error, setError] = useState('');

    const fetchSummary = async () => {
        try {
            const response = await axios.post('http://localhost:5152/api/BookSummary/GetSummary', { bookTitle });
            setSummary(response.data.summary);
            setError('');
        } catch (error) {
            setError('Could not fetch summary. Please try again.');
            setSummary('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Get Book Summary</h2>
            <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Enter book title"
                style={{ marginRight: '10px' }}
            />
            <button onClick={fetchSummary}>Get Summary</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {summary && <div><h3>Summary:</h3><p>{summary}</p></div>}
        </div>
    );
};

export default BookSummary;
