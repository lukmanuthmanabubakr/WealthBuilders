import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./GetAllPendingInvestment.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GET_PENDING_INVESTMENT_URL = `${BACKEND_URL}api/invest/adminPendingInvestment`;

const GetAllPendingInvestment = () => {
  const [investment, setInvestment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPendingDeposits = async () => {
      try {
        const response = await axios.get(GET_PENDING_INVESTMENT_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInvestment(response.data);
        console.log(response.data);
        toast.success("Pending deposits fetched successfully!");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch pending deposits."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingDeposits();
  }, [token]);

  const handleApprove = async (investmentId) => {
    try {
      await axios.put(
        `${BACKEND_URL}api/invest/${investmentId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Investment approved successfully!");
      setInvestment((prev) =>
        prev.pendingInvestments.filter((item) => item._id !== investmentId)
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to approve the investment."
      );
    }
  };

  const handleReject = async (investmentId) => {
    try {
      await axios.put(
        `${BACKEND_URL}api/invest/${investmentId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Investment rejected successfully!");
      setInvestment((prev) =>
        prev.pendingInvestments.filter((item) => item._id !== investmentId)
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reject the investment."
      );
    }
  };

  return (
    <div className="pending-investments-container">
      <ToastContainer />
      <h2>Pending Investments</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="cards-grid">
          {/* {investment?.pendingInvestments?.map((item) => (
            <div className="card" key={item._id}>
              <h3>Plan: {item.plan}</h3>
              <p>Status: {item.status}</p>
              <p>Amount: ${item.amount.toLocaleDateString()}</p>
              <p>Profit: ${item.maturityAmount.toLocaleDateString()}</p>
              <p>Start Date: {new Date(item.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(item.endDate).toLocaleDateString()}</p>
              {item.user ? (
                <>
                  <p>User: {item.user.name}</p>
                  <p>Email: {item.user.email}</p>
                  <p>Balance: {item.user.balance.toLocaleDateString()}</p>
                </>
              ) : (
                <p>User: Not available</p>
              )}
              <div className="apRejectButton">
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(item._id)}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(item._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))} */}

          {investment?.pendingInvestments?.map((item) => (
            <div className="card" key={item._id}>
              <h3>Plan: {item.plan}</h3>
              <p>Status: {item.status}</p>
              <p>Amount: ${item.amount.toLocaleString()}</p>
              <p>Profit: ${item.maturityAmount.toLocaleString()}</p>
              <p>
                Start Date:{" "}
                {item.startDate
                  ? new Date(item.startDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                End Date:{" "}
                {item.endDate
                  ? new Date(item.endDate).toLocaleDateString()
                  : "N/A"}
              </p>
              {item.user ? (
                <>
                  <p>User: {item.user.name || "N/A"}</p>
                  <p>Email: {item.user.email || "N/A"}</p>
                  <p>
                    Balance: ${item.user.balance?.toLocaleString() || "0.00"}
                  </p>
                </>
              ) : (
                <p>User: Not available</p>
              )}
              <div className="apRejectButton">
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(item._id)}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(item._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllPendingInvestment;