import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Spinner } from 'flowbite-react';
import { uploadImage } from '../api/productApi';

const VITE_API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('authToken');

const AddProduct = () => {
    const [name, setName] = useState('');
    const [baseQuantity, setBaseQuantity] = useState('');
    const [costs, setCosts] = useState([]);
    const [unitTotalCost, setUnitTotalCost] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    // ******** this method handles the file upload ********
    const handleFileUpload = e => {
        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append('imageUrl', e.target.files[0]);

        uploadImage(uploadData)
            .then(response => {
                setImageUrl(response.fileUrl);
                setIsUploading(false);
            })
            .catch(err => {
                console.log('Error while uploading the file: ', err);
                setIsUploading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUploading) {
            alert('Please wait until the file is uploaded.');
            return;
        }
        axios.post(`${VITE_API_URL}/api/products`, {
            name,
            base_quantity: baseQuantity,
            costs: costs.length ? costs : [],
            unit_total_cost: unitTotalCost,
            unit_price: unitPrice,
            imageUrl: imageUrl
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                alert('Product added successfully!');
                setName('');
                setBaseQuantity('');
                setCosts([]);
                setUnitTotalCost('');
                setUnitPrice('');
                navigate('/products');
            })
            .catch(err => {
                alert('Failed to add product');
            });
    };

    return (
        <Card className="flex flex-col w-2/3 p-4 ml-20">
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                <div className="flex flex-col flex-grow">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='input'
                        placeholder='Name of your creation'
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <label htmlFor="baseQuantity">Base Quantity:</label>
                    <input
                        type="text"
                        id="baseQuantity"
                        value={baseQuantity}
                        onChange={(e) => setBaseQuantity(e.target.value)}
                        className='input'
                        placeholder='Quantity or Number of portions'
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <label htmlFor="unitTotalCost">Unit Total Cost:</label>
                    <input
                        type="text"
                        id="unitTotalCost"
                        value={unitTotalCost}
                        onChange={(e) => setUnitTotalCost(e.target.value)}
                        className='input'
                        placeholder='estimated cost per unit or portion'
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <label htmlFor="unitPrice">Unit Price:</label>
                    <input
                        type="text"
                        id="unitPrice"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        className="input"
                        placeholder="price of unit or portion"
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <label htmlFor="fileUpload">Upload your file:</label>
                    <input
                        type="file"
                        id="fileUpload"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <label
                        htmlFor="fileUpload"
                        className="flex items-center justify-center border border-gray-300 rounded cursor-pointer p-2"
                    >
                        {isUploading ? (
                            <>
                                <Spinner />
                                <span>Uploading ...</span>
                            </>
                        ) : (
                            <>
                                <img src="/upload.png" alt="Upload Logo" className="w-6 h-6 mr-2" />
                                <span className='text-gray-500'>Choose a file</span>
                            </>
                        )}
                    </label>
                </div>

                <button type="submit" disabled={isUploading} className="self-center mt-10">Add Product</button>
            </form>
        </Card>
    );
};

export default AddProduct;
