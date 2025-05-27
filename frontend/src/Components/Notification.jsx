import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notification.css';
import Support from './Support';

const Notification = () => {
  const [emailBody, setEmailBody] = useState("");
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.post("http://localhost:7890/notification/dept", { dept: "CSE" });
      setData(res.data.data);
      (res.data.data).forEach(element => {
        console.log(element._id);
      });
      console.log(res.data.data);

    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to fetch. Please try again.");
    }
  };

  const handleAccept = async (item) => {
    try {
      const res = await axios.post("http://localhost:7890/notification/internship", { "id": item._id });
      if (res.status === 200) {
        setToastMessage(`Accepted request of ${item.name}`);
        setShowToast(true);
        setTimeout(() => { setShowToast(false); window.location.reload(); }, 3000);
      } else {
        setToastMessage(`Rejected request of ${item.name}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }

    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to fetch. Please try again.");
    }

  };


  const handleReject = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };
  const handleRejectEmail = ()=>{
    console.log(emailBody);
    console.log(selectedItem?.email);
    
    
  }

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
      {showToast && (
        <div className="custom-toast">
          {toastMessage}
          <div className="progress-bar"></div>
        </div>
      )}

      <h2 className="title">Department Notifications</h2>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="notification-card">
            <h3 className="student-name">{item.name.toUpperCase()}</h3>
            <p className="branch-year">{item.branch} {item.year} - Year</p>
            <p><strong>Company:</strong> {item.companyname.toUpperCase()}</p>
            <p><strong>Joining Date:</strong> {item.doj}</p>
            <p><strong>Completion Date:</strong> {item.doc}</p>
            <p><strong>Internship Type:</strong> {item.type}</p>
            <p>
              <strong>Internship Letter:</strong>{" "}
              <a
                href={`http://localhost:7890${item.internshipLetter}`}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="download-link"
              >
                Download
              </a>
            </p>

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
            <Support />
            <div className="popup-buttons">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" value={selectedItem.email} />
              <label htmlFor="body">Body:</label><br/>
              <textarea
                name="body"
                id="body"
                rows="10"
                cols="37"
                placeholder="Write your message here..."
                required
                value={emailBody}
                onChange={(e)=>setEmailBody(e.target.value)}
              ></textarea>
              <button  onClick={handleRejectEmail}>SEND</button>
              {/* <button className="btn just-reject" onClick={handleJustReject}>Just Reject</button>
              <button className="btn reject-msg" onClick={handleRejectWithMessage}>Reject with Message</button> */}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Notification;
