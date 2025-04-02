import React from "react";
import "./FullPageLoader.css"
const FullPageLoader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <h2>Loading...</h2>
    </div>
  );
};

export default FullPageLoader;
