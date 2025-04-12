import React from "react";
import { Link } from "react-router-dom";
import "./SuspendedModal.css";

const SuspendedModal = () => {
  return (
    <div className="suspended-modal-overlay">
      <div className="suspended-modal">
        <h2>Account Suspended</h2>
        <p>
          We regret to inform you that your account has been temporarily suspended due to a violation of our platform's terms of service or an unresolved issue that requires your attention. 
          <br />
          Please contact us at <strong>+1 (414) 317‑2077</strong> or through the Help Center within the application for more information. We are here to assist you and will work with you to resolve this as quickly as possible.
        </p>
        <Link to="/contact" className="suspended-modal-link-button">
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default SuspendedModal;
