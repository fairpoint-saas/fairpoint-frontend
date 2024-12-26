import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-700">Page Not Found</p>
      <NavLink to="/" className="mt-4 text-blue-500 underline">Go to Home</NavLink>
    </div>
  );
};

export default NotFoundPage;