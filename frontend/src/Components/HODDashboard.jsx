import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import "./Dashboard2.css";
const HODDashboard = () => {
    const [data, setData] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState('All');
    const [year,setYear] = useState("");
    const dept = "CSE";

    useEffect(() => {
        getData();
    }, [selectedBatch]);

    const getData = async () => {
        try {
            const res = await axios.post("http://localhost:7890/dashboard/batch/dept", { selectedBatch,dept });
            setData(res.data.data[0]);
            setYear(res.data.batch);
        } catch (err) {
            console.error("Error fetching data:", err);
            alert("Failed to fetch. Please try again.");
        }
    };
    const handleBatchChange = (e) => {
        setSelectedBatch(e.target.value);
    };
    const downloadExcel = async () => {
        try {
            const res = await axios.post("http://localhost:7890/dashboard/batch/dept/download", { selectedBatch,dept });
            const jsonData = res.data.data;
            if (!jsonData || jsonData.length === 0) {
                alert("No data available to export.");
                return;
            }
            const worksheet = XLSX.utils.json_to_sheet(jsonData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, selectedBatch);
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            const fileName = `Internships_${selectedBatch}_${new Date().toISOString().slice(0, 10)}.xlsx`;
            saveAs(dataBlob, fileName);
        } catch (err) {
            console.error("Error generating Excel:", err);
            alert("Failed to download Excel. Please try again.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>CSE Department Internship Dashboard</h2>
            <div className="controls">
                <label htmlFor="batchSelect">Select Batch: </label>
                <select id="batchSelect" onChange={handleBatchChange} value={selectedBatch}>
                    <option value="All">All</option>
                    <option value="Third">2022-2026</option>
                    <option value="Final">2021-2025</option>
                </select>
            </div>
            {data && (
                <div className="card">
                    <div className="card-header">
                        <h3>Batch: {year} Year</h3>
                    </div>

                    <div className="card-body">
                        <p><strong>Total Internships:</strong> {data.total}</p>

                        <div className="status-box paid-status">
                            <strong>Paid: {data.paid}</strong>
                            <div className="sub-status">
                                <p>✅ Completed: <span>{data.paidCompleted}</span></p>
                                <p>⌛ Not Completed yet: <span>{data.paidUncompleted}</span></p>
                            </div>
                        </div>

                        <div className="status-box unpaid-status">
                            <strong>Unpaid: {data.unpaid}</strong>
                            <div className="sub-status">
                                <p>✅ Completed: <span>{data.unpaidCompleted}</span></p>
                                <p>⌛ Not Completed yet: <span>{data.unpaidUncompleted}</span></p>
                            </div>
                        </div>

                        <button className="download-btn" onClick={downloadExcel}>
                            Download Excel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HODDashboard;