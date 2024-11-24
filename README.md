

Backend

API Endpoints
1. Forgot Password
URL: /api/auth/forgot-password
Method: POST
Description: Sends a password reset email to the user.
Request Body:
json
Copy code
{
  "email": "user@example.com"
}
2. Reset Password
URL: /api/auth/reset-password/:token
Method: POST
Description: Resets the user's password.
Request Body:
json
Copy code
{
  "newPassword": "newSecurePassword"
}

Dependencies :- 

Express.js
Mongoose
Nodemailer
bcrypt
jsonwebtoken

Frontend

Dependencies

React
Bootstrap
Axios (for API requests)

Deployment
Render: To deploy on Render, connect the repository and configure environment variables.
