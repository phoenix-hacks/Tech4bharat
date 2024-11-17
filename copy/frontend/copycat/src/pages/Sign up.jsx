import React, { useState } from 'react';
import '../css/signup.css'; // Make sure to include the corresponding CSS file
import { FaGithub } from "react-icons/fa"; // GitHub Icon
import google from '../assets/Image/google.png';
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup.js";

const SignUp = () => {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const { loading, signup } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass the correct state 'formData' to the signup function
    await signup(formData);
  };

  return (
    <div className="container">
      <div className='la'>
        <br>
        </br>
      </div>
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className='signup1'>Sign Up</h2>

        <div className="input-group">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username_1"
            value={formData.username} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={formData.password} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="********"
            value={formData.confirmPassword} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <p>Or Login with</p>
        <div className="social-login">
          <div className="social-buttons">
            <button type="button" className="google-btn">
              <img src={google} alt='google' height={26} width={26}></img><div>Continue with Google</div>
            </button>

            <button type="button" className="github-btn">
              <FaGithub style={{ marginRight: "8px" }} /><div>Continue with GitHub</div>
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Sign Up
        </button>

        <p className="login-link">
          <Link to={"/login"}>Already have an account?</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
