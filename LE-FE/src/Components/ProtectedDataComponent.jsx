import React, { useEffect, useState } from 'react';
import { fetchProtectedData } from './api'; // Import the utility function

const ProtectedDataComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchProtectedData();
                setData(result);
            } catch (error) {
                setError(error.message);
            }
        };

        getData();
    }, []);

    return (
        <div>
            {error && <p>Error fetching data: {error}</p>}
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProtectedDataComponent;
