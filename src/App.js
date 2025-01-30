import React, { useEffect, useState } from "react";
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
import UserBalEditted from "./Pages/UserBalEditted/UserBalEditted";
import GetAllPendingInvestment from "./Payment/GetAllPendingInvestment/GetAllPendingInvestment";
import UploadKyc from "./Pages/UploadKyc/UploadKyc";
import AdminPendingKyc from "./Pages/AdminPendingKyc/AdminPendingKyc";
import MaintenanceMode from "./components/MaintenanceMode";

axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const [isMaintenance, setIsMaintenance] = useState(true); // Change to false when done

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  if (isMaintenance) {
    return <MaintenanceMode />;
  }
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
          <Route path="/upload-kyc" element={<UploadKyc />} />
          <Route path="/pending-kyc" element={<AdminPendingKyc />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route
            path="/transaction-History"
            element={<AllTransactionHistory />}
          />
          <Route path="/deposit-payment" element={<Deposit />} />
          <Route path="/withdraw-wallet" element={<Withdraw />} />
          <Route path="/withdrawal/:id" element={<AdminWithdrawalDetail />} />
          <Route
            path="/admin-pending-wallet"
            element={<PendingWithdrawals />}
          />
          <Route path="/start-invest" element={<StartInvestment />} />
          <Route path="/invest-status" element={<InvestmentStatus />} />
          <Route
            path="/investment/:investmentId"
            element={<InvestmentDetail />}
          />
          <Route path="/edit-balance/:id" element={<EditBalance />} />
          <Route path="/edit-user-balance/:id" element={<UserBalEditted />} />
          <Route
            path="/admin-pending-deposit"
            element={<GetAllPendingDeposit />}
          />
          <Route
            path="/admin-pending-investment"
            element={<GetAllPendingInvestment />}
          />
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
      {/* <L /> */}
    </div>
  );
};

export default App;

// import React, { useEffect } from "react";
// import "./index.css";
// import { Route, Routes, useNavigate } from "react-router-dom";
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
// import { AdminAuthorLink } from "./components/protect/hiddenLink";
// import StartInvestment from "./Payment/StartInvestment/StartInvestment";
// import InvestmentStatus from "./Payment/InvestmentStatus/InvestmentStatus";
// import InvestmentDetail from "./Payment/InvestmentDetail/InvestmentDetail";
// import Referrals from "./Payment/Referrals/Referrals";
// import AllTransactionHistory from "./Payment/AllTransactionHistory/AllTransactionHistory";
// import NotFound from "./Pages/NotFound/NotFound";
// import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
// import Withdraw from "./Payment/Withdraw/Withdraw";
// import PendingWithdrawals from "./Payment/PendingWithdrawals/PendingWithdrawals";
// import ApproveWithdrawal from "./Payment/ApproveWithdrawal/ApproveWithdrawal";
// import AdminWithdrawalDetail from "./Payment/ApproveWithdrawal/ApproveWithdrawal";
// import EditBalance from "./Pages/EditBalance/EditBalance";
// import GetAllPendingDeposit from "./Payment/GetAllPendingDeposit/GetAllPendingDeposit";
// import Navbar from "./components/Navbar/Navbar";
// import UserBalEditted from "./Pages/UserBalEditted/UserBalEditted";
// import GetAllPendingInvestment from "./Payment/GetAllPendingInvestment/GetAllPendingInvestment";
// import UploadKyc from "./Pages/UploadKyc/UploadKyc";
// import AdminPendingKyc from "./Pages/AdminPendingKyc/AdminPendingKyc";

// axios.defaults.withCredentials = true;

// const App = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const user = useSelector(selectUser);

//   useEffect(() => {
//     dispatch(getLoginStatus());
//     if (isLoggedIn && user === null) {
//       dispatch(getUser());
//     }
//   }, [dispatch, isLoggedIn, user]);
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
//           <Route path="/upload-kyc" element={<UploadKyc />} />
//           <Route path="/pending-kyc" element={<AdminPendingKyc />} />
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
//           <Route path="/edit-user-balance/:id" element={<UserBalEditted />} />
//           <Route path="/admin-pending-deposit" element={<GetAllPendingDeposit />} />
//           <Route path="/admin-pending-investment" element={<GetAllPendingInvestment />} />
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
//           {/* <Route path="/user-profile" element={<UserProfile />} /> */}
//           <Route path="/user-profile" element={<Profile />} />
//         </Routes>
//       </GoogleOAuthProvider>
//       {/* <L /> */}
//     </div>
//   );
// };

// export default App;
