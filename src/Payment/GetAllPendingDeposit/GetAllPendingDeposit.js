import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./GetAllPendingDeposit.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GET_PENDING_DEPOSITS_URL = `${BACKEND_URL}api/payments/pending-deposit`;

const GetAllPendingDeposit = () => {
  const [deposits, setDeposits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPendingDeposits = async () => {
      try {
        const response = await axios.get(GET_PENDING_DEPOSITS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeposits(response.data.deposit);
        console.log(response.data.deposit);
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

  return (
    <div className="get-all-pending-deposits">
      <ToastContainer />
      <h2>Pending Deposits</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : deposits.length === 0 ? (
        <p>No pending deposits found.</p>
      ) : (
        deposits.map((deposit) => (
          <Link
            to={`/transaction/${deposit._id}`} // Navigate to transaction confirmation page
            key={deposit._id}
            className="deposit-item-link" // Add class for styling
          >
            <div className="deposit-item">
              <p>
                <strong>User:</strong>{" "}
                {deposit.user ? `${deposit.user.name} (${deposit.user.email})` : "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> ${deposit.amount.toLocaleString()}
              </p>
              <p>
                <strong>Requested Date:</strong>{" "}
                {new Date(deposit.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {deposit.status}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default GetAllPendingDeposit;
