import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  addCostToProduct,
  updateCostInProduct,
  deleteCostFromProduct,
} from "../api/productApi.js";
import ProductDetails from "../components/ProductDetails";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleAddCost = (newCost) => {
    addCostToProduct(id, newCost)
      .then((updatedProduct) => setProduct(updatedProduct))
      .catch((error) => console.error("Error adding cost:", error));
  };

  const handleUpdateCost = (costId, updatedData) => {
    updateCostInProduct(id, costId, updatedData)
      .then((updatedProduct) => setProduct(updatedProduct))
      .catch((error) => console.error("Error updating cost:", error));
  };

  const handleDeleteCost = (costId) => {
    deleteCostFromProduct(id, costId)
      .then((updatedProduct) => setProduct(updatedProduct))
      .catch((error) => console.error("Error deleting cost:", error));
  };

  const handleBack = () => {
    navigate('/products');
  };

  return (
    <div className="p-4">
      <button onClick={handleBack} className="bg-gray-400">
        Back
      </button>

      {product ? (
        <ProductDetails
          product={product}
          onAddCost={handleAddCost}
          onUpdateCost={handleUpdateCost}
          onDeleteCost={handleDeleteCost}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
