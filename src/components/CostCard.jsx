import { useState, useEffect } from "react";
import { getAllCosts } from "../api/costApi";

import { Link } from "react-router-dom";
import '../css/App.css';

const CostCard = ({ cost, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [quantity, setQuantity] = useState(cost.quantity);
  const [unit, setUnit] = useState(cost.unit);
  const [costDetails, setCostDetails] = useState(null);

  useEffect(() => {
    getAllCosts()
      .then((data) => {
        const costDetail = data.find((c) => c._id === cost.cost._id);
        setCostDetails(costDetail);
        onUpdate(cost._id, { quantity, unit });
      })
      .catch((error) => console.error("Error fetching cost details:", error));
  }, [cost.cost._id]);

  const handleSave = () => {
    onUpdate(cost._id, { quantity, unit });
    setEditMode(false);
  };

  return (
    <div className="p-4 border-b rounded-lg">
      {costDetails ? (
        <div className="flex flex-col">

          <div className="flex justify-between py-2">
            <div className="flex-1">{costDetails.name}</div>
            <div className="flex-1">{costDetails.category}</div>
            <div className="flex-1">{costDetails.cost_type}</div>
            {/* <div className="flex-1">{costDetails._id}</div> */}
            <div className="flex-1">                  
              <p>
                    {editMode ? (
                      <div >
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="input ml-4"
                          placeholder="quantity in numbers"
                        />
                        <input
                          type="text"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          className="input ml-4"
                          placeholder="unit"
                        />
                      </div>
                    ) : (
                      `${quantity} ${unit}`
                    )}
                  </p></div>
            <div className="flex-1">
              {editMode ? (
                <button onClick={handleSave} >Save</button>
              ) : (
                <Link onClick={() => setEditMode(true)} className="text-green-500">
                  Edit
                </Link>
              )}
              <Link onClick={() => onDelete(cost._id)} className="text-red-500 ml-2">
                Delete
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading cost details...</p>
      )}
    </div>
  );
};

export default CostCard;
