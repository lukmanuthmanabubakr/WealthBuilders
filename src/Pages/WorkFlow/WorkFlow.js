import React from "react";
import "./WorkFlow.css";
import { FaUserAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BsBank2 } from "react-icons/bs";
import { FaCoins } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";


const WorkFlow = () => {
  return (
    <>
      <div className="workflow">
        <h1 className="workflow-title">How it Works</h1>
        <p className="workflow-subtitle">
          Follow these simple steps to start investing
        </p>
        <div className="workflow-grid">
          <div className="workflow-step">
            <div className="workflow-icon-bg">
              <FaUserAlt className="workflow-icon" />
            </div>
            <h3>Register Your Account</h3>
            <p>
              Sign up to access our investment options and start your journey.
            </p>
          </div>
          <div className="workflow-step">
            <div className="workflow-icon-bg">
              <MdMarkEmailRead className="workflow-icon" />
            </div>
            <h3>Verify Your Email</h3>
            <p>Secure your account by confirming your email address.</p>
          </div>
          <div className="workflow-step">
            <div className="workflow-icon-bg">
              <BsFillPatchCheckFill className="workflow-icon" />
            </div>
            <h3>Complete KYC Verification</h3>
            <p>Get verified to ensure secure transactions and withdrawals.</p>
          </div>
          <div className="workflow-step">
            <div className="workflow-icon-bg">
              <BsBank2 className="workflow-icon" />
            </div>
            <h3>Deposit Funds</h3>
            <p>Use various payment methods to fund your account.</p>
          </div>
          <div className="workflow-step">
            <div className="workflow-icon-bg">
              <FaCoins className="workflow-icon" />
            </div>
            <h3>Select an Investment Plan</h3>
            <p>Choose from our plans and start earning returns.</p>
          </div>
          <div className="workflow-step">
            <div className="workflow-icon-bg">
              <GiReceiveMoney className="workflow-icon" />
            </div>
            <h3>Transfer Funds</h3>
            <p>Quickly send funds to other users on the platform.</p>
          </div>
          <div className="workflow-step">
            <div className="workflow-icon-bg">
              <FaUserFriends className="workflow-icon" />
            </div>
            <h3>Refer Your Friends</h3>
            <p>Invite friends to join and earn referral bonuses.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkFlow;
