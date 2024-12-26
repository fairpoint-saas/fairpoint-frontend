import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateCost from '../components/CreateCost';

const CreateCostPage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/costs');
    };


    return (
        <div className="p-8">
            <button onClick={handleBack} className="bg-gray-400">
                Back
            </button>
            <h1>Add New Cost/Ingredient</h1>
            <CreateCost />
        </div>
    );
};

export default CreateCostPage;