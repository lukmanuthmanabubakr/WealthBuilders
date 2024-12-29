import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./ApproveWithdrawal.css";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const WITHDRAW_ONE_USER = `${BACKEND_URL}api/withDraw/get-withdrawal`;
const APPROVAL = `${BACKEND_URL}api/withDraw/approve`;
const REJECTED = `${BACKEND_URL}api/withDraw/reject`;

const WithdrawalDetails = () => {
  const { id } = useParams();
  const [withdrawal, setWithdrawal] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWithdrawal = async () => {
      try {
        const { data } = await axios.get(`${WITHDRAW_ONE_USER}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setWithdrawal(data);
      } catch (err) {
        const message = "Failed to fetch withdrawal details.";
        setError(message);
        toast.error(message);
      }
    };

    fetchWithdrawal();
  }, [id]);

  useRedirectLoggedOutUser("/login");

  // Separate loading states for approve and reject
  const [isApproveButtonLoading, setIsApproveButtonLoading] = useState(false);
  const [isRejectButtonLoading, setIsRejectButtonLoading] = useState(false);

  const handleApprove = async () => {
    setIsApproveButtonLoading(true);
    try {
      await axios.put(
        `${APPROVAL}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Withdrawal approved!");
      setWithdrawal((prev) => ({ ...prev, status: "Approved" }));
    } catch (err) {
      const message = "Failed to approve withdrawal.";
      setError(message);
      toast.error(message);
    } finally {
      setIsApproveButtonLoading(false);
    }
  };

  const handleReject = async () => {
    setIsRejectButtonLoading(true);
    try {
      await axios.put(
        `${REJECTED}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Withdrawal rejected!");
      setWithdrawal((prev) => ({ ...prev, status: "Rejected" }));
    } catch (err) {
      const message = "Failed to reject withdrawal.";
      setError(message);
      toast.error(message);
    } finally {
      setIsRejectButtonLoading(false);
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!withdrawal) return <p className="loading-message">Loading...</p>;

  return (
    <div className="withdrawal-details">
      <h1 className="title">Withdrawal Details</h1>
      <div className="withdrawal-info">
        <p>
          <strong>User:</strong> {withdrawal.user}
        </p>
        <p>
          <strong>Amount:</strong> ${withdrawal.amount.toLocaleString()}
        </p>
        <p>
          <strong>Wallet Address:</strong> {withdrawal.walletAddress}
        </p>
        <p>
          <strong>Status:</strong> {withdrawal.status}
        </p>
        <p>
          <strong>Request Date:</strong>{" "}
          {new Date(withdrawal.requestDate).toLocaleString()}
        </p>
      </div>
      {withdrawal.status === "Pending" && (
        <div className="button-group">
          <ButtonLoader
            isLoading={isApproveButtonLoading}
            className="approve-button"
            onClick={handleApprove}
          >
            Approve
          </ButtonLoader>
          <ButtonLoader
            isLoading={isRejectButtonLoading}
            className="reject-button"
            onClick={handleReject}
          >
            Reject
          </ButtonLoader>
        </div>
      )}
    </div>
  );
};

export default WithdrawalDetails;
