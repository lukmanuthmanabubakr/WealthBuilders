import React, { useEffect, useState } from "react";
import "./SignUp.css";
import signUp from "../../../Assets/welcoms.svg";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import { FaTimes, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { validateEmail, validatePhoneNumber } from "../../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  RESET,
  sendVerificationEmail,
} from "../../../redux/features/auth/authSlice";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  confirmPassword: "",
  referralCode: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);

  const { name, email, password, confirmPassword, referralCode, phone } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <FaCheck color="green" size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check for PASSWORD LENGTH
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);
  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (!validatePhoneNumber(phone)) {
      return toast.error("Please enter a valid Phone Number");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
      phone,
      referralCode,
    };

    // console.log(userData);
    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/dashboard");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <>
      <div className="registerAspect">
        <div className="loginSvg">
          <img src={signUp} alt="Login" />
        </div>
        <div className="loginContainer">
          <h2>Register</h2>
          <form onSubmit={registerUser}>
            <input
              type="name"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
              className="nameInput"
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
              className="emailInput"
            />
            <input
              type="phone"
              placeholder="(phone)+12345678901"
              required
              name="phone"
              value={phone}
              onChange={handleInputChange}
              className="emailInput"
            />
            <input
              type="text"
              placeholder="Referral code (Optional)"
              name="referralCode"
              value={referralCode}
              onChange={handleInputChange}
              className="referInput"
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Cannot paste into input field");
                return false;
              }}
            />

            {/* Password strenght */}
            <div className="passwordStrength">
              <ul>
                <li>
                  {switchIcon(uCase)}
                  &nbsp; Lowercase & Uppercase
                </li>
                <li>
                  {switchIcon(num)}
                  &nbsp; Number (0 - 9)
                </li>
                <li>
                  {switchIcon(sChar)}
                  &nbsp;Special Character (!@#$%^&*)
                </li>
                <li>
                  {switchIcon(passLength)}
                  &nbsp; At least 6 Character
                </li>
              </ul>
            </div>
            {/* <button className="submit" type="submit">
            Register
          </button> */}
            <ButtonLoader
              className="submit"
              type="submit"
              isLoading={isLoading}
            >
              Register
            </ButtonLoader>
          </form>
          <div className="UserDontHaveAccount">
            <p>Already have an account ?</p>
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
