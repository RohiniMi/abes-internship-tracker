import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:7890/admin/manage-departments';

const ManageDepartment = () => {
    const [departments, setDepartments] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [newDept, setNewDept] = useState('');
    const [editingDept, setEditingDept] = useState(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const res = await axios.get(API_URL);
            setDepartments(res.data);
        } catch (error) {
            console.error(error);
            alert('Error fetching departments');
        }
    };

    const openDialog = (dept = null) => {
        setEditingDept(dept);
        setNewDept(dept?.name || '');
        setShowDialog(true);
    };

    const handleSave = async () => {
        if (!newDept.trim()) return;

        try {
            if (editingDept) {
                await axios.put(`${API_URL}/${editingDept._id}`, { name: newDept.trim() });
            } else {
                await axios.post(API_URL, { name: newDept.trim() });
            }
            fetchDepartments();
            setShowDialog(false);
        } catch (error) {
            console.error(error);
            alert('Error saving department');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this department?')) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchDepartments();
        } catch (error) {
            console.error(error);
            alert('Error deleting department');
        }
    };

    return (
        <div>
            <h2>Manage Departments</h2>
            <button onClick={() => openDialog()} style={{ margin: '10px 0', padding: '6px 12px' }}>
                Add Department
            </button>

            <ul style={{ padding: 0, listStyle: 'none' }}>
                {departments.map((dept) => (
                    <li key={dept._id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ flex: 1 }}>{dept.name}</span>
                        <button onClick={() => openDialog(dept)} style={{ marginRight: '8px' }}>Edit</button>
                        <button onClick={() => handleDelete(dept._id)}>Delete</button>
                    </li>
                ))}
                {departments.length === 0 && <p>No departments found.</p>}
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
                        <h3>{editingDept ? 'Edit Department' : 'Add Department'}</h3>
                        <input
                            type="text"
                            value={newDept}
                            onChange={(e) => setNewDept(e.target.value)}
                            placeholder="Enter department name"
                            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowDialog(false)} style={{ marginRight: '8px' }}>Cancel</button>
                            <button onClick={handleSave}>{editingDept ? 'Update' : 'Add'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageDepartment;
