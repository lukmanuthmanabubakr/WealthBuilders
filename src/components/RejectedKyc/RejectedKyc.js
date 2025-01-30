import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./RejectedKyc.css";

const RejectedKyc = () => {
  return (
    <div className="kyc-rejected-container">
      <div className="kyc-rejected-card">
        <FiAlertTriangle className="kyc-rejected-icon" />
        <h2>Your KYC Verification Was Rejected</h2>
        <p>
          Please review the uploaded documents carefully and ensure they meet the required criteria.
        </p>
        <Link to="/upload-kyc" className="kyc-reupload-link">
          Re-upload Documents
        </Link>
      </div>
    </div>
  );
};

export default RejectedKyc;
