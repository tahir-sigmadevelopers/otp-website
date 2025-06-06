import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Send OTP to phone number
export const sendOTP = async (phoneNumber) => {
  try {
    const response = await api.post('/otp/send', { phoneNumber });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Verify OTP
export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const response = await api.post('/otp/verify', { phoneNumber, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Send bulk OTPs
export const sendBulkOTP = async (bulkData, progressCallback) => {
  try {
    const response = await api.post('/otp/bulk-send', bulkData, {
      onUploadProgress: (progressEvent) => {
        // This won't actually track the SMS sending progress, just the upload
        // The actual progress will be tracked via server-sent events or polling
        if (progressCallback) {
          progressCallback(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api; 