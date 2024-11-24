// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword'; // Corrected to ResetPassword
import EmailSent from './components/EmailSent';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/emailsent" element={<EmailSent />} />
        <Route path="/" element={<h1>Welcome to the Password Reset App</h1>} />
      </Routes>
    </div>
  );
}

export default App;
