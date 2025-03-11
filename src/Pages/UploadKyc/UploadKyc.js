import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { toast } from "react-toastify";
import { FaPassport, FaIdCard } from "react-icons/fa";
import { SiUnlicense } from "react-icons/si";
import { IoIosWarning } from "react-icons/io";
import Notification from "../../components/Notification/Notification";
import "./UploadKyc.css";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FORMATS = /jpeg|jpg|png|gif|webp|bmp|heic|pdf/;

const UploadKyc = () => {
  const [frontDoc, setFrontDoc] = useState(null);
  const [backDoc, setBackDoc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const { user } = useSelector((state) => state.auth); // Get logged-in user
  const isVerified = user?.isVerified;
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  // File validation function
  const validateFile = (file) => {
    if (!file) return "Please select a file.";
    if (file.size > MAX_FILE_SIZE) return "File size must be less than 10MB.";
    if (!ALLOWED_FORMATS.test(file.type.split("/")[1]))
      return "Invalid file format. Only JPEG, JPG, PNG, and PDF are allowed.";
    return null;
  };

  // Handle file change
  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      setFile(null);
    } else {
      setFile(file);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!frontDoc || !backDoc) {
      toast.error("Please upload both front and back documents.");
      return;
    }

    const formData = new FormData();
    formData.append("front", frontDoc);
    formData.append("back", backDoc);

    try {
      setUploading(true);
      console.log("Uploading KYC documents...");

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/users/uploadKycDocuments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`, // Send user's token
          },
          withCredentials: true,
        }
      );

      console.log("Upload successful:", response.data);
      toast.success("KYC documents uploaded successfully!");

      // ✅ Navigate to the dashboard after successful upload
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error("Upload error:", error.response || error.message);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-kyc-container">
      {isVerified === false && <Notification />}

      <h2>Upload KYC Documents</h2>
      <p>Complete your KYC with any of these documents</p>

      {/* KYC Document Selection Cards */}
      <div className="kyc-documents">
        <div className="kyc-card">
          <FaPassport />
          <p>Passport</p>
        </div>
        <div className="kyc-card">
          <FaIdCard />
          <p>National ID</p>
        </div>
        <div className="kyc-card">
          <SiUnlicense />
          <p>Driver’s License</p>
        </div>
      </div>

      {/* Warning Section */}
      <div className="warning-section">
        <span className="warning-header">
          <IoIosWarning className="warning-icon" />
          <h3 className="warning-title">Important Notice</h3>
        </span>
        <div className="warning-content">
          <p>Ensure that your uploaded files meet the following requirements</p>
          <ul>
            <li>
              File format must be <b>JPEG, JPG, PNG,</b>.
            </li>
            <li>
              File size must be <b>less than 10MB</b>.
            </li>
            <li>
              Upload both <b>front and back</b> of your document.
            </li>
            <li>Blurry or incomplete documents will be rejected.</li>
          </ul>
        </div>
      </div>

      {/* File Upload Form */}
      <form onSubmit={handleFileUpload} className="kyc-form">
        <label>Front Document:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setFrontDoc)} />

        <label>Back Document:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setBackDoc)} />

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit KYC"}
        </button>
      </form>
    </div>
  );
};

export default UploadKyc;
