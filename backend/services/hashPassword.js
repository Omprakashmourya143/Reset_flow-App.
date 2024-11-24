const bcrypt = require('bcryptjs');

// Function to hash a password
const hashPassword = async (password) => {
  try {
    // Generate a salt with 10 rounds of hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword; // Return the hashed password
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
};

module.exports = { hashPassword };
