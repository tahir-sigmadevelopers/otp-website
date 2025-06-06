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

export default api; 