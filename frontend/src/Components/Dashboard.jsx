import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get("https://abes-internship-tracker.onrender.com/dashboard");
            console.log("Data fetched Successfully!", res.status, res.data);
            setData(res.data.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            alert("Failed to fetch. Please try again.");
        }
    };
    return (
        <div className="dashboard-container">
            <div className="card-container">
                {data.map((item, index) => (
                    <div className="card" key={index}>
                        <h3>{item.name}</h3>
                        <p><strong>Roll No:</strong> {item.rollno}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Contact:</strong> {item.contact}</p>
                        <p><strong>Company:</strong> {item.companyname}</p>
                        <p><strong>Type:</strong> {item.type}</p>
                        <p><strong>Joining Date:</strong> {item.doj}</p>
                        <p><strong>Completion Date:</strong> {item.doc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
