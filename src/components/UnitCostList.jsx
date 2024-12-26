import axios from "axios";
import React, { useEffect, useState } from "react";
import UnitCostCard from "./UnitCostCard";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const UnitCostList = () => {
  const [unitCosts, setUnitCosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${VITE_API_URL}/api/costs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUnitCosts(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setUnitCosts([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching unit costs:", err);
        setError(err.message);
      });
  }, []);

  const handleDelete = (deletedUnitCostId) => {
    setUnitCosts(unitCosts.filter((unitCost) => unitCost._id !== deletedUnitCostId));
  };

  if (error) {
    return <div>Error loading unit costs for ingredients: {error}</div>;
  }

  if (!unitCosts.length) {
    return <div>No unit costs for ingredients available</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {unitCosts && unitCosts.map((unitCost) => (
        <UnitCostCard key={unitCost._id} unitCost={unitCost} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default UnitCostList;
