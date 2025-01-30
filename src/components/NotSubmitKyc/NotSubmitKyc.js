import React from "react";
import { FiXCircle, FiAlertCircle } from "react-icons/fi";
import "./NotSubmitKyc.css";
import { NavLink } from "react-router-dom";

const NotSubmitKyc = ({ onClose }) => {
  return (
    <div className="kyc-overlay">
      <div className="kyc-card">
        <FiXCircle className="kyc-close" onClick={onClose} />
        <FiAlertCircle className="kyc-icon" />
        <h2>Complete Your KYC Verification</h2>
        <p>To access all features, please submit your KYC documents.</p>
        <div className="kyc-steps">
          <p><FiAlertCircle className="step-icon" /> Upload a valid government ID.</p>
          <p><FiAlertCircle className="step-icon" /> Provide a clear selfie for verification.</p>
          <p><FiAlertCircle className="step-icon" /> Wait for approval from our team.</p>
        </div>
        <NavLink className="kyc-button" to="/upload-kyc">Upload KYC</NavLink>
      </div>
    </div>
  );
};

export default NotSubmitKyc;
