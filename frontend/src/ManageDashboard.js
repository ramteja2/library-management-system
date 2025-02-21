import React, { useState } from 'react';
import ManageUsers from './ManageUsers'; // Ensure this file exists and exports a component
import ManageBooks from './ManageBooks';
const ManageDashboard = () => {
  // Define the tabs for the Manage section.
  const tabs = [
    { key: 'inventory', label: 'Inventory' },
    { key: 'users', label: 'Users' },
    { key: 'requests', label: 'Requests' },
    { key: 'reports', label: 'Reports' },
    { key: 'settings', label: 'Settings' },
  ];

  // Local state to track the active tab.
  const [activeTab, setActiveTab] = useState('inventory');

  // Render the content for each tab.
  const renderTabContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <ManageBooks />;
      case 'users':
        return <ManageUsers />;  // Updated: Render ManageUsers component here
      case 'requests':
        return (
          <div>
            <h2>Issued/Returned Books Overview</h2>
            <p>
              View overdue books, process renewal requests, and handle book requests and suggestions.
            </p>
          </div>
        );
      case 'reports':
        return (
          <div>
            <h2>Reporting and Analytics</h2>
            <p>
              Generate reports on circulation, overdue books, popular books, and view statistics.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2>System Settings</h2>
            <p>
              Configure library settings such as renewal period, fine amounts, and other system options.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Library Operations</h1>
      <div style={{ marginBottom: '20px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              background: activeTab === tab.key ? '#034075' : '#ccc',
              color: activeTab === tab.key ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '4px'
        }}
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ManageDashboard;
