import React from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";

const ProductListPage = () => {
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate("/products/create");
  };

  return (
    <div className="relative p-4">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreateProduct}
          className="bg-[var(--secondary-color)] text-white mr-4 mt-10">
          + Create Product
        </button>
      </div>
      {/* <h1 className="text-2xl font-bold text-center mb-4">Here is your product list</h1> */}
      <h1 className="m-4">Here are the products</h1>
      <ProductList />
    </div>
  );
};

export default ProductListPage;
