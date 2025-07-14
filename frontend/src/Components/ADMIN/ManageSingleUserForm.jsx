import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:7890/admin/send-credentials/single-user';
const DEPT_API = 'http://localhost:7890/admin/manage-departments';

const SingleUserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(DEPT_API)
            .then((res) => setDepartments(res.data || []))
            .catch((err) => console.error('Failed to load departments', err));
    }, []);

    const handleSend = async () => {
        if (!email.trim()) return setMessage('Please enter a valid email.');

        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(API_URL, {
                name,
                email,
                role: role || undefined,
                department: department || undefined,
            });
            setMessage(`✅ ${response.data.message || 'Credentials sent!'}`);
        } catch (err) {
            setMessage(`❌ ${err.response?.data?.message || 'Error sending credentials.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="name"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="manage-input"
            />
            <input
                type="email"
                placeholder="User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="manage-input"
            />

            <select value={role} onChange={(e) => setRole(e.target.value)} className="manage-select">
                <option value="">Select Role (Optional)</option>
                <option value="admin">Admin</option>
                <option value="hod">HOD</option>
                <option value="ccpd">CCPD</option>
                <option value="student">Student</option>
            </select>

            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="manage-select">
                <option value="">Select Department (Optional)</option>
                {departments.map((dept) => (
                    <option key={dept._id} value={dept.name}>{dept.name}</option>
                ))}
            </select>

            <button onClick={handleSend} disabled={loading} className="manage-button">
                {loading ? 'Sending...' : 'Send Credentials'}
            </button>

            {message && (
                <p className={`manage-message ${message.startsWith('❌') ? 'error' : 'success'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default SingleUserForm;
