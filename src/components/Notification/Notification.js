import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlice";
import { FiAlertCircle } from "react-icons/fi"; // Alert icon
import "./Notification.css";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import { NavLink } from "react-router-dom";

const Notification = () => {
  const dispatch = useDispatch();

  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };

  const { isLoading } = useSelector((state) => state.auth);

  return (
    <div className="notification-container">
      <div className="notification-card">
        <FiAlertCircle className="alert-icon" />
        <div className="notification-content">
          <p>
            <b>Account Verification Needed</b>
          </p>
          <p>
            Check your email for a verification link to activate your account,
            If you did not receive email
          </p>
          <div className="navBtsn">
            <ButtonLoader
              isLoading={isLoading}
              className="resend-button"
              onClick={sendVerEmail}
            >
              Resend Verification Link
            </ButtonLoader>
            <NavLink
              isLoading={isLoading}
              className="contact-button"
              target="_blank"
              to="https://www.wealtybuilders.com/contact"
            >
              Contact Support
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
