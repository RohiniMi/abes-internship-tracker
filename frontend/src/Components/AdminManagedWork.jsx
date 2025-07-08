import React, { useState } from 'react';
import ManageDepartment from './ManageDepartment';
import ManageSections from './ManageSections';
import ManageSessions from './ManageSessions'
import ManageUsers from './ManageUsers';
import ManageCredentials from './ManageCredentials';
const AdminManagedWork = () => {
    const [activeSection, setActiveSection] = useState('');

    const renderSection = () => {
        switch (activeSection) {
            case 'departments':
                return <ManageDepartment />
            case 'sections':
                return <ManageSections />
            case 'sessions':
                return <ManageSessions />
            case 'users':
                return <ManageUsers />
            case 'credentials':
                return <ManageCredentials />
            default:
                return <p>Please select a section from the left.</p>;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div style={{ width: '240px', background: '#f0f0f0', padding: '1rem' }}>
                <h3>Sections</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li
                        onClick={() => setActiveSection('departments')}
                        style={{
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '4px',
                            backgroundColor: activeSection === 'departments' ? '#ddd' : 'transparent'
                        }}
                    >
                        Departments
                    </li>
                    <li
                        onClick={() => setActiveSection('sections')}
                        style={{
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '4px',
                            backgroundColor: activeSection === 'sections' ? '#ddd' : 'transparent'
                        }}
                    >
                        Sections
                    </li>
                    <li
                        onClick={() => setActiveSection('sessions')}
                        style={{
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '4px',
                            backgroundColor: activeSection === 'sessions' ? '#ddd' : 'transparent'
                        }}
                    >
                        Sessions
                    </li>
                    <li
                        onClick={() => setActiveSection('users')}
                        style={{
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '4px',
                            backgroundColor: activeSection === 'users' ? '#ddd' : 'transparent'
                        }}
                    >
                        Users
                    </li>
                    <li
                        onClick={() => setActiveSection('credentials')}
                        style={{
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '4px',
                            backgroundColor: activeSection === 'credentials' ? '#ddd' : 'transparent'
                        }}
                    >
                        Credentails
                    </li>
                </ul>
            </div>


            {/* Content Area */}
            <div style={{ flex: 1, padding: '2rem' }}>
                {renderSection()}
            </div>
        </div>
    );
};

export default AdminManagedWork;
