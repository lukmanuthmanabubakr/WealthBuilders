import React, { useEffect, useState } from "react";
import resetP from "../../../Assets/resssst.svg";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { RESET, resetPassword } from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

const initialState = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, confirmPassword } = formData;
  const { resetToken } = useParams();
  // console.log(resetToken);

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
  };

  useEffect(() => {
    if (isSuccess && message.includes("Reset Successful")) {
      navigate("/login");
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

  return (
    <>
      <div className="rPassAspect">
        <div className="loginSvg">
          <img src={resetP} alt="Login" />
        </div>
        <div className="loginContainer">
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
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
            />
            <ButtonLoader className="submit" type="submit" isLoading={isLoading}>
              Reset Password
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

export default ResetPassword;
