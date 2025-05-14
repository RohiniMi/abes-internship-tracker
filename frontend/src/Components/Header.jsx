import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <h1>Student Internship Tracker</h1>
      <div className="nav-container">
        <div className="left-nav">
          <Link to="/home"><button>Home</button></Link>
          <Link to="/internship"><button>Internship Registration</button></Link>
        </div>
        <div className="right-nav">
          <Link to="/login"><button>Login</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
