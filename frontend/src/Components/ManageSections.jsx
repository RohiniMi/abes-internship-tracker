import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:7890/admin/manage-sections';

const ManageSections = () => {
  const [sections, setSections] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newSection, setNewSection] = useState('');
  const [editingSection, setEditingSection] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await axios.get(API_URL);
      setSections(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching sections');
    }
  };

  const openDialog = (section = null) => {
    setEditingSection(section);
    setNewSection(section?.name || '');
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!newSection.trim()) return;

    try {
      if (editingSection) {
        await axios.put(`${API_URL}/${editingSection._id}`, { name: newSection.trim() });
      } else {
        await axios.post(API_URL, { name: newSection.trim() });
      }
      fetchSections();
      setShowDialog(false);
    } catch (error) {
      console.error(error);
      alert('Error saving section');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchSections();
    } catch (error) {
      console.error(error);
      alert('Error deleting section');
    }
  };

  return (
    <div>
      <h2>Manage Sections</h2>
      <button onClick={() => openDialog()} style={{ margin: '10px 0', padding: '6px 12px' }}>
        Add Section
      </button>

      <ul style={{ padding: 0, listStyle: 'none' }}>
        {sections.map((section) => (
          <li key={section._id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1 }}>{section.name}</span>
            <button onClick={() => openDialog(section)} style={{ marginRight: '8px' }}>Edit</button>
            <button onClick={() => handleDelete(section._id)}>Delete</button>
          </li>
        ))}
        {sections.length === 0 && <p>No sections found.</p>}
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
            <h3>{editingSection ? 'Edit Section' : 'Add Section'}</h3>
            <input
              type="text"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              placeholder="Enter section name"
              style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowDialog(false)} style={{ marginRight: '8px' }}>Cancel</button>
              <button onClick={handleSave}>{editingSection ? 'Update' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSections;
