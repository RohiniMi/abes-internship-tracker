import React, { useState } from 'react';
import axios from 'axios';

const BULK_API = 'http://localhost:7890/admin/send-credentials/bulk';

const MultipleUserForm = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage('');
    };

    const handleUpload = async () => {
        if (!file) return setMessage('Please upload a file.');
        console.log('Uploading...'); 
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        setMessage('');
        console.log(formData);
        
        try {
            const res = await axios.post(BULK_API, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(`✅ ${res.data.message || 'Bulk credentials sent successfully!'}`);
        } catch (err) {
            setMessage(`❌ ${err.response?.data?.message || 'Failed to send bulk credentials.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="manage-input"
            />

            <button onClick={handleUpload} disabled={loading} className="manage-button">
                {loading ? 'Uploading...' : 'Upload and Send'}
            </button>

            {message && (
                <p className={`manage-message ${message.startsWith('❌') ? 'error' : 'success'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default MultipleUserForm;
