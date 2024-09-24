import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ItemList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5152/api/items') // Adjust port to match your backend
            .then(response => setItems(response.data))
            .catch(error => console.error('There was an error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Item List</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
