import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Spinner } from 'flowbite-react';
import { uploadImage } from '../api/productApi';

const VITE_API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('authToken');

const CreateCost = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [costType, setCostType] = useState('');
    const [unit, setUnit] = useState('');
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('');
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
        axios.post(`${VITE_API_URL}/api/costs`, {
            name,
            category,
            cost_type : costType,
            unit,
            value,
            currency,
            imageUrl: imageUrl
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                alert('Cost created successfully!');
                setName('');
                setCategory('');
                setCostType('');
                setUnit('');
                setValue('');
                setCurrency('');
                navigate('/costs');
            })
            .catch(err => {
                alert('Failed to create cost');
            });
    };

    return (
        <Card className="flex flex-col w-2/3 p-4 ml-20">
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                <div className="flex flex-col flex-grow">
                    <label htmlFor="name">Cost name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='input'
                        placeholder='Ingredient name, ...'
                    />
                </div>
                
                <div className="flex flex-col flex-grow">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='input'
                    >
                        <option value="">Select category</option>
                        <option value="main">Main</option>
                        <option value="extra">Extra</option>
                    </select>
                </div>

                <div className="flex flex-col flex-grow">
                    <label htmlFor="costType">Cost type</label>
                    <select
                        id="costType"
                        value={costType}
                        onChange={(e) => setCostType(e.target.value)}
                        className='input'
                    >
                        <option value="">Select cost type</option>
                        <option value="material">Material</option>
                        <option value="hr">HR</option>
                        <option value="place">Place</option>
                        <option value="energy">Energy</option>
                    </select>
                </div>
                <div className="flex flex-col flex-grow">
                    <label htmlFor="unitPrice">Unit of mesure</label>
                    <input
                        type="text"
                        id="unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="input"
                        placeholder="unit, g, m, l, KWh, h, ..."
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <label htmlFor="value">Value</label>
                    <input
                        type="text"
                        id="value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className='input'
                        placeholder='how much does it cost ?'
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <label htmlFor="currency">Currency</label>
                    <input
                        type="text"
                        id="unit"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="input"
                        placeholder="$, €, ..."
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

                <button type="submit" disabled={isUploading} className="self-center mt-10">Add Unit Cost</button>
            </form>
        </Card>
    );
};

export default CreateCost;
