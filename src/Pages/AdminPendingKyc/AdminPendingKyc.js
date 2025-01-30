import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import "./AdminPendingKyc.css";

const AdminPendingKyc = () => {
  const [pendingKyc, setPendingKyc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchPendingKyc();
  }, []);

  const fetchPendingKyc = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/users/kyc/pending`);
      setPendingKyc(data.pendingUsers);
    } catch (error) {
      console.error("Error fetching KYC requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId, action) => {
    setActionLoading(userId);
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/users/kyc/${action}/${userId}`);
      toast.success(`KYC ${action}d successfully!`); // Toast notification for success
      fetchPendingKyc();
    } catch (error) {
      toast.error(`Error ${action}ing KYC. Try again!`); // Toast notification for error
      console.error(`Error ${action}ing KYC:`, error);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p className="loading-text">Loading pending KYC requests...</p>;

  return (
    <div className="kyc-admin-panel">
      <h2>Pending KYC Requests</h2>
      <div className="kyc-card-container">
        {pendingKyc.length === 0 ? (
          <p className="no-requests">No pending requests.</p>
        ) : (
          pendingKyc.map((user) => (
            <div className="kyc-card" key={user._id}>
              <h3 className="user-name">Name: {user.name}</h3>
              <p className="user-email">Email: {user.email}</p>
              <p className="user-status">KYC Status: {user.kycStatus}</p>
              <div className="kyc-documents">
                <a className="doc-link" href={user.kyc.frontDoc} target="_blank" rel="noopener noreferrer">
                  View Front
                </a>
                <a className="doc-link" href={user.kyc.backDoc} target="_blank" rel="noopener noreferrer">
                  View Back
                </a>
              </div>
              <div className="kyc-actions">
                <button
                  className={`approve-btn ${actionLoading ? "blurred" : ""}`}
                  onClick={() => handleAction(user._id, "approve")}
                  disabled={!!actionLoading}
                >
                  {actionLoading === user._id ? "Processing..." : "Approve"}
                </button>
                <button
                  className={`reject-btn ${actionLoading ? "blurred" : ""}`}
                  onClick={() => handleAction(user._id, "reject")}
                  disabled={!!actionLoading}
                >
                  {actionLoading === user._id ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPendingKyc;
