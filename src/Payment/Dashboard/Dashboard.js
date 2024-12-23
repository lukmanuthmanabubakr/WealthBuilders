import React from 'react'

const Dashboard = () => {
  return (
    <div>
      
    </div>
  )
}

export default Dashboard


// import "./Dashboard.css";
// import Notification from '../../components/Notification/Notification';
// import DashLink from "../DashLink/DashLink";
// import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
// import { useSelector } from "react-redux";

// const Dashboard = () => {
//   const { user } = useSelector((state) => state.auth);
//   const isVerified = user?.isVerified;

//   useRedirectLoggedOutUser("/login");
//   return (
//     <div className="dashContainer">
//       {isVerified === false && <Notification />}
//       <DashLink />
//     </div>
//   );
// };

// export default Dashboard;
