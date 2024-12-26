import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RawData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const token = localStorage.getItem("authToken");
        // Check if the token is valid (not null and has three parts separated by dots)
        if (!token || token.split('.').length !== 3) {
            console.log('jwt malformed');
            setError(new Error('Invalid token'));
            setLoading(false);
            return;
        }

        axios.get('http://localhost:5005/api/bigquery-data', {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the request headers
            }
        })
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(err => {
            setError(err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Raw Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default RawData;
