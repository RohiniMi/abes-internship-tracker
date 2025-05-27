import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header.jsx";
import Main from "./Components/Main.jsx";
import Support from "./Components/Support.jsx";
import Footer from "./Components/Footer.jsx";
import Login from "./Components/Login.jsx";
import "./App.css";

import Dashboard2 from './Components/Dashboard2.jsx';
import HODDashboard from './Components/HODDashboard.jsx';
import Notification from './Components/Notification.jsx';

const App = () => {
  return (
    <Router>
      <div id="root">
        <Header />
        <Routes>
          <Route path="/home" element={<Dashboard2/>} />
          <Route path="/internship" element={<Main />} />
          <Route path="/hod-dashboard" element={<HODDashboard />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Support />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
