import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:7890/admin/send-credentials'; 

const ManageCredentials = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendCredentials = async () => {
        if (!email.trim()) {
            setMessage('Please enter a valid email.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(API_URL, { email });
            setMessage(`Success: ${response.data.message || 'Credentials sent successfully!'}`);
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || 'Failed to send credentials.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
            <h2>Send Credentials</h2>
            <input
                type="email"
                placeholder="Enter user email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />
            <button
                onClick={handleSendCredentials}
                disabled={loading}
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                {loading ? 'Sending...' : 'Send Credentials'}
            </button>
            {message && (
                <p style={{ marginTop: '1rem', color: message.startsWith('Error') ? 'red' : 'green' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default ManageCredentials;
