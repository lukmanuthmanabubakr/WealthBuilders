import axios from "axios";
import "./MainDashBoard.css";
import React, { useEffect, useState } from "react";
import Notification from "../../components/Notification/Notification";
import PaymentLoader from "../PaymentLoader/PaymentLoader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { NameOfUser } from "../../Pages/Profile/UserProfile/UserProfile";
import DashLoader from "../DashLoader/DashLoader";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const GET_ONE_USER = `${BACKEND_URL}api/users`;
export const CHECK_MATURITY = `${BACKEND_URL}api/invest/deposit-maturity`;

const MainDashBoard = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [totalMaturityAmount, setTotalMaturityAmount] = useState(0);
  const [InvestmentBal, setInvestmentBal] = useState(0);
  const [error, setError] = useState(null);
  const [showBalance, setShowBalance] = useState(true);
  const [showInvestmentBal, setShowInvestmentBal] = useState(true);
  const [showMaturityAmount, setShowMaturityAmount] = useState(true);
  const [loading, setLoading] = useState(true);

  const user = useSelector(selectUser);


  // const formatBalance = (balance) => {
  //   if (balance >= 1_000_000) {
  //     return `${(balance / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  //   } else if (balance >= 100_000) {
  //     return `${Math.floor(balance / 1_000).toLocaleString()}k`;
  //   } else if (balance >= 1_000) {
  //     return `${(balance / 1_000).toFixed(1).replace(/\.0$/, "")}k+`;
  //   } else {
  //     return balance.toLocaleString();
  //   }
  // };

  // const formatInvestBalance = (InvestmentBal) => {
  //   if (InvestmentBal >= 1_000_000) {
  //     return `${(InvestmentBal / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  //   } else if (InvestmentBal >= 100_000) {
  //     return `${Math.floor(InvestmentBal / 1_000).toLocaleString()}k`;
  //   } else if (InvestmentBal >= 1_000) {
  //     return `${(InvestmentBal / 1_000).toFixed(1).replace(/\.0$/, "")}k+`;
  //   } else {
  //     return InvestmentBal.toLocaleString();
  //   }
  // };

  // const formatMaturitytBalance = (totalMaturityAmount) => {
  //   if (totalMaturityAmount >= 1_000_000) {
  //     return `${(totalMaturityAmount / 1_000_000)
  //       .toFixed(1)
  //       .replace(/\.0$/, "")}M+`;
  //   } else if (totalMaturityAmount >= 100_000) {
  //     return `${Math.floor(totalMaturityAmount / 1_000).toLocaleString()}k`;
  //   } else if (totalMaturityAmount >= 1_000) {
  //     return `${(totalMaturityAmount / 1_000)
  //       .toFixed(1)
  //       .replace(/\.0$/, "")}k+`;
  //   } else {
  //     return totalMaturityAmount.toLocaleString();
  //   }
  // };

  const formatBalance = (balance) => {
    return balance.toLocaleString();
  };
  
  const formatInvestBalance = (InvestmentBal) => {
    return InvestmentBal.toLocaleString();
  };
  
  const formatMaturitytBalance = (totalMaturityAmount) => {
    return totalMaturityAmount.toLocaleString();
  };
  

  const userDetails = async () => {
    setLoading(true);
    try {
      await axios.get(CHECK_MATURITY);
      const response = await axios.get(`${GET_ONE_USER}/getUser`);
      console.log("Full Response:", response.data);

      setName(response.data.name);
      setBalance(response.data.balance);
      setInvestmentBal(response.data.investmentBalance);
      setTotalMaturityAmount(response.data.totalMaturityAmount);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }finally {
      setLoading(false); // Stop loading when data is fetched or error occurs
    }
  };

  useEffect(() => {
    userDetails();
  }, []);

  useRedirectLoggedOutUser("/login");

  return (
    <>
      <div className="mainDashBoard">
        <div className="mainDashBoardContainer">
          <div className="welName">
            <h2>Welcome Back,</h2>
            <p className="smallScreen">{loading ? <DashLoader /> : <NameOfUser />}</p>
            <p className="maxScreen">{loading ? <DashLoader /> : user?.name}</p>
          </div>
          <div className="balance">
            <span
              className="depoSpan"
              onClick={() => setShowBalance(!showBalance)}
            >
              <p className="dBal">Deposit Balance</p>
              <p className="mBal">
                {loading ? <DashLoader /> : `$${formatBalance(balance)}`}
              </p>
            </span>
            <span
              className="depoSpan"
              onClick={() => setShowInvestmentBal(!showInvestmentBal)}
            >
              <p className="dBal">Total Investment</p>
              <p className="mBal">
                {loading ? (
                  <DashLoader />
                ) : (
                  `$${formatInvestBalance(InvestmentBal)}`
                )}
              </p>
            </span>
            <span
              className="depoSpan"
              onClick={() => setShowMaturityAmount(!showMaturityAmount)}
            >
              <p className="dBal">Total Profit</p>
              <p className="mBal">
                {loading ? (
                  <DashLoader />
                ) : (
                  `$${formatMaturitytBalance(totalMaturityAmount)}`
                )}
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDashBoard;