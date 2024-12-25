import React, { useEffect } from "react";
import "./index.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login/Login";
import SignUp from "./Pages/Auth/SignUp/SignUp";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import LoginWithCode from "./Pages/Auth/LoginWithCode/LoginWithCode";
import Verify from "./Pages/Auth/Verify/Verify";
import Profile from "./Pages/Profile/Profile";
import Loader from "./components/Loader/Loader";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Plans from "./Pages/Plans/Plans";
import Ranking from "./Pages/Ranking/Ranking";
import WorkFlow from "./Pages/WorkFlow/WorkFlow";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import Dashboard from "./Payment/Dashboard/Dashboard";
import PaymentManagement from "./Payment/PaymentManagement/PaymentManagement";
import Deposit from "./Payment/Deposit/Deposit";
import { AdminAuthorLink } from "./components/protect/hiddenLink";
import StartInvestment from "./Payment/StartInvestment/StartInvestment";
import InvestmentStatus from "./Payment/InvestmentStatus/InvestmentStatus";
import InvestmentDetail from "./Payment/InvestmentDetail/InvestmentDetail";
import Referrals from "./Payment/Referrals/Referrals";
import AllTransactionHistory from "./Payment/AllTransactionHistory/AllTransactionHistory";
import NotFound from "./Pages/NotFound/NotFound";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Withdraw from "./Payment/Withdraw/Withdraw";
import PendingWithdrawals from "./Payment/PendingWithdrawals/PendingWithdrawals";
import ApproveWithdrawal from "./Payment/ApproveWithdrawal/ApproveWithdrawal";
import AdminWithdrawalDetail from "./Payment/ApproveWithdrawal/ApproveWithdrawal";
import EditBalance from "./Pages/EditBalance/EditBalance";
import GetAllPendingDeposit from "./Payment/GetAllPendingDeposit/GetAllPendingDeposit";
import Navbar from "./components/Navbar/Navbar";

axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/Hierarchy" element={<Ranking />} />
          <Route path="/how-it-works" element={<WorkFlow />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/transaction-History" element={<AllTransactionHistory />} />
          <Route path="/deposit-payment" element={<Deposit />} />
          <Route path="/withdraw-wallet" element={<Withdraw />} />
          <Route path="/withdrawal/:id" element={<AdminWithdrawalDetail />} />
          <Route path="/admin-pending-wallet" element={<PendingWithdrawals />} />
          <Route path="/start-invest" element={<StartInvestment />} />
          <Route path="/invest-status" element={<InvestmentStatus />} />
          <Route path="/investment/:investmentId" element={<InvestmentDetail />} />
          <Route path="/edit-balance/:id" element={<EditBalance />} />
          <Route path="/admin-pending-deposit" element={<GetAllPendingDeposit />} />
          <Route
            path="/transaction/:transactionId"
            element={<PaymentManagement />}
          />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route
            path="/resetPassword/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
          <Route path="/verify/:verificationToken" element={<Verify />} />
          {/* <Route path="/user-profile" element={<UserProfile />} /> */}
          <Route path="/user-profile" element={<Profile />} />
        </Routes>
      </GoogleOAuthProvider>
      {/* <Loader /> */}
    </div>
  );
};

export default App;












































































// import React, { useEffect, useState } from "react";
// import "./index.css";
// import { Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Login from "./Pages/Auth/Login/Login";
// import SignUp from "./Pages/Auth/SignUp/SignUp";
// import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
// import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
// import LoginWithCode from "./Pages/Auth/LoginWithCode/LoginWithCode";
// import Verify from "./Pages/Auth/Verify/Verify";
// import Profile from "./Pages/Profile/Profile";
// import Loader from "./components/Loader/Loader";
// import axios from "axios";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getLoginStatus,
//   getUser,
//   selectIsLoggedIn,
//   selectUser,
// } from "./redux/features/auth/authSlice";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Plans from "./Pages/Plans/Plans";
// import Ranking from "./Pages/Ranking/Ranking";
// import WorkFlow from "./Pages/WorkFlow/WorkFlow";
// import Contact from "./Pages/Contact/Contact";
// import About from "./Pages/About/About";
// import Dashboard from "./Payment/Dashboard/Dashboard";
// import PaymentManagement from "./Payment/PaymentManagement/PaymentManagement";
// import Deposit from "./Payment/Deposit/Deposit";
// import StartInvestment from "./Payment/StartInvestment/StartInvestment";
// import InvestmentStatus from "./Payment/InvestmentStatus/InvestmentStatus";
// import InvestmentDetail from "./Payment/InvestmentDetail/InvestmentDetail";
// import Referrals from "./Payment/Referrals/Referrals";
// import AllTransactionHistory from "./Payment/AllTransactionHistory/AllTransactionHistory";
// import NotFound from "./Pages/NotFound/NotFound";
// import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
// import Withdraw from "./Payment/Withdraw/Withdraw";
// import PendingWithdrawals from "./Payment/PendingWithdrawals/PendingWithdrawals";
// import AdminWithdrawalDetail from "./Payment/ApproveWithdrawal/ApproveWithdrawal";
// import EditBalance from "./Pages/EditBalance/EditBalance";
// import GetAllPendingDeposit from "./Payment/GetAllPendingDeposit/GetAllPendingDeposit";
// import Navbar from "./components/Navbar/Navbar";

// axios.defaults.withCredentials = true;

// const Countdown = ({ targetTime }) => {
//   const [timeLeft, setTimeLeft] = useState(() => {
//     const now = new Date();
//     return targetTime - now;
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       setTimeLeft(targetTime - now);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [targetTime]);

//   if (timeLeft <= 0) {
//     return null; // Countdown has ended
//   }

//   const formatTime = (milliseconds) => {
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const days = Math.floor(totalSeconds / (3600 * 24));
//     const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: "#f0f0f0",
//         textAlign: "center",
//       }}
//     >
//       <h1 style={{ color: "#1e90ff" }}>Launching Soon</h1>
//       <p>Time remaining: {formatTime(timeLeft)}</p>
//     </div>
//   );
// };

// const App = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const user = useSelector(selectUser);

//   const targetTime = new Date("December 30, 2024 00:00:00").getTime(); // Set target launch time

//   const [isLaunched, setIsLaunched] = useState(new Date().getTime() >= targetTime);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (new Date().getTime() >= targetTime) {
//         setIsLaunched(true);
//         clearInterval(interval);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [targetTime]);

//   useEffect(() => {
//     dispatch(getLoginStatus());
//     if (isLoggedIn && user === null) {
//       dispatch(getUser());
//     }
//   }, [dispatch, isLoggedIn, user]);

//   if (!isLaunched) {
//     return <Countdown targetTime={targetTime} />;
//   }

//   return (
//     <div className="App">
//       <Navbar />
//       <ToastContainer />
//       <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="*" element={<NotFound />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/plans" element={<Plans />} />
//           <Route path="/Hierarchy" element={<Ranking />} />
//           <Route path="/how-it-works" element={<WorkFlow />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<SignUp />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/referrals" element={<Referrals />} />
//           <Route path="/transaction-History" element={<AllTransactionHistory />} />
//           <Route path="/deposit-payment" element={<Deposit />} />
//           <Route path="/withdraw-wallet" element={<Withdraw />} />
//           <Route path="/withdrawal/:id" element={<AdminWithdrawalDetail />} />
//           <Route path="/admin-pending-wallet" element={<PendingWithdrawals />} />
//           <Route path="/start-invest" element={<StartInvestment />} />
//           <Route path="/invest-status" element={<InvestmentStatus />} />
//           <Route path="/investment/:investmentId" element={<InvestmentDetail />} />
//           <Route path="/edit-balance/:id" element={<EditBalance />} />
//           <Route path="/admin-pending-deposit" element={<GetAllPendingDeposit />} />
//           <Route
//             path="/transaction/:transactionId"
//             element={<PaymentManagement />}
//           />
//           <Route path="/forgot" element={<ForgotPassword />} />
//           <Route
//             path="/resetPassword/:resetToken"
//             element={<ResetPassword />}
//           />
//           <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
//           <Route path="/verify/:verificationToken" element={<Verify />} />
//           <Route path="/user-profile" element={<Profile />} />
//         </Routes>
//       </GoogleOAuthProvider>
//     </div>
//   );
// };

// export default App;