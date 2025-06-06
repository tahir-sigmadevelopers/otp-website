const OTP = require('../models/otp');
const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP to phone number
exports.sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    // Validate phone number
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    
    // Generate new OTP
    const otp = generateOTP();
    
    // Save OTP to database
    await OTP.create({
      phoneNumber,
      otp,
    });
    
    // Send OTP via Twilio
    await twilioClient.messages.create({
      body: `Your OTP verification code is: ${otp}. Valid for 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'OTP sent successfully' 
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send OTP', 
      error: error.message 
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    
    // Validate input
    if (!phoneNumber || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }
    
    // Find the most recent OTP for this phone number
    const otpRecord = await OTP.findOne({ 
      phoneNumber 
    }).sort({ createdAt: -1 });
    
    // Check if OTP exists and matches
    if (!otpRecord) {
      return res.status(404).json({ 
        success: false, 
        message: 'OTP not found. Please request a new one.' 
      });
    }
    
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP. Please try again.' 
      });
    }
    
    // OTP is valid, delete it to prevent reuse
    await OTP.deleteOne({ _id: otpRecord._id });
    
    res.status(200).json({ 
      success: true, 
      message: 'OTP verified successfully' 
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify OTP', 
      error: error.message 
    });
  }
};
