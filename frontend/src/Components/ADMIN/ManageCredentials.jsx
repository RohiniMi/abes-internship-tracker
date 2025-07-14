import React, { useState } from 'react';
import ManageSingleUserForm from './ManageSingleUserForm';
import ManageMultipleUserForm from './ManageMultipleUserForm';
import './ManageCredentials.css';

const ManageCredentials = () => {
  const [activeTab, setActiveTab] = useState('single');

  return (
    <div className="credentials-container">
      <div className="tab-header">
        <button
          className={activeTab === 'single' ? 'active-tab' : ''}
          onClick={() => setActiveTab('single')}
        >
          Send to Single User
        </button>
        <button
          className={activeTab === 'multiple' ? 'active-tab' : ''}
          onClick={() => setActiveTab('multiple')}
        >
          Send to Multiple Users
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'single' ? <ManageSingleUserForm /> : <ManageMultipleUserForm />}
      </div>
    </div>
  );
};

export default ManageCredentials;
