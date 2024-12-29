import "./Dashboard.css";
import Notification from "../../components/Notification/Notification";
import DashLink from "../DashLink/DashLink";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const isVerified = user?.isVerified;

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
      <DashLink />
    </div>
  );
};

export default Dashboard;
