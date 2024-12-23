// ButtonLoader.js
import React from "react";
import "./ButtonLoader.css"; // Make sure to create a corresponding CSS file for styling

const ButtonLoader = ({ isLoading, children, ...props }) => {
  return (
    <button {...props} disabled={isLoading}>
      {isLoading ? <div className="spinner"></div> : children}
    </button>
  );
};

export default ButtonLoader;
