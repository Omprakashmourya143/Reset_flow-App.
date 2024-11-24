// backend/controllers/authController.js
const { forgotPassword } = require('../services/authService');  // Ensure this import is correct

// Forgot password controller function
const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    // Call the forgotPassword function from authService
    await forgotPassword(email);  // This should now work
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { forgotPasswordController };
