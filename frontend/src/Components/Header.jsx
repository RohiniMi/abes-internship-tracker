import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const storage = localStorage.getItem("token") ? localStorage : sessionStorage;
  const token = storage.getItem("token");
  const role = storage.getItem("role");
  const department = storage.getItem("department");
  const email = storage.getItem("email");
  console.log(email, "from header");

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header">
      <div className="nav-container">
        <h1 className="header-title">Student Internship Tracker</h1>

        <div className="left-nav">
          {(role === "admin" || role === "ccpd") && (
            <Link to="/home"><button>Home</button></Link>
          )}
          {role === "student" && (
            <Link to="/internship"><button>Internship Registration</button></Link>
          )}
          {role === "hod" && (
            <Link to="/hod-dashboard">
              <button>Department ({department})</button>
            </Link>
          )}
          {role === "hod" && (
            <Link to="/notification"><button>Notifications</button></Link>
          )}
          {(role === "admin" || role === "hod") && (
            <Link to="/send-id-pass"><button>Send ID & Pass</button></Link>
          )}
        </div>

        <div className="right-nav" ref={dropdownRef}>
          {(role === "admin" || role === "hod") && (
            <Link to="/admin-manage"><button>Manage</button></Link>
          )}
          {token ? (
            <div className="user-dropdown">
              <FaUserCircle
                size={32}
                className="user-icon"
                onClick={() => setDropdownOpen(prev => !prev)}
              />
              <div className="user-role">
                {role}{role === "hod" && department ? ` (${department})` : ""}
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-section">
                    <strong>Profile</strong>
                    <div className="dropdown-email">{email}</div>
                  </div>
                  <hr />
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"><button>Login</button></Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
