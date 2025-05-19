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
            console.log('inside');

            const res = await axios.get("http://localhost:7890/dashboard");
            // console.log("Data fetched Successfully!", res.status, res.data.data);
            setData(res.data.data);
            data.forEach((d) => console.log(d.total));
        } catch (err) {
            console.error("Error fetching data:", err);
            alert("Failed to fetch. Please try again.");
        }
    };
    const downloadExcel = () => {
        console.log("code for download excel");

    }
    return (
        <div className="dashboard-container">

            <div className="card-container">
                {data.map((item, index) => (
                    <div className="card" key={index}>
                        <h3>Batch: {item.year}</h3>
                        <p><strong>Total Internships:</strong> {item.total}</p>
                        <p>
                            <strong>Paid:</strong>{' '}
                            <span className="paid">{item.paid}</span>
                        </p>
                        <p>
                            <strong>Unpaid:</strong>{' '}
                            <span className="unpaid">{item.unpaid}</span>
                        </p>
                        <button className="download-btn" onClick={downloadExcel}>
                            Download Excel
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
