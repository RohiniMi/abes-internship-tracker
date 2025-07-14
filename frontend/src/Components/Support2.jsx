import React, { useState } from "react";
import axios from "axios";
import "./Support.css";

const Support = () => {
    const initialData = {
        email:"",
        subject: "",
        body: "",
    };

    const [data, setData] = useState(initialData);
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSend = async (e) => {
        e.preventDefault();
        const requiredFields = [ "email","subject","body"];
        const hasEmptyField = requiredFields.some(field => !data[field]);

        if (hasEmptyField) {
            alert("Please fill all the required fields before sending the mail.");
            return;
        }
        try {
            const res = await axios.post("http://localhost:7890/support/email", data);
            console.log("Mail sent successfully", res.status);
            alert("Mail sent successfully!");
            setIsOpen(false);
            setData(initialData);
        } catch (err) {
            console.error("Error sending email:", err);
            alert("Failed to send the message. Please try again.");
        }
    };

    return (
        <div id="support">
            {isOpen && (
                <div id="mail">
                    <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>

                    <h2>Contact Support</h2>

                    <div className="popup-content">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            value={data.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="subject">Subject:</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="Enter subject"
                            required
                            value={data.subject}
                            onChange={handleChange}
                        />

                        <label htmlFor="body">Body:</label>
                        <textarea
                            name="body"
                            id="body"
                            rows="10"
                            cols="60"
                            placeholder="Write your message here..."
                            required
                            value={data.body}
                            onChange={handleChange}
                        ></textarea>

                        <button id="send-email" onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}

            <button className="support-btn" onClick={() => setIsOpen(true)}>
                Send Email to User?
            </button>
        </div>
    );
};

export default Support;
