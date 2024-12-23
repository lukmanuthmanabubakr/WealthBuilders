import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdArrowDropdown } from "react-icons/io"; // Icon for dropdown
import { useNavigate } from "react-router-dom"; // Import for navigation
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import "./StartInvestment.css";
import { useSelector } from "react-redux";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const FETCH_PLANS = `${BACKEND_URL}api/invest/plans`;
const GET_ONE_USER = `${BACKEND_URL}api/users/getUser`;
const START_PAYMENT = `${BACKEND_URL}api/invest/start-invest`;

const StartInvestment = ({ token }) => {
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for form submission
  const [showEmailNotification, setShowEmailNotification] = useState(false);
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();
  useRedirectLoggedOutUser("/login");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(GET_ONE_USER, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [token]);

  // const formatBalance = (balance) => {
  //   if (balance >= 1_000_000) {
  //     return `${(balance / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  //   } else if (balance >= 1_000) {
  //     return `${(balance / 1_000).toFixed(1).replace(/\.0$/, "")}k+`;
  //   } else {
  //     return balance.toLocaleString();
  //   }
  // };


  const formatBalance = (balance) => {
    return balance.toLocaleString();
  };


  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(FETCH_PLANS);
        setPlans(response.data);
      } catch (error) {
        toast.error("Failed to fetch investment plans.");
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchPlans();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      toast.error("Please select an investment plan.");
      return;
    }

    setIsSubmitting(true); // Start submission loading
    try {
      const response = await axios.post(START_PAYMENT, {
        token,
        amount,
        planName: selectedPlan.name,
      });

      toast.success(response.data.message);
      setShowEmailNotification(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error processing payment.");
    } finally {
      setIsSubmitting(false); // End submission loading
    }
  };

  useEffect(() => {
    if (showEmailNotification) {
      const timer = setTimeout(() => {
        setShowEmailNotification(false);
        navigate("/dashboard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showEmailNotification, navigate]);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setShowDropdown(false);
  };

  return (
    <div className="start-investment-container">
      <div className="start-investment-card">
        <h2 className="start-investment-title">Start Investment</h2>
        <form onSubmit={handleSubmit} className="start-investment-form">
          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="form-input"
            />
            <p className="balance-info">
              Your current balance: ${formatBalance(balance)}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="planName" className="form-label">
              Select Plan
            </label>
            <div className="dropdown">
              {selectedPlan ? (
                <div className="selected-plan">
                  <div className="selected-plan-content">
                    <p className="plan-details">
                      <strong>Plan:</strong> {selectedPlan.name} <br />
                      <strong>Min:</strong> $
                      {selectedPlan.minAmount.toLocaleString()} <br />
                      <strong>Max:</strong> $
                      {selectedPlan.maxAmount.toLocaleString()}
                    </p>
                    <button
                      type="button"
                      className="change-plan-button"
                      onClick={() => setSelectedPlan(null)}
                    >
                      Change Plan
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="dropdown-toggle"
                    onClick={handleDropdownToggle}
                    disabled={isLoading}
                  >
                    <span className="dropdown-text">
                      {isLoading ? "Loading..." : "Select Plan"}
                    </span>
                    <IoMdArrowDropdown className="dropdown-icon" />
                  </button>
                  {showDropdown && !isLoading && (
                    <ul className="dropdown-list">
                      {plans.map((plan) => (
                        <li
                          key={plan._id}
                          onClick={() => handlePlanSelection(plan)}
                          className="dropdown-item"
                        >
                          {plan.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>

          <ButtonLoader
            type="submit"
            className="submit-button"
            isLoading={isSubmitting} // Change this to isSubmitting
          >
            Invest
          </ButtonLoader>
        </form>
        {showEmailNotification && (
          <p className="email-notification">
            Please check your email for investment details.
          </p>
        )}
      </div>
    </div>
  );
};

export default StartInvestment;
