import React, { useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa6";
import { GoLock } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import UserProfile from "./UserProfile/UserProfile";
import ChangePassword from "./ChangePassword/ChangePassword";
import UserStats from "../../components/UserStats/UserStats.js";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser.js";
import { logout, RESET } from "../../redux/features/auth/authSlice.js";
import { AdminAuthorLink } from "../../components/protect/hiddenLink.js";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useRedirectLoggedOutUser("/login");
  const [activeContent, setActiveContent] = useState("user");

  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
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
        <button onClick={logoutUser}>
          <BiLogOut className="icon" />
          <span className="label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
