import React, { useState } from 'react';
import axios from 'axios';
import "./Main.css"
const Main = () => {
    const initialData = {
        rollno: "",
        name: "",
        email: "",
        contact: "",
        semester: "",
        branch: "",
        companyname: "",
        type: "",
        doj: "",
        doc: "",
        internshipLetter: "",
    };

    const [data, setData] = useState(initialData);

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = [
            "rollno", "name", "email", "contact",
            "semester", "branch", "companyname",
            "type", "doj", "doc"
        ];

        const hasEmptyField = requiredFields.some(field => !data[field]);

        if (hasEmptyField) {
            alert("Please fill all the required fields before submitting.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:7890/student", { data });
            console.log("Data saved successfully", res.status);
            alert("Data has been sent successfully!");
            setData(initialData);
        } catch (error) {
            console.error("Error while sending data:", error);
            alert("There was an error sending your data.");
        }
    };


    return (
        <div id="main">
            <form id="div-container">
                <div id="student-details">
                    <label htmlFor="rollno">University Roll No:</label>
                    <input type="number" id="rollno" name="rollno" required value={data.rollno} onChange={handleChange} />

                    <label htmlFor="name">Full Name:</label>
                    <input type="text" id="name" name="name" required value={data.name} onChange={handleChange} />

                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" name="email" required value={data.email} onChange={handleChange} />

                    <label htmlFor="contact">Contact Number:</label>
                    <input type="tel" id="contact" name="contact" pattern="[0-9]{10}" placeholder="Enter 10-digit number" required value={data.contact} onChange={handleChange} />

                    <label htmlFor="semester">Semester:</label>
                    <select id="semester" name="semester" required value={data.semester} onChange={handleChange}>
                        <option value="">-- Select Semester --</option>
                        <option value="5 semester">5 semester</option>
                        <option value="6 semester">6 semester</option>
                        <option value="7 semester">7 semester</option>
                        <option value="8 semester">8 semester</option>
                    </select>

                    <label htmlFor="branch">Branch:</label>
                    <select id="branch" name="branch" required value={data.branch} onChange={handleChange}>
                        <option value="">-- Select Branch --</option>
                        <option value="CSE">CSE</option>
                        <option value="CSE-AIML">CSE-AIML</option>
                        <option value="IT">IT</option>
                        <option value="DS">DS</option>
                        <option value="CE">CE</option>
                        <option value="ELCE">ELCE</option>
                    </select>
                </div>

                <div id="company-details">
                    <label htmlFor="companyname">Company Name:</label>
                    <input type="text" id="companyname" name="companyname" required value={data.companyname} onChange={handleChange} />

                    <div className="type">
                        <label htmlFor="type-of-internship">Internship Type:</label>
                        <input type="radio" id="paid" name="type" value="paid" checked={data.type === "paid"} onChange={handleChange} />
                        <label htmlFor="paid">Paid</label>
                        <input type="radio" id="unpaid" name="type" value="unpaid" checked={data.type === "unpaid"} onChange={handleChange} />
                        <label htmlFor="unpaid">Unpaid</label>
                    </div>

                    <label htmlFor="doj">Date of Joining:</label>
                    <input type="date" id="doj" name="doj" required value={data.doj} onChange={handleChange} />

                    <label htmlFor="doc">Date of Completion:</label>
                    <input type="date" id="doc" name="doc" required value={data.doc} onChange={handleChange} />

                    <label htmlFor="internshipLetter">Upload Internship Letter (PDF or DOCX):</label>
                    <input type="file" id="internshipLetter" name="internshipLetter" accept=".pdf, .doc, .docx" onChange={handleChange} />
                </div>

                <button id="submit" type="submit" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    );
};

export default Main;
