import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NewPasswordForm = () => {
  const { token } = useParams(); // Get the token from the URL params
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      // Send the new password and token to the backend
      await axios.post('http://localhost:5000/api/auth/reset-password', { token, newPassword });
      setMessage('Password reset successfully!');
      
      // Redirect to login page after successful reset
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setMessage('Failed to reset password. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Reset Your Password</h2>
      <Form onSubmit={handlePasswordReset}>
        <Form.Group controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </Container>
  );
};

export default NewPasswordForm;
