// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa"; // Congratulatory icon
// import "./Verify.css";
// import Loader from "../../../components/Loader/Loader";
// import { RESET, verifyUser } from "../../../redux/features/auth/authSlice";
// import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

// const Verify = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { verificationToken } = useParams();
//   const { isLoading } = useSelector((state) => state.auth);

//   const verifyAccount = async () => {
//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 3000);
//     await dispatch(verifyUser(verificationToken));
//     await dispatch(RESET());
//   };

//   return (
//     <>
//       <div className="verifyAccount-container">
//         <div className="verifyAccount-card">
//           <FaCheckCircle className="verify-icon animated-icon" />
//           <h2>Account Verification</h2>
//           <p>
//             Click on the button below to get verified
//           </p>
//           <ButtonLoader
//             onClick={verifyAccount}
//             className="verify-button"
//             isLoading={isLoading}
//           >
//             Verify Email
//           </ButtonLoader>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Verify;





import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Congratulatory icon
import "./Verify.css";
import Loader from "../../../components/Loader/Loader";
import { RESET, verifyUser } from "../../../redux/features/auth/authSlice";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

const Verify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { verificationToken } = useParams();
  const { isLoading } = useSelector((state) => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
    setTimeout(() => {
      navigate("/upload-kyc", { replace: true });
      window.location.reload(); // Force a refresh of the next page
    }, 3000);
  };

  return (
    <div className="verifyAccount-container">
      <div className="verifyAccount-card">
        <FaCheckCircle className="verify-icon animated-icon" />
        <h2>Account Verification</h2>
        <p>Click on the button below to get verified</p>
        <ButtonLoader
          onClick={verifyAccount}
          className="verify-button"
          isLoading={isLoading}
        >
          Verify Email
        </ButtonLoader>
      </div>
    </div>
  );
};

export default Verify;
