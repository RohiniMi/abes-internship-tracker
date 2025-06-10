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
          <Link to="/hod-dashboard"><button>Department</button></Link>
        </div>
        <div className="right-nav">
          <Link to="/notification"><button>Notifications</button></Link>
          <Link to="/send-id-pass"><button>Send ID & Pass</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
