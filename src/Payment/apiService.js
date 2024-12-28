import axios from "axios";

// Base URL for the backend API
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const PAYMENT_URL = `${BACKEND_URL}api`;

// Check admin wallet
export const getAdminWallet = async () => {
  try {
    const response = await axios.get(`${PAYMENT_URL}/adminWallet`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token for protected route
      },
    });
    return response.data; // Returns the wallet address and message
  } catch (error) {
    console.error("Error fetching admin wallet address:", error);
    throw error; // Handle error appropriately in your component
  }
}


// Function to create a new payment transaction
export const createTransaction = async (token, amount) => {
  try {
    const response = await axios.post(
      `${PAYMENT_URL}/payments/create`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : "Transaction creation failed"
    );
  }
};
//Get update admin wallet address


export const getPaymentStatus = async (token, transactionId) => {
  try {
    const response = await axios.get(
      `${PAYMENT_URL}/payments/viewPaymentStatus/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch payment status"
    );
  }
};

// Function to confirm payment
export const confirmPayment = async (token, transactionId, status, notes) => {
  try {
    const response = await axios.patch(
      `${PAYMENT_URL}/payments/confirmPayment`,
      {
        transactionId,
        status,
        notes,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to confirm payment"
    );
  }
};

//RejectPayment 
export const rejectPayment = async (token, transactionId, status, notes) => {
  try {
    const response = await axios.patch(
      `${PAYMENT_URL}/payments/rejectPayment`,
      {
        transactionId,
        status,
        notes,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to confirm payment"
    );
  }
};


// Function to start an investment
export const startInvestment = async (token, planName, amount) => {
  try {
    const response = await axios.post(
      `${PAYMENT_URL}/invest/start-invest`,
      { planName, amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns success message or any response data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to start investment"
    );
  }
};
