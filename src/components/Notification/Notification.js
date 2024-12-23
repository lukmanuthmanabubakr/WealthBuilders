
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET, sendVerificationEmail } from "../../redux/features/auth/authSlice";
import { FiAlertCircle } from "react-icons/fi"; // Alert icon
import "./Notification.css";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const Notification = () => {
  const dispatch = useDispatch();

  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };

  const { isLoading } =
  useSelector((state) => state.auth);

  return (
    <div className="notification-container">
      <div className="notification-card">
        <FiAlertCircle className="alert-icon" />
        <div className="notification-content">
          <p><b>Account Verification Needed</b></p>
          <p>Check your email for a verification link to activate your account.</p>
          <ButtonLoader isLoading={isLoading} className="resend-button" onClick={sendVerEmail}>
            Resend Verification Link
          </ButtonLoader>
        </div>
      </div>
    </div>
  );
};

export default Notification;
