import React from 'react'
import axios from 'axios';

const Dashboard = () => {
    const getData = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:7890/dashboard");
            console.log("Data fetched Successfully!", res.status,res.data);
            // res.data.filter((d)=>console.log(d));
            alert("Data fetched Successfully!");
        } catch (err) {
            console.error("Error sending email:", err);
            alert("Failed to fetch. Please try again.");
        }
    }
    return (
        <button onClick={getData}>Dashboard</button>
    )
}

export default Dashboard