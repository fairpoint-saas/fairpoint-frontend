import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddProduct from '../components/AddProduct';

const AddProductPage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/products');
    };


    return (
        <div className="p-8">
            <button onClick={handleBack} className="bg-gray-400">
                Back
            </button>
            <h1>Add New Product</h1>
            <AddProduct />
        </div>
    );
};

export default AddProductPage;