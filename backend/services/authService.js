// backend/services/authService.js
const nodemailer = require('nodemailer');
const User = require('../models/User');
const ResetToken = require('../models/ResetToken');
const crypto = require('crypto');

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

// Create a transporter for Nodemailer (Gmail is used here)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your email address from .env
    pass: process.env.EMAIL_PASS,  // Your app password from .env
  },
});

// Function to send password reset email
const sendPasswordResetEmail = async (email, resetLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `Click the link below to reset your password:\n\n${resetLink}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send password reset email');
  }
};

// Function to handle forgot password request
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  // Generate a random token for the password reset link
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

  // Store the reset token in the database with an expiration date
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1); // 1 hour expiry

  const tokenData = new ResetToken({
    userId: user._id,
    token: resetToken,
    expiresAt: expirationDate,
  });

  await tokenData.save();

  // Send the password reset email
  await sendPasswordResetEmail(email, resetLink);
};

module.exports = {
  forgotPassword,
};
