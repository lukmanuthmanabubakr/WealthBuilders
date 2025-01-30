import React from "react";
import { FiClock, FiInfo } from "react-icons/fi";
import "./kycPending.css";

const KycPending = () => {
  return (
    <div className="kyc-pending-container">
      <div className="kyc-pending-card">
        <FiClock className="kyc-pending-icon" />
        <h2>Your KYC is Under Review</h2>
        <p>
          Your KYC documents have been submitted successfully. Our team is
          currently reviewing them.
        </p>
        <div className="kyc-pending-info">
          <FiInfo className="info-icon" />
          <p>
            You will receive an email once your verification is approved or
            rejected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KycPending;
