import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${VITE_API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err.message);
      });
  }, []);

  const handleDelete = (deletedProductId) => {
    setProducts(products.filter((product) => product._id !== deletedProductId));
  };

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  if (!products.length) {
    return <div>No products available</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {products && products.map((product) => (
        <ProductCard key={product._id} product={product} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ProductList;
