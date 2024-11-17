import React, { useState } from 'react';
import '../css/Login.css'; // Importing the CSS file
import { Link } from "react-router-dom";
import ditector from '../pages/ditector.jsx';

const LoginPage = () => {
  // State to store the form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with Email: ${email}`);
    // Logic for form submission here (e.g., API call for login)
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="form-actions">
            <Link to={"/ditector"}><button type="submit" className="login-btn" >Login</button></Link>
            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
          </div>
        </form>

        <div className="social-login">
          <button className="google-btn">Login with Google</button>
          <button className="github-btn">Login with GitHub</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
