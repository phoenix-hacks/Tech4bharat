import React, { useState, useEffect } from 'react';
import logo from '../assets/Image/logo.png';
import '../css/Navbar.css'
import { FaHome} from "react-icons/fa";


const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode to the body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <nav className="navbar">
      {/* Home Icon */}
      <div className="home">
      <FaHome style={{ marginRight: "8px" }} />
        <span>Home</span>
      </div>
      {/* Logo */}
      <div className="logo">
        <img
          src={logo}
          alt="Logo"
        />
      </div>

      

      {/* Dark Mode Button */}
      <div>
      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode} className="dark-mode-btn">
          {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
