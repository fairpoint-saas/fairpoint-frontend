import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CostList from "./CostList";
import { getAllCosts } from "../api/costApi";
import { Card } from "flowbite-react";
import { calculateTotalCost } from "../services/calculate-total-cost";
import { updateProduct } from "../api/productApi";

const ProductDetails = ({ product, onAddCost, onUpdateCost, onDeleteCost }) => {
  const [newCost, setNewCost] = useState({ costId: "", quantity: "", unit: "" });
  const [availableCosts, setAvailableCosts] = useState([]);
  const [productCostIds, setProductCostIds] = useState([]);
  const [unitTotalCost, setUnitTotalCost] = useState(0);
  const [baseQuantity, setBaseQuantity] = useState(product.base_quantity);
  const [unitPrice, setUnitPrice] = useState((unitTotalCost * 1.2).toFixed(2));
  const navigate = useNavigate();

  useEffect(() => {
    // Update the state whenever the product's costs change
    setProductCostIds(product.costs.map(cost => cost.cost._id));
    const totalCost = calculateTotalCost(product, availableCosts);
    setUnitTotalCost((totalCost / baseQuantity).toFixed(2));
    setUnitPrice((totalCost / baseQuantity * 1.2).toFixed(2));
  }, [product, availableCosts, baseQuantity]);

  useEffect(() => {
    getAllCosts()
      .then((data) => {
        setAvailableCosts(data);
      })
      .catch((error) => console.error("Error fetching costs:", error));
  }, []);

  const filteredCosts = availableCosts.filter(cost => !productCostIds.includes(cost._id));

  const handleAddCost = () => {
    onAddCost(newCost);
    setNewCost({ costId: "", quantity: "", unit: "" });
  };

  const handleSave = () => {
    const updatedProductData = {
      base_quantity: baseQuantity,
      unit_total_cost: unitTotalCost,
      unit_price: unitPrice
    };

    updateProduct(product._id, updatedProductData)
      .then((updatedProduct) => {
        console.log("Product updated successfully:", updatedProduct);
        navigate("/products");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleCostChange = (e) => {
    const selectedCost = availableCosts.find(cost => cost._id === e.target.value);
    setNewCost((prev) => ({
      ...prev,
      costId: e.target.value,
      unit: selectedCost ? selectedCost.unit : ""
    }));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <div className="flex flex-wrap gap-4 mb-10 mt-5">
        <Card className="w-full md:w-2/3" imgSrc={product.imageUrl} horizontal>
          <div>
            <p>Base Quantity: {baseQuantity}</p>
            <input
              type="range"
              min="1"
              max="51"
              value={baseQuantity}
              onChange={(e) => setBaseQuantity(e.target.value)}
              className="slider"
            />
            <p className="mt-4">1 portion (or unit) costs <span className="text-xl font-bold text-secondary pt-4">{unitTotalCost} €</span></p>
            <p>for 20% margin, the price <span className="text-2xl font-bold text-primary-color">{unitPrice} €</span></p>
          </div>
        </Card>
        <Card className="w-full md:w-1/3">
          <div className="">
            <select
              value={newCost.costId}
              onChange={handleCostChange}
              className="input"
            >
              <option value="">Select Cost</option>
              {filteredCosts.map(cost => (
                <option key={cost._id} value={cost._id}>
                  {cost.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={newCost.quantity}
              onChange={(e) =>
                setNewCost((prev) => ({ ...prev, quantity: e.target.value }))
              }
              placeholder="Quantity"
              className="input"
            />
            <input
              type="text"
              value={newCost.unit}
              readOnly
              placeholder="Unit"
              className="input"
            />
            <button onClick={handleAddCost}>
              Add ingredient
            </button>
          </div>
        </Card>
      </div>

      <button onClick={handleSave} className="btn btn-primary mb-6 items-center" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
        Save
      </button>

      <h2 className="text-xl font-bold text-gray-800">Ingredients</h2>
      <Card className="mb-5 mt-5 p-4">
        <CostList
          costs={product.costs}
          onUpdate={onUpdateCost}
          onDelete={onDeleteCost}
        />
      </Card>
    </div>
  );
};

export default ProductDetails;
