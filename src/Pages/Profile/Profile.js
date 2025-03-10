import React, { useState, useEffect } from "react";
import { FaUser, FaUsers } from "react-icons/fa6";
import { GoLock } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import UserProfile from "./UserProfile/UserProfile";
import ChangePassword from "./ChangePassword/ChangePassword";
import UserStats from "../../components/UserStats/UserStats.js";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser.js";
import { logout, RESET } from "../../redux/features/auth/authSlice.js";
import { AdminAuthorLink } from "../../components/protect/hiddenLink.js";
import { RiUserReceivedFill } from "react-icons/ri";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useRedirectLoggedOutUser("/login");
  const [activeContent, setActiveContent] = useState("user");

  // Get authenticated user from Redux store
  const { user } = useSelector((state) => state.auth);

  // Debugging logs
  console.log("User from Redux:", user); // Check if user is coming from Redux
  console.log("isImpersonated value:", user?.isImpersonated); // Check if isImpersonated exists

  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  const exitImpersonation = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/users/exit-impersonation`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Exit Impersonation Response:", data); // Debugging log
      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error("Exit Impersonation Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="profileContainer">
      <div className="content">
        {activeContent === "user" && <UserProfile />}
        {activeContent === "security" && <ChangePassword />}
        {activeContent === "team" && <UserStats />}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottomNavBar">
        <button
          onClick={() => handleContentChange("user")}
          className={activeContent === "user" ? "active" : ""}
        >
          <FaUser className="icon" />
          <span className="label">Profile</span>
        </button>
        <button
          onClick={() => handleContentChange("security")}
          className={activeContent === "security" ? "active" : ""}
        >
          <GoLock className="icon" />
          <span className="label">Security</span>
        </button>
        <AdminAuthorLink>
          <button
            onClick={() => handleContentChange("team")}
            className={activeContent === "team" ? "active" : ""}
          >
            <FaUsers className="icon" />
            <span className="label">Users</span>
          </button>
        </AdminAuthorLink>

        {/* Show Exit Impersonation if user is impersonated */}
        {user?.isImpersonated === true && (
          <button
            onClick={exitImpersonation}
            className={activeContent === "impersonate" ? "active" : ""}
          >
            <RiUserReceivedFill className="icon" />
            <span className="label">Exit Impersonation</span>
          </button>
        )}

        <button onClick={logoutUser}>
          <BiLogOut className="icon" />
          <span className="label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
