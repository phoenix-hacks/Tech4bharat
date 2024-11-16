import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '../../pages/Sign up.jsx'; // Make sure this path is correct
import Navbar from '../../pages/Navbar.jsx';  // Make sure this path is correct


const AppRoute = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/SignUp" element={<SignUp />} />
                {/* <Route path="*" element={<NotFound />} />   */}
            </Routes>
        </Router>
    );
};

export default AppRoute;
