import React, { useState } from "react";
import "./ChangePassword.css";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { toast } from "react-toastify";
import {
  changePassword,
  logout,
  RESET,
} from "../../../redux/features/auth/authSlice";
import Loader from "../../../components/Loader/Loader";
import { sendAutomatedEmail } from "../../../redux/features/email/emailSlice";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";
import {changerP} from "../../../Assets/undraw_secure_login_pdn4 (1).svg"

const initialState = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  useRedirectLoggedOutUser("/login");
  const [formData, setFormData] = useState(initialState);

  const { oldPassword, password, confirmPassword } = formData;

  const { isLoading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Password Changed - WealthBuilders",
      send_to: user.email,
      reply_to: "noreply@WealthBuilders",
      template: "changePassword",
      url: "/forgot",
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET(userData));
    navigate("/login");
  };

  return (
    <>
      <div className="changePassword">
        <h2>Change Password</h2>

        <form onSubmit={updatePassword} className="changePassForm">
          <label>Old Password</label>
          <PasswordInput
            placeholder="Old Password"
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <label>New Password</label>
          <PasswordInput
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <label>New Password</label>
          <PasswordInput
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          <ButtonLoader type="submit" className="changeP" isLoading={isLoading}>
            Change Password
          </ButtonLoader>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;