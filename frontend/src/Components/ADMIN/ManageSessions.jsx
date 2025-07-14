import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:7890/admin/manage-sessions';

const ManageSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [newSession, setNewSession] = useState('');
    const [editingSession, setEditingSession] = useState(null);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const res = await axios.get(API_URL);
            setSessions(res.data);
        } catch (error) {
            console.error(error);
            alert('Error fetching sessions');
        }
    };

    const openDialog = (session = null) => {
        setEditingSession(session);
        setNewSession(session?.name || '');
        setShowDialog(true);
    };

    const handleSave = async () => {
        if (!newSession.trim()) return;

        try {
            if (editingSession) {
                await axios.put(`${API_URL}/${editingSession._id}`, { name: newSession.trim() });
            } else {
                await axios.post(API_URL, { name: newSession.trim() });
            }
            fetchSessions();
            setShowDialog(false);
        } catch (error) {
            console.error(error);
            alert('Error saving session');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this session?')) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchSessions();
        } catch (error) {
            console.error(error);
            alert('Error deleting session');
        }
    };

    return (
        <div>
            <h2>Manage Sessions</h2>
            <button onClick={() => openDialog()} style={{ margin: '10px 0', padding: '6px 12px' }}>
                Add Session
            </button>

            <ul style={{ padding: 0, listStyle: 'none' }}>
                {sessions.map((session) => (
                    <li key={session._id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ flex: 1 }}>{session.name}</span>
                        <button onClick={() => openDialog(session)} style={{ marginRight: '8px' }}>Edit</button>
                        <button onClick={() => handleDelete(session._id)}>Delete</button>
                    </li>
                ))}
                {sessions.length === 0 && <p>No sessions found.</p>}
            </ul>

            {showDialog && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '300px' }}>
                        <h3>{editingSession ? 'Edit Session' : 'Add Session'}</h3>
                        <input
                            type="text"
                            value={newSession}
                            onChange={(e) => setNewSession(e.target.value)}
                            placeholder="Enter session name"
                            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowDialog(false)} style={{ marginRight: '8px' }}>Cancel</button>
                            <button onClick={handleSave}>{editingSession ? 'Update' : 'Add'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageSessions;
