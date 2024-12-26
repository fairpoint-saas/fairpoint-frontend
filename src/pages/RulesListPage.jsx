import React from 'react';
import axios from 'axios';

const RulesListPage = () => {
    const handleButtonClick = () => {
        const authToken = localStorage.getItem("authToken"); // Replace with your actual auth token

        axios.post('http://localhost:5005/api/generate-sql', {}, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            console.log('API response:', response.data);
        })
        .catch(error => {
            console.error('Error calling API:', error);
        });
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Generate SQL</button>
        </div>
    );
};

export default RulesListPage;