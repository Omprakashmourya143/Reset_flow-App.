const { hashPassword } = require('../services/hashPassword');
const User = require('../models/User');

// Add a new user (example scenario)
const createUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    // Hash the password before saving the user
    const hashedPassword = await hashPassword(password);

    // Create the new user with the hashed password
    const newUser = new User({ email, password: hashedPassword });

    // Save the user in the database
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

module.exports = { createUser };
