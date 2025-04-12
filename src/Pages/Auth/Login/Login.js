import React, { useEffect, useState } from "react";
import "./Login.css";
import LoginSvg from "../../../Assets/loggiiin.svg";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail } from "../../../redux/features/auth/authService";
import {
  login,
  loginWithGoogle,
  RESET,
  sendLoginCode,
} from "../../../redux/features/auth/authSlice";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";
import SuspendedModal from "../../../components/SuspendedModal/SuspendedModal"; // modal component

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [showSuspendedModal, setShowSuspendedModal] = useState(false);

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message, isError, twoFactor } =
    useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/dashboard");
    }

    if (isError && message.includes("suspended")) {
      setShowSuspendedModal(true);
    }

    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, email, message]);

  const googleLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
  };

  return (
    <>
      <div className="loginAspect">
        <div className="loginSvg">
          <img src={LoginSvg} alt="Login" />
        </div>
        <div className="loginContainer">
          <h2>Welcome Back!</h2>

          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
              className="emailInput"
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <ButtonLoader className="submit" type="submit" isLoading={isLoading}>
              Login
            </ButtonLoader>
          </form>

          <NavLink to="/forgot" className="forgotPassword">
            Forgot Password
          </NavLink>
          <div className="UserDontHaveAccount">
            <p>Don't have an account ?</p>
            <NavLink to="/register">Register</NavLink>
          </div>
        </div>
      </div>

      {/* Suspended Modal */}
      {showSuspendedModal && (
        <SuspendedModal onClose={() => setShowSuspendedModal(false)} />
      )}
    </>
  );
};

export default Login;
