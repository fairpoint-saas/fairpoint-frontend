import { Card, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { deleteProductById } from "../api/productApi";

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteProductById(product._id)
      .then(() => {
        if (onDelete) {
          onDelete(product._id); // allow parent component to update UI
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 max-w-64 flex flex-col">
      <div className="h-1/2 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow p-4">
        <h3 className="text-lg font-bold  text-purple-700">{product.name}</h3>
        <p>Total Cost: ${product.unit_total_cost.toFixed(2)}</p>
        <p>Price: ${product.unit_price.toFixed(2)}</p>
        <p>Number of ingredients: {product.costs.length}</p>
        <div className="flex space-x-2 mt-auto">
          <button className="rounded font-normal bg-white text-green-700 border border-green-500 py-2 px-4" onClick={() => navigate(`/products/${product._id}`)}>Edit</button>
          <Button color="failure" onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


//class="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 max-w-64 flex flex-col"