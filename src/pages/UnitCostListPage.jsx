import React from "react";
import { useNavigate } from "react-router-dom";
import UnitCostList from "../components/UnitCostList";

const UnitCostListPage = () => {
  const navigate = useNavigate();

  const handleCreateUnitCost = () => {
    navigate("/costs/create");
  };

  return (
    <div className="relative p-4">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreateUnitCost}
          className="bg-[var(--secondary-color)] text-white mr-4 mt-10"
        >
          + Create Unit Cost
        </button>
      </div>
      <h1 className="m-4">Ingredients and other Costs</h1>
      <UnitCostList />
    </div>
  );
};

export default UnitCostListPage;
