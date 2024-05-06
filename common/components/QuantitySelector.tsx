import React from "react";
import { QuantitySelectorProps } from "../types/common.types";

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 bg-white shadow-sm p-2 rounded-md">
        <button
          onClick={onDecrement}
          className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          -
        </button>
        <span
          className="text-lg font-semibold text-gray-900 w-12 text-center"
          style={{ minWidth: "50px" }}
        >
          {quantity}
        </span>
        <button
          onClick={onIncrement}
          className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
