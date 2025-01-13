import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import axios from "axios";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import "./InvestmentStatus.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const GET_USER_INVESTMENT_HISTORY = `${BACKEND_URL}api/invest`;

const InvestmentStatus = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userDetails = async () => {
    try {
      const response = await axios.get(
        `${GET_USER_INVESTMENT_HISTORY}/investment-history`
      );
      setInvestments(response.data.investments);
    } catch (error) {
      console.error("Error fetching investment history:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    userDetails();
  }, []);

  useRedirectLoggedOutUser("/login");

  const handleCardClick = (investmentId) => {
    navigate(`/investment/${investmentId}`);
  };

  return (
    <div className="investment-status-container">
      <h2 className="investment-title">Investment History</h2>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : investments.length === 0 ? (
        <p className="no-investment-message">No investments found</p>
      ) : (
        <div className="investment-list">
          {investments.map((investment) => (
            <div
              key={investment.investmentId}
              className="investment-card"
              onClick={() => handleCardClick(investment.investmentId)}
            >
              <div className="investment-card-header">
                <FaClipboardList className="icon-plan" />
                <h3 className="plan-name">{investment.plan}</h3>
              </div>
              <div className="investment-card-body">
                <div className="investment-row">
                  <FaDollarSign className="icon-amount" />
                  <p className="investment-amount">
                    Amount: ${investment.amount.toLocaleString()}
                  </p>
                </div>
                <div className="investment-row">
                  {investment.status === "Active" && (
                    <FaCheckCircle className="icon-status active" />
                  )}
                  {investment.status === "Ended" && (
                    <FaTimesCircle className="icon-status inactive" />
                  )}
                  {investment.status === "Pending" && (
                    <IoIosWarning className="icon-status pending" />
                  )}
                  {investment.status === "Rejected" && (
                    <FcCancel className="icon-status rejected" />
                  )}
                  <p
                    className={`investment-status-text ${investment.status.toLowerCase()}`}
                  >
                    Status: {investment.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvestmentStatus;
