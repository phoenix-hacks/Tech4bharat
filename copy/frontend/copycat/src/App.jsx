import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No need for <Router> here
import Navbar from './pages/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/Sign up.jsx'; // Rename the file if it has a space
import Ditector from './pages/ditector.jsx';
import Plagiarism from './pages/plagiarism.jsx';
// import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Navbar /> {/* Navbar will appear on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ditector" element={<Ditector />} />
        <Route path="/plagiarism" element={<Plagiarism />} />
      </Routes>
      {/* <Toaster /> */}
    </>
  );
};

export default App;
