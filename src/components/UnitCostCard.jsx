import { Card, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { deleteUnitCostById, updateUnitCostById } from "../api/costApi";
import { getProductsWithUnitCostId } from "../api/productApi";
import { useEffect, useState } from "react";

const categories = ['main', 'extra'];
const costTypes = ['material', 'hr', 'place', 'energy'];

const UnitCostCard = ({ unitCost, onDelete }) => {
  const navigate = useNavigate();
  const [deletables, setDeletables] = useState([unitCost._id, true]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUnitCost, setEditedUnitCost] = useState({ ...unitCost });
  const [currentUnitCost, setCurrentUnitCost] = useState({ ...unitCost });

  useEffect(() => {
    getProductsWithUnitCostId(unitCost._id).then((products) => {
      if (products.length > 0) {
        setDeletables([unitCost._id, false]);
      }
    });
  }, [unitCost._id]);

  useEffect(() => {
    setCurrentUnitCost({ ...unitCost });
  }, [unitCost]);

  const handleDelete = () => {
    deleteUnitCostById(unitCost._id)
      .then(() => {
        if (onDelete) {
          onDelete(unitCost._id);
        }
      })
      .catch((error) => {
        console.error("Error deleting unit Cost:", error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUnitCost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUnitCostById(unitCost._id, editedUnitCost)
      .then(() => {
        setIsEditing(false);
        setCurrentUnitCost({ ...editedUnitCost });
      })
      .catch((error) => {
        console.error("Error updating unit cost:", error);
      });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 max-w-64 flex flex-col">
      <div className="h-1/2 overflow-hidden">
        <img
          src={currentUnitCost.imageUrl}
          alt={currentUnitCost.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow p-4">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedUnitCost.name}
              onChange={handleEditChange}
              className="input text-lg font-bold text-purple-700"
            />
            <select
              name="category"
              value={editedUnitCost.category}
              onChange={handleEditChange}
              className="mt-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              name="cost_type"
              value={editedUnitCost.cost_type}
              onChange={handleEditChange}
              className="mt-2"
            >
              {costTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="value"
              value={editedUnitCost.value}
              onChange={handleEditChange}
              className="input"
            />
            <input
              type="text"
              name="currency"
              value={editedUnitCost.currency}
              onChange={handleEditChange}
              className="input"
            />
            <input
              type="text"
              name="unit"
              value={editedUnitCost.unit}
              onChange={handleEditChange}
              className="input"
            />
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-purple-700">{currentUnitCost.name}</h3>
            <p>{currentUnitCost.category} {currentUnitCost.cost_type}</p>
            <p>costs <span className="font-bold text-purple-700">{currentUnitCost.currency}{Number(currentUnitCost.value).toFixed(2)}/{currentUnitCost.unit} </span></p>
          </>
        )}
        <div className="flex space-x-2 mt-auto">
          {isEditing ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <button
              className="rounded font-normal bg-white text-green-700 border border-green-500 py-2 px-4"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
          <Button
            color="failure"
            onClick={handleDelete}
            disabled={!deletables[1]}
            className={!deletables[1] ? "bg-gray-400 cursor-not-allowed" : ""}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnitCostCard;