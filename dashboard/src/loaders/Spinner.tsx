import React from "react";
import { RiLoader2Line } from "react-icons/ri";
import './spinner.css'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <RiLoader2Line className="animate-spin text-gray-500" size={18} />
    </div>
  );
};

export default LoadingSpinner;
