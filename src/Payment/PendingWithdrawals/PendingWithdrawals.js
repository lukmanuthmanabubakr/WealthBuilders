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

        console.log("Fetched Withdrawals:", response.data.withdrawals); // Debugging

        setWithdrawals(response.data.withdrawals || []);
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
            withdrawals.map((withdrawal) => {
              const user = withdrawal.user || {}; // Ensure user object exists

              return (
                <Link
                  to={`/withdrawal/${withdrawal._id}`}
                  key={withdrawal._id}
                  className="withdrawal-item-link"
                >
                  <div className="withdrawal-item">
                    <p>
                      <strong>User:</strong>{" "}
                      {user.name ? `${user.name} (${user.email || "N/A"})` : "N/A"}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${withdrawal.amount?.toLocaleString() || "N/A"}
                    </p>
                    <p>
                      <strong>Requested Date:</strong>{" "}
                      {withdrawal.requestDate
                        ? new Date(withdrawal.requestDate).toLocaleString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong> {withdrawal.status || "N/A"}
                    </p>
                    <p>
                      <strong>Wallet Address:</strong> {withdrawal.walletAddress || "N/A"}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="no-data-text">No pending withdrawals found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PendingWithdrawals;
