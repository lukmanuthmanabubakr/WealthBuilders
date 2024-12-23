// import React, { useState } from "react";
// import "./Profile.css";
// import { CgProfile } from "react-icons/cg";
// import { GoLock } from "react-icons/go";
// import { FaUsers } from "react-icons/fa";
// import { BiLogOut } from "react-icons/bi";
// import UserProfile from "./UserProfile/UserProfile";
// import ChangePassword from "./ChangePassword/ChangePassword";
// import UserStats from "../../components/UserStats/UserStats.js";
// import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser.js";
// import { AdminAuthorLink } from "../../components/protect/hiddenLink.js";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout, RESET } from "../../redux/features/auth/authSlice.js";
// import Loader from "../../components/Loader/Loader.js";

// const Profile = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useRedirectLoggedOutUser("/login");
//   const [activeSection, setActiveSection] = useState("profile");

//   const logoutUser = async () => {
//     dispatch(RESET());
//     await dispatch(logout());
//     navigate("/login");
//   };

//   const renderContent = () => {
//     switch (activeSection) {
//       case "profile":
//         return <UserProfile />;
//       case "security":
//         return <ChangePassword />;
//       case "friends":
//         return <UserStats />;
//       case "logout":
//         return <div>Logout Confirmation</div>;
//       default:
//         return <div>Profile Information</div>;
//     }
//   };

//   return (
//     <>
//       <div className="profileContainer">
//       <div className="profileIcons">
//         <div
//           className="profileIconItem"
//           onClick={() => setActiveSection("profile")}
//         >
//           <CgProfile className="pIcon" />
//           <span className="iconLabel">Profile</span>
//         </div>
//         <div
//           className="profileIconItem"
//           onClick={() => setActiveSection("security")}
//         >
//           <GoLock className="pIcon" />
//           <span className="iconLabel">Security</span>
//         </div>
//         <div
//           className="profileIconItem"
//           onClick={() => setActiveSection("friends")}
//         >
//           <AdminAuthorLink>
//             <FaUsers className="pIcon" />
//             <span className="iconLabel">Users</span>
//           </AdminAuthorLink>
//         </div>
//         {/* Logout icon placed at the bottom */}
//         <div
//           className="profileIconItem logoutIcon"
//           onClick={logoutUser}
//         >
//           <BiLogOut className="pIcon" />
//           <span className="iconLabel"><button>Logout</button></span>
//         </div>
//       </div>
//       <div className="profileContent">{renderContent()}</div>
//     </div>
//     </>
    
//   );
// };

// export default Profile;
