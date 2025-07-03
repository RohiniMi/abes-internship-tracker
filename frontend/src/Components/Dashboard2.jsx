import { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './Dashboard2.css';
import CCPD2 from './CCPD2.jsx';

const Dashboard2 = () => {
    const [data, setData] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState('All');
    const [year, setYear] = useState('');

    useEffect(() => {
        getData();
    }, [selectedBatch]);

    const getData = async () => {
        try {
            const res = await axios.post('http://localhost:7890/dashboard/batch', { selectedBatch });
            const batchData = res.data?.data?.[0] || {};
            setData([
                {
                    department: 'All',
                    ...batchData,
                    data: batchData?.data || []
                }
            ]);
            setYear(res.data.batch);
        } catch (err) {
            console.error('Error fetching data:', err);
            alert('Failed to fetch. Please try again.');
        }
    };

    const handleBatchChange = (e) => {
        setSelectedBatch(e.target.value);
    };

    const downloadExcel = async (department) => {
        try {
            const res = await axios.post('http://localhost:7890/dashboard/batch-and-branch/download', {
                selectedBatch,
                dept: department,
            });

            const jsonData = res.data.data;
            if (!jsonData || jsonData.length === 0) {
                alert('No data available to export.');
                return;
            }

            const worksheet = XLSX.utils.json_to_sheet(jsonData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, department);
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            const fileName = `Internships_${selectedBatch}_${department}_${new Date().toISOString().slice(0, 10)}.xlsx`;
            saveAs(dataBlob, fileName);
        } catch (err) {
            console.error('Error generating Excel:', err);
            alert('Failed to download Excel. Please try again.');
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <div className="dashboard-sidebar">
                <h2 className="sidebar-title">Filters</h2>

                <label htmlFor="batchSelect">Select Batch:</label>
                <select id="batchSelect" onChange={handleBatchChange} value={selectedBatch}>
                    <option value="All">All</option>
                    <option value="Third">2022-2026</option>
                    <option value="Final">2021-2025</option>
                </select>

                <CCPD2 selectedBatch={selectedBatch} data={data} setData={setData} />
            </div>

            <div className="dashboard-main">
                <h2 className="dashboard-title">Internship Dashboard</h2>

                <div className="dashboard-grid">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((deptData, index) => {
                            const internships = Array.isArray(deptData?.data) ? deptData.data : [];

                            return (
                                <div className="card" key={index}>
                                    <div className="card-header">
                                        <h3>
                                            Batch: {year} Year | Department: {deptData.department || 'N/A'}
                                        </h3>
                                    </div>

                                    <div className="card-body">
                                        {internships.length > 0 ? (
                                            <>
                                                <p><strong>Total Internships:</strong> {internships.length}</p>

                                                <div className="status-box paid-status">
                                                    <strong>Paid: {deptData.paid || 0}</strong>
                                                    <div className="sub-status">
                                                        <p>✅ Completed: <span>{deptData.paidCompleted || 0}</span></p>
                                                        <p>⌛ Not Completed yet: <span>{deptData.paidUncompleted || 0}</span></p>
                                                    </div>
                                                </div>

                                                <div className="status-box unpaid-status">
                                                    <strong>Unpaid: {deptData.unpaid || 0}</strong>
                                                    <div className="sub-status">
                                                        <p>✅ Completed: <span>{deptData.unpaidCompleted || 0}</span></p>
                                                        <p>⌛ Not Completed yet: <span>{deptData.unpaidUncompleted || 0}</span></p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <p><strong>No data available for this department.</strong></p>
                                        )}

                                        <button
                                            className="download-btn"
                                            onClick={() => downloadExcel(deptData.department)}
                                        >
                                            {internships.length > 0 ? "Download Excel" : "Download Empty Excel"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center mt-6 text-gray-500">No data to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard2;
