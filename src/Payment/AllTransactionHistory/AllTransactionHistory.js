import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllTransactionHistory.css";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const All_TRANSACTIONS = `${BACKEND_URL}api/invest`;

const AllTransactionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item for the modal

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/invest/getTransactionHistory')
  //     .then(response => {
  //       const { history } = response.data;

  //       // Merge transactions and investments with common fields
  //       const mergedHistory = history.map(item => ({
  //         ...item,
  //         type: item.transactionId ? 'Transaction' : 'Investment',
  //         timestamp: item.transactionId ? item.createdAt : item.startDate,
  //       }));

  //       // Sort merged history by timestamp
  //       const sortedHistory = mergedHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  //       setHistory(sortedHistory);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setError('Failed to fetch data.');
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`${All_TRANSACTIONS}/getTransactionHistory`)
      .then((response) => {
        const { history } = response.data;

        // Merge and process all history types (Transactions, Investments, Withdrawals)
        const processedHistory = history.map((item) => {
          let timestamp = item.createdAt || item.startDate || item.requestDate;

          // Add unified fields to all items for consistency
          return {
            ...item,
            timestamp: timestamp,
          };
        });

        // Sort history by timestamp (latest first)
        const sortedHistory = processedHistory.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        setHistory(sortedHistory);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, []);

  useRedirectLoggedOutUser("/login");

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set selected item to show in the modal
  };

  const handleCloseModal = () => {
    setSelectedItem(null); // Close the modal
  };

  if (loading) {
    return <div className="loading_transaction">Loading...</div>;
  }

  if (error) {
    return <div className="error_transaction">{error}</div>;
  }

  return (
    <div className="history-container">
      <h2 className="section-title">All Transaction & Investment History</h2>
      {history.length > 0 ? (
        <div className="history-cards">
          {history.map((item) => (
            <div
              key={item._id}
              className="history-card"
              onClick={() => handleItemClick(item)}
            >
              <div className="card-header">
                <p className="history-item-type">
                  {item.type === "Transaction" && "💳 Transaction"}
                  {item.type === "Investment" && "💼 Investment"}
                  {item.type === "Withdrawal" && "💵 Withdrawal"}
                </p>
                {item.type === "Transaction" && (
                  <p className={`status ${item.status.toLowerCase()}`}>
                    {item.status === "Confirmed" ? (
                      <span className="status-icon confirmed">✔️</span>
                    ) : item.status === "Pending" ? (
                      <span className="status-icon cancelled">⏳</span>
                    ) : item.status === "Rejected" ? (
                      <span className="status-icon cancelled">❌</span>
                    ) : (
                      item.status
                    )}
                    {item.status}
                  </p>
                )}
                {item.type === "Withdrawal" && (
                  <p className={`status ${item.status.toLowerCase()}`}>
                    {item.status === "Pending" ? (
                      <span className="status-icon cancelled">⏳</span>
                    ) : item.status === "Approved" ? (
                      <span className="status-icon confirmed">✔️</span>
                    ) : (
                      <span className="status-icon rejected">❌</span>
                    )}
                    {item.status}
                  </p>
                )}
              </div>
              <div className="card-body">
                {item.type === "Transaction" ? (
                  <>
                    <p>
                      <strong>Amount:</strong> ${item.amount.toLocaleString()}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </>
                ) : item.type === "Investment" ? (
                  <>
                    <p>
                      <strong>Plan:</strong> {item.plan}
                    </p>
                    <p>
                      <strong>Amount Invested:</strong> $
                      {item.amount.toLocaleString()}
                    </p>
                  </>
                ) : item.type === "Withdrawal" ? (
                  <>
                    <p>
                      <strong>Amount:</strong> ${item.amount.toLocaleString()}
                    </p>
                    <p>
                      <strong>Wallet Address:</strong> {item.walletAddress}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No records found.</p>
      )}

      {/* Modal for displaying details */}
      {/* {selectedItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
              <>
                <p>
                </p>
                <p>
                  <strong>Amount:</strong> $
                </p>
                <p>
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedItem.timestamp).toLocaleString()}
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Investment Plan:</strong> {selectedItem.plan}
                </p>
                <p>
                  <strong>Amount Invested:</strong> $
                  {selectedItem.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(selectedItem.startDate).toLocaleString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(selectedItem.endDate).toLocaleString()}
                </p>
                <p>
                  <strong>Projected Profit:</strong> $
                  {selectedItem.maturityAmount.toLocaleString()}
                </p>
              </>
            )}
            <button className="close-modal" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )} */}

      {selectedItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Details</h3>
            {selectedItem.type === "Transaction" ? (
              <>
                <p>
                  <strong>Transaction ID:</strong> {selectedItem.transactionId}
                </p>
                <p>
                  <strong>Amount:</strong> $
                  {selectedItem.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {selectedItem.status}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedItem.timestamp).toLocaleString()}
                </p>
              </>
            ) : selectedItem.type === "Investment" ? (
              <>
                <p>
                  <strong>Investment Plan:</strong> {selectedItem.plan}
                </p>
                <p>
                  <strong>Amount Invested:</strong> $
                  {selectedItem.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong>
                  {selectedItem.status}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(selectedItem.startDate).toLocaleString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(selectedItem.endDate).toLocaleString()}
                </p>
                <p>
                  <strong>Projected Profit:</strong> $
                  {selectedItem.maturityAmount.toLocaleString()}
                </p>
              </>
            ) : selectedItem.type === "Withdrawal" ? (
              <>
                <p>
                  <strong>Amount:</strong> $
                  {selectedItem.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {selectedItem.status}
                </p>
                <p>
                  <strong>Wallet Address:</strong> {selectedItem.walletAddress}
                </p>
                <p>
                  <strong>Request Date:</strong>{" "}
                  {new Date(selectedItem.timestamp).toLocaleString()}
                </p>
              </>
            ) : null}
            <button className="close-modal" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTransactionHistory;
