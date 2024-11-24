// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { forgotPasswordController } = require('../controllers/authController');  // Correct import

router.post('/forgot-password', forgotPasswordController);

module.exports = router;
