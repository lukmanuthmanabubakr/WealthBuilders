import "./Dashboard.css";
import Notification from "../../components/Notification/Notification";
import DashLink from "../DashLink/DashLink";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import NotSubmitKyc from "../../components/NotSubmitKyc/NotSubmitKyc";
import KycPending from "../../components/kycPending/kycPending";
import RejectedKyc from "../../components/RejectedKyc/RejectedKyc";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const isVerified = user?.isVerified;
  const kycNotSubmitted = user?.kycStatus;
  const kycPending = user?.kycStatus;

  useRedirectLoggedOutUser("/login");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.REACT_APP_JIVOCHAT_URL;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="dashContainer">
      {isVerified === false && <Notification />}
      {kycNotSubmitted === "Not Submitted" && <NotSubmitKyc />}
      {kycPending === "Pending" && <KycPending />}
      {kycPending === "Rejected" && <RejectedKyc />}
      <DashLink />
    </div>
  );
};

export default Dashboard;
