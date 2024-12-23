import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom"; // Import Link
import "react-toastify/dist/ReactToastify.css";
import "./PendingWithdrawals.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GET_PENDING_WITHDRAWALS_URL = `${BACKEND_URL}api/withDraw/pending`;

const PendingWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPendingWithdrawals = async () => {
      try {
        const response = await axios.get(GET_PENDING_WITHDRAWALS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWithdrawals(response.data.withdrawals);
        toast.success("Pending withdrawals fetched successfully");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch pending withdrawals."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingWithdrawals();
  }, [token]);

  return (
    <div className="pending-withdrawals-container">
      <ToastContainer position="top-right" autoClose={5000} />
      <h2 className="header">Pending Withdrawals</h2>
      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="withdrawal-list">
          {withdrawals.length > 0 ? (
            withdrawals.map((withdrawal) => (
              <Link
                to={`/withdrawal/${withdrawal._id}`} // Dynamic link to details page
                key={withdrawal._id}
                className="withdrawal-item-link" // Optional: Add class for styling
              >
                <div className="withdrawal-item">
                  <p>
                    <strong>User:</strong> {withdrawal.user.name} (
                    {withdrawal.user.email})
                  </p>
                  <p>
                    <strong>Amount:</strong> ${withdrawal.amount.toLocaleString()}
                  </p>
                  <p>
                    <strong>Requested Date:</strong>{" "}
                    {new Date(withdrawal.requestDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {withdrawal.status}
                  </p>
                  <p>
                    <strong>Wallet Address:</strong> {withdrawal.walletAddress}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-data-text">No pending withdrawals found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PendingWithdrawals;
