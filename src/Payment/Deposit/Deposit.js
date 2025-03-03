import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Deposit.css";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import { useSelector } from "react-redux";
import { IoIosWarning } from "react-icons/io";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GET_ADMIN_WALLET = `${BACKEND_URL}api/payments`;

const Deposit = ({ token }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useRedirectLoggedOutUser("/login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${GET_ADMIN_WALLET}/create`, {
        token,
        amount,
      });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error processing payment");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container-deposit">
      <div className="instructions-section">
        <h3>Steps to Deposit</h3>
        <p>1. Start a chat with support team</p>
        <p>2. Request to generate your private trading wallet address</p>
        <p>3. Buy any crypto asset and send to your trading wallet address</p>
        <p>4. Enter the amount sent to your trading wallet address in USD</p>
        <p>5. Click on "Deposit Payment"</p>
        <p>6. Wait for confirmation of your payment</p>
        <p>7. Once your payment is confirmed via email</p>
        <p>8. Congratulations you can now start investing.</p>
      </div>
      <div className="warning-section">
        <span>
          <IoIosWarning className="warning-icon" />
          <h3 className="warning-title">Warning</h3>
        </span>
        <div className="warning-content">
          <p>
            Ensure the same amount of USD sent to the wallet address is
            deposited below.
          </p>
        </div>
      </div>

      <div className="form-section">
        <h2>Deposit Funds</h2>
        <form onSubmit={handleSubmit} className="deposit-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <ButtonLoader
            isLoading={isLoading}
            type="submit"
            className="submit-button"
          >
            Deposit Payment
          </ButtonLoader>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Deposit;