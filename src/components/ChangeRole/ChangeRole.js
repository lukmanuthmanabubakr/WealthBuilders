
import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import './ChangeRole.css';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUsers, upgradeUser } from "../../redux/features/auth/authSlice";
import { EMAIL_RESET, sendAutomatedEmail } from "../../redux/features/email/emailSlice";

const ChangeRole = ({ _id, email, isOpen, onClose }) => {
  const [userRole, setUserRole] = useState("");
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  // Change User role
  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      return toast.error("Please select a role");
    }

    const userData = {
      role: userRole,
      id: _id,
    };

    const emailData = {
      subject: "Account Role Changed - WealthBuilders",
      send_to: email,
      reply_to: "noreply@WealthBuilders",
      template: "changeRole",
      url: "/login",
    };
    await dispatch(upgradeUser(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getUsers());
    dispatch(EMAIL_RESET());
    onClose(); // Close modal after submitting
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Change User Role</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <form onSubmit={changeRole}>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="subscriber">Subscriber</option>
            <option value="author">Author</option>
            <option value="admin">Admin</option>
            <option value="suspended">Suspended</option>
          </select>
          <div className="modal-buttons">
            <button className="submit-btn" type="submit">
              <FaCheck size={15} /> Confirm
            </button>
            <button className="cancel-btn" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeRole;
