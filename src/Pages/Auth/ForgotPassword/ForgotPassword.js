import React, { useState } from "react";
import fPass from "../../../Assets/forgotttt.svg";
import { NavLink } from "react-router-dom";
import "./ForgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../../redux/features/auth/authService";
import { toast } from "react-toastify";
import { forgotPassword, RESET } from "../../../redux/features/auth/authSlice";
import Loader from "../../../components/Loader/Loader";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const forgot = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };

  return (
    <>
      <div className="forgotPassAspect">
        <div className="loginSvg">
          <img src={fPass} alt="Login" />
        </div>
        <div className="loginContainer">
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="emailInput"
            />
            <ButtonLoader className="submit" type="submit"  isLoading={isLoading}>
              Get Reset Email
            </ButtonLoader>
          </form>
          <div className="UserDontHaveAccount">
            <p>Already have an account ?</p>
            <NavLink to="/register">Register</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
