import { useState } from 'react';
import axios from 'axios';

const SendIDPass = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [file, setFile] = useState(null);

    const handleSend = async () => {
        if (!file) {
            alert("Please upload a valid Excel file before sending.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); 

        try {
            const res = await axios.post("http://localhost:7890/department/sendEmail",formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Response status:", res.status);
            alert("Emails sent successfully!");
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send emails.");
        }
    };


    return (
        <div>
            <button onClick={() => setShowPopup(true)}>
                Upload File to Send ID Password in Excel
            </button>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
                        <p className="popup-title">
                            Choose an Excel file to send user ID and password to students
                        </p>
                        <div className="popup-buttons">
                            <label htmlFor="sendEmail">
                                Upload Excel File of Student Email IDs (.xlsx or .xls only):
                            </label>
                            <input
                                type="file"
                                id="sendEmail"
                                name="sendEmail"
                                accept=".xlsx, .xls"
                                onChange={e => setFile(e.target.files[0])}
                            />
                            <button onClick={handleSend}>SEND</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SendIDPass;
