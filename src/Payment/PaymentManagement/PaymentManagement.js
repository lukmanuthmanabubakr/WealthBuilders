import React, { useEffect, useState } from "react";
import { confirmPayment, getPaymentStatus, rejectPayment } from "../apiService";
import { useParams } from "react-router-dom";
import "./PaymentManagement.css"; // Import the CSS file
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const PaymentManagement = ({ token }) => {
  const { transactionId } = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState(""); // State for success or error message
  const [messageType, setMessageType] = useState(""); // State for message type (success or error)
  const [isConfirmLoading, setIsConfirmLoading] = useState(false); // Separate loading state for confirm button
  const [isRejectLoading, setIsRejectLoading] = useState(false); // Separate loading state for reject button

  const { isLoadings } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (!transactionId) {
        setMessageType("error");
        setMessage("Transaction ID is missing!");
        return;
      }

      try {
        const data = await getPaymentStatus(token, transactionId);
        setPaymentDetails(data.transaction);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setMessageType("error");
        setMessage("Error fetching payment status.");
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [token, transactionId]);

  const handleConfirmPayment = async () => {
    setIsConfirmLoading(true); // Start confirm loading
    setMessage(""); // Clear previous messages
    try {
      const status = "Confirmed";
      const response = await confirmPayment(
        token,
        transactionId,
        status,
        notes
      );

      setMessageType("success");
      setMessage("Payment successfully confirmed!");
      setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        status: "Confirmed",
      }));
    } catch (error) {
      console.error("Error confirming payment:", error);
      setMessageType("error");
      setMessage(error.message || "Failed to confirm payment.");
    } finally {
      setIsConfirmLoading(false); // Stop loading after completion
    }
  };

  const handleRejectPayment = async () => {
    setIsRejectLoading(true); // Start reject loading
    setMessage(""); // Clear previous messages
    try {
      const status = "Rejected"; // Set proper status for rejection
      const response = await rejectPayment(
        token,
        transactionId,
        status,
        notes
      );

      setMessageType("success");
      setMessage("Payment successfully rejected!");
      setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        status: "Rejected",
      }));
    } catch (error) {
      console.error("Error rejecting payment:", error);
      setMessageType("error");
      setMessage(error.message || "Failed to reject payment.");
    } finally {
      setIsRejectLoading(false); // Stop loading after completion
    }
  };

  if (loading) {
    return (
      <div className="payment-management-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="payment-management-container">
      <h2>Payment Details</h2>
      {paymentDetails && (
        <div className="payment-details">
          <p>
            <strong>Transaction ID:</strong> {paymentDetails.transactionId}
          </p>
          <p>
            <strong>Amount:</strong> ${paymentDetails.amount.toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {paymentDetails.status}
          </p>
          <p>
            <strong>Payment Notes:</strong>{" "}
            {paymentDetails.notes || "No notes available"}
          </p>
          <ButtonLoader
            className="confirm-button"
            onClick={handleConfirmPayment}
            isLoading={isConfirmLoading}
          >
            Confirm Payment
          </ButtonLoader>
          <ButtonLoader
            className="reject-button"
            onClick={handleRejectPayment}
            isLoading={isRejectLoading}
          >
            Reject Payment
          </ButtonLoader>
          {message && (
            <p className={`message ${messageType}`}>
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
