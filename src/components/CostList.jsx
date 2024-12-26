import CostCard from "./CostCard";
import { Table } from "flowbite-react";

const CostList = ({ costs, onUpdate, onDelete }) => (
  <div>

      <div className="flex justify-between border-radius-top py-2">
            <div className="flex-1 font-bold">Name</div>
            <div className="flex-1 font-bold">Category</div>
            <div className="flex-1 font-bold">Cost Type</div>
            <div className="flex-1 font-bold">Quantity</div>
            <div className="flex-1 font-bold">Actions</div>
          </div>

    {costs.map((cost) => (
      <CostCard
        key={cost._id}
        cost={cost}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default CostList;
