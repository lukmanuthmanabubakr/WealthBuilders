import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdArrowDropdown } from "react-icons/io"; // Icon for dropdown
import { useNavigate } from "react-router-dom"; // Import for navigation
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import "./StartInvestment.css";
import { useSelector } from "react-redux";
import { IoIosWarning } from "react-icons/io";

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
        console.log("Fetch Balance Response:", response.data); // Log the response data
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [token]);

  const formatBalance = (balance) => {
    return balance.toLocaleString();
  };

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(FETCH_PLANS);
        console.log("Fetch Plans Response:", response.data); // Log the response data
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
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
      console.log("Start Payment Response:", response.data); // Log the response data
      toast.success(response.data.message);
      setShowEmailNotification(true);
    } catch (error) {
      console.error("Error processing payment:", error.response?.data); // Log error response
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
    console.log("Selected Plan:", plan); // Log the selected plan
    setSelectedPlan(plan);
    setShowDropdown(false);
  };

  return (
    <div className="start-investment-container">
      <div className="instructions-section">
        <h3>Steps to Invest</h3>
        <p>1. Choose a plan that suits you best.</p>
        <p>2. Enter the amount you wish to invest in your chosen plan.</p>
        <p>3. Click on "Start Investment."</p>
        <p>4. Wait for confirmation of your investment.</p>
        <p>
          5. Once your investment is confirmed, you will receive an email
          notification.
        </p>
      </div>
      <div className="warning-section">
        <span>
          <IoIosWarning className="warning-icon" />
          <h3 className="warning-title">Warning</h3>
        </span>
        <div className="warning-content">
          <p>
            The amount you invest will be deducted from your balance once the
            investment is confirmed. If the investment is rejected, your balance
            will remain unaffected.
          </p>
        </div>
      </div>

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
            Wait for investment approval
          </p>
        )}
      </div>
    </div>
  );
};

export default StartInvestment;
