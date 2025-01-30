import React from "react";
import { NavLink } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import "./PaymentLinks.css";
import { AdminAuthorLink } from "../../components/protect/hiddenLink";
import { FaWallet, FaCoins, FaArrowUp, FaUserFriends, FaHandHoldingUsd } from "react-icons/fa";
import { SiInstatus } from "react-icons/si";
import { PiPottedPlantFill } from "react-icons/pi";
import { FaCrown } from "react-icons/fa6";
import { IoReceipt } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import { PiLockLaminatedOpenDuotone } from "react-icons/pi";
import { RiPassPendingFill } from "react-icons/ri";



const PaymentLinks = () => {
  return (
    <div className="paymentLinksContainer">
      <NavLink to="/deposit-payment">
        <p className="iconPay">
          <FaArrowDown />
        </p>
        <p className="depoPay">Deposit</p>
      </NavLink>
      <NavLink to="/start-invest">
        <p className="iconPay">
          <FaCoins />
        </p>
        <p className="depoPay">Invest</p>
      </NavLink>
      <NavLink to="/invest-status">
        <p className="iconPay">
          <SiInstatus />
        </p>
        <p className="depoPay">Investment Status</p>
      </NavLink>
      <NavLink to="/plans">
        <p className="iconPay">
          <PiPottedPlantFill />
        </p>
        <p className="depoPay">Investment Plans</p>
      </NavLink>
      <NavLink to="/withdraw-wallet">
        <p className="iconPay">
          <FaArrowUp />
        </p>
        <p className="depoPay">Withdraw</p>
      </NavLink>
      <AdminAuthorLink>
        <NavLink to="/admin-pending-wallet">
          <p className="iconPay">
            <MdPending />
          </p>
          <p className="depoPay">Pending Withdrawal</p>
        </NavLink>
      </AdminAuthorLink>
      <AdminAuthorLink>
        <NavLink to="/admin-pending-deposit">
          <p className="iconPay">
            <PiLockLaminatedOpenDuotone />
          </p>
          <p className="depoPay">Pending Deposits</p>
        </NavLink>
      </AdminAuthorLink>
      <AdminAuthorLink>
        <NavLink to="/admin-pending-investment">
          <p className="iconPay">
            <FaHandHoldingUsd />
          </p>
          <p className="depoPay">Pending Investment</p>
        </NavLink>
      </AdminAuthorLink>
      <AdminAuthorLink>
        <NavLink to="/pending-kyc">
          <p className="iconPay">
            <RiPassPendingFill />
          </p>
          <p className="depoPay">Pending Kyc Verification</p>
        </NavLink>
      </AdminAuthorLink>
      <NavLink to="/referrals">
        <p className="iconPay">
          <FaUserFriends />
        </p>
        <p className="depoPay">Referrals</p>
      </NavLink>
      <NavLink to="/transaction-History">
        <p className="iconPay">
          <IoReceipt />
        </p>
        <p className="depoPay">Transaction History</p>
      </NavLink>
    </div>
  );
};

export default PaymentLinks;
