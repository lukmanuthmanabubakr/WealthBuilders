import React, { useState, useEffect } from "react";
import axios from "axios";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "./Referrals.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GET_ONE_USER = `${BACKEND_URL}api/users/getUser`;
const REFERRALS = `${BACKEND_URL}api/users/referrals`;

const Referrals = ({ token }) => {
  useRedirectLoggedOutUser("/login");

  const [referralCode, setReferralCode] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [noReferralsMessage, setNoReferralsMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const response = await axios.get(GET_ONE_USER, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReferralCode(response.data.referralCode);
      } catch (error) {
        console.error("Error fetching referral code:", error);
      }
    };

    const fetchReferrals = async () => {
      try {
        const response = await axios.get(REFERRALS, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.message === "No referrals") {
          setNoReferralsMessage("No Referrals yet, Refer a friend and earn up to $5");
          setReferrals([]);
        } else {
          setReferrals(response.data.referrals);
          setNoReferralsMessage(""); // Clear the message if there are referrals
        }
      } catch (error) {
        console.error("Error fetching referrals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralCode();
    fetchReferrals();
  }, [token]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
      .then(() => toast.success("Referral code copied to clipboard!"))
      .catch((err) => toast.error("Failed to copy referral code."));
  };

  return (
    <div className="referrals-container">
      {loading ? (
        <div className="refer-loading-spinner">
          <div className="refer-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="referral-code">
            <h2>Your Referral Code</h2>
            <p>{referralCode}</p>
            <button onClick={copyReferralCode} className="copy-button">
              Copy Referral Code
            </button>
          </div>

          <div className="referrals-list">
            <h3>Your Referrals</h3>
            {noReferralsMessage ? (
              <p className="no-referrals">{noReferralsMessage}</p>
            ) : (
              referrals.map((referral) => (
                <div className="referral-card" key={referral._id}>
                  <img src={referral.photo} alt={referral.name} className="referral-photo" />
                  <div className="referral-info">
                    <h4>{referral.name}</h4>
                    <p>{referral.email}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Referrals;
