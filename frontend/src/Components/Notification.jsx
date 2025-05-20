import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notification.css';

const Notification = () => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.post("http://localhost:7890/notification/dept", { dept: "CSE" });
      setData(res.data.data);
      console.log(res.data.data);

    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to fetch. Please try again.");
    }
  };

  const handleAccept = (item) => {
    alert(`Accepted request of ${item.name}`);
  };

  const handleReject = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleJustReject = () => {
    alert(`Just rejected ${selectedItem?.name}`);
    setShowPopup(false);
  };

  const handleRejectWithMessage = () => {
    alert(`Rejected ${selectedItem?.name} with message`);
    setShowPopup(false);
  };

  return (
    <div className="notification-container">
      <h2 className="title">Department Notifications</h2>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="notification-card">
            <h3 className="student-name">{item.name.toUpperCase()}</h3>
            <p className="branch-year">{item.branch} - Batch {item.year}</p>
            <p><strong>Company:</strong> {item.companyname}</p>
            <p><strong>Joining Date:</strong> {item.doj}</p>
            <p><strong>Completion Date:</strong> {item.doc}</p>
            <p><strong>Internship Type:</strong> {item.type}</p>
            <div className="btn-group">
              <button className="btn accept-btn" onClick={() => handleAccept(item)}>Accept</button>
              <button className="btn reject-btn" onClick={() => handleReject(item)}>Reject</button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-notification">No sufficient notifications to display.</p>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <p className="popup-title">Choose a rejection option:</p>
            <div className="popup-buttons">
              <button className="btn just-reject" onClick={handleJustReject}>Just Reject</button>
              <button className="btn reject-msg" onClick={handleRejectWithMessage}>Reject with Message</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Notification;
