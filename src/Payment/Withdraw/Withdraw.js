import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Withdraw.css";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import { useSelector } from "react-redux";
import { IoIosWarning } from "react-icons/io";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GET_ONE_USER = `${BACKEND_URL}api/users/getUser`;
const WITHDRAW_REQUEST_URL = `${BACKEND_URL}api/withDraw/create`;

const Withdraw = ({ token }) => {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);


  const navigate = useNavigate();
  useRedirectLoggedOutUser("/login");

  
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(GET_ONE_USER, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.totalMaturityAmount);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${WITHDRAW_REQUEST_URL}`, {
        token,
        amount,
        walletAddress,
      });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error requesting withdrawal"
      );
    } finally {
      setIsLoading(false);
    }
  };
  // const formatBalance = (balance) => {
  //   if (balance >= 1_000_000) {
  //   } else {
  //     return balance.toLocaleString();


  const formatBalance = (balance) => {
    return balance.toLocaleString();
  };

  return (
    <div className="container-withdraw">
      <div className="instructions-section">
        <h3>Steps to Withdraw</h3>
        <p>1. Ensure your wallet address is correct.</p>
        <p>2. Enter the amount you want to withdraw.</p>
        <p>3. Submit the withdrawal request.</p>
        <p>4. Wait for WealthBuilders approval and confirmation via email.</p>
        <p>5. Your withdrawal will be processed once approved.</p>
      </div>

      <div className="warning-section">
        <span>
          <IoIosWarning className="warning-icon" />
          <h3 className="warning-title">Warning</h3>
        </span>
        <div className="warning-content">
          <p>
            Ensure the wallet address is correct. Withdrawals cannot be
            reversed.
          </p>
        </div>
      </div>

      <div className="form-section">
        <h2>Withdraw Funds</h2>
        <form onSubmit={handleSubmit} className="withdraw-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter withdrawal amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="input-field"
            />
            <p className="balance-info">
              Your current balance: ${formatBalance(balance)}
            </p>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <ButtonLoader
            isLoading={isLoading}
            type="submit"
            className="submit-button"
          >
            Request Withdrawal
          </ButtonLoader>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Withdraw;