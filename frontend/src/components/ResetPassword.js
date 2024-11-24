// ResetPassword.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL params
  const navigate = useNavigate();
  const [validToken, setValidToken] = useState(null); // State to check if token is valid
  const [newPassword, setNewPassword] = useState(''); // State for new password input
  const [message, setMessage] = useState(''); // State for messages (errors, success)

  // Validate token on component mount
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/reset-password/${token}`);
        setValidToken(res.data.valid); // Assuming the backend sends {valid: true/false}
      } catch (error) {
        setMessage('Invalid or expired token');
      }
    };
    checkToken();
  }, [token]);

  // Handle password reset form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send new password and token to backend to reset the password
      await axios.post('http://localhost:5000/api/auth/reset-password', { token, newPassword });
      setMessage('Password reset successfully!');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
    } catch (error) {
      setMessage('Failed to reset password.');
    }
  };

  // If token is being validated, show loading state
  if (validToken === null) {
    return <p>Loading...</p>;
  }

  // If token is invalid, show an error message
  if (!validToken) {
    return <p>{message}</p>;
  }

  return (
    <Container>
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </Container>
  );
};

export default ResetPassword;
