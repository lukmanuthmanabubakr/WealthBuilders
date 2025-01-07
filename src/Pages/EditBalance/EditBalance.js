// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./EditBalance.css";

// const EditBalance = () => {
//   const { id } = useParams(); // User ID from URL
//   const navigate = useNavigate();
//   const [amount, setAmount] = useState("");
//   const [operation, setOperation] = useState("add");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_BACKEND_URL}api/users/updateDepositBalance/${id}`,
//         {
//           operation,
//           amount: Number(amount),
//         }
//       );
//       setSuccess(response.data.message);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//       setSuccess("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="edit-wallet">
//       <h2>Edit Wallet Balance</h2>
//       <form onSubmit={handleUpdate}>
//         <label>
//           Amount:
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Operation:
//           <select
//             value={operation}
//             onChange={(e) => setOperation(e.target.value)}
//           >
//             <option value="add">Add</option>
//             <option value="deduct">Deduct</option>
//           </select>
//         </label>
//         <button type="submit" disabled={loading}>
//           {loading ? "Processing..." : "Submit"}
//         </button>
//       </form>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
//       <button className="back-button" onClick={() => navigate(-1)}>
//         Back
//       </button>
//     </div>
//   );
// };

// export default EditBalance;



















import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditBalance.css";

const EditBalance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [operation, setOperation] = useState("add");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/users/updateDepositBalance/${id}`,
        {
          operation,
          amount: Number(amount),
        }
      );
      setSuccess(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-wallet-container">
      <h2>Edit Total Profit</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Operation:
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="add">Add</option>
            <option value="deduct">Deduct</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default EditBalance;
