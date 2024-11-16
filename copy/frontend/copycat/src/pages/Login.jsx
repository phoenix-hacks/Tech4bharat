import React from 'react';
import '../css/Login.css';
// Import the corresponding CSS file
import { FaGoogle, FaGithub } from 'react-icons/fa';

import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();
  
	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};
  const handleGoogleLogin = () => {
    console.log("Google login clicked!");
  };

  const handleGithubLogin = () => {
    console.log("GitHub login clicked!");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" placeholder="Username" required value={username}
							onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required value={password}
							onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="forgot-password">
            <a href="#"><Link to='/signup'>
						{"Don't"} have an account?
					</Link></a>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p>Or login with:</p>
        <div className="social-login">
          <button onClick={handleGoogleLogin} className="google-btn">
            <FaGoogle className="icon" />
            Google
          </button>
          <button onClick={handleGithubLogin} className="github-btn">
            <FaGithub className="icon" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
