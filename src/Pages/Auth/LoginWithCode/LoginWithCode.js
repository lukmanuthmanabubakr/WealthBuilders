import React, { useEffect, useState } from "react";
import sCode from "../../../Assets/codeeee.svg";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./LoginWithCode.css";
import {
  loginWithCode,
  RESET,
  sendLoginCode,
} from "../../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState("");
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const sendUserLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  const loginUserWithCode = async (e) => {
    e.preventDefault();

    if (loginCode === "") {
      return toast.error("Please fill in the login code");
    }
    if (loginCode.length !== 6) {
      return toast.error("Access code must be 6 characters");
    }

    const code = {
      loginCode,
    };

    await dispatch(loginWithCode({ code, email }));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/dashboard");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <>
      <div className="lWithCodePassAspect">
        <div className="loginSvg">
          <img src={sCode} alt="Login" />
        </div>
        <div className="loginContainer">
          <h2>Enter Access Code</h2>
          <form onSubmit={loginUserWithCode}>
            <input
              type="text"
              placeholder="Access code"
              required
              name="loginCode"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
              className="emailInput"
            />
            <ButtonLoader className="submit" type="submit" isLoading={isLoading}>
              Proceed To Login
            </ButtonLoader>
            <span className="cEmail">
              Check your email for login access code
            </span>
          </form>
          <div className="UserDontHaveAccount">
            <p>Didn't Receive Code ?</p>
            <b onClick={sendUserLoginCode}>Resend Code</b>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginWithCode;
