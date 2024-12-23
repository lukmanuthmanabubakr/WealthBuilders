import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./InvestmentDetail.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const GET_USER_INVESTMENT_HISTORY = `${BACKEND_URL}api/invest`;

const InvestmentDetail = () => {
  const { investmentId } = useParams();
  const [investment, setInvestment] = useState(null);

  useEffect(() => {
    const fetchInvestmentDetails = async () => {
      try {
        const response = await axios.get(
          `${GET_USER_INVESTMENT_HISTORY}/investment-history`
        );
        const investmentDetails = response.data.investments.find(
          (inv) => inv.investmentId === investmentId
        );
        setInvestment(investmentDetails);
      } catch (error) {
        console.error("Error fetching investment details:", error);
      }
    };

    fetchInvestmentDetails();
  }, [investmentId]);

  if (!investment) {
    return <p className="loading-message">Loading investment details...</p>;
  }

  return (
    <div className="investment-detail-container">
      <h2 className="investment-detail-title">Investment Details</h2>
      <div className="investment-detail-content">
        <p>
          <strong>Plan:</strong> <span className="detail-value">{investment.plan}</span>
        </p>
        <p>
          <strong>Amount:</strong> <span className="detail-value">${investment.amount.toLocaleString()}</span>
        </p>
        <p>
          <strong>Start Date:</strong> <span className="detail-value">{new Date(investment.startDate).toLocaleString()}</span>
        </p>
        <p>
          <strong>End Date:</strong> <span className="detail-value">{new Date(investment.endDate).toLocaleString()}</span>
        </p>
        <p>
          <strong>Profit:</strong> <span className="detail-value">${investment.maturityAmount.toLocaleString()}</span>
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`detail-value status-${investment.status.toLowerCase()}`}>
            {investment.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default InvestmentDetail;
