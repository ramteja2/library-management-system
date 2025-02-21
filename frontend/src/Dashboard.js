import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import integrated pages
import IssuedBooksPage from './IssuedBooksPage';
import ReturnedBooksPage from './ReturnedBooksPage';
import AddBooksPage from './AddBooksPage';
import SendEmailsPage from './SendEmailsPage';
import ProfilePage from './ProfilePage';
import SuggestBooksPage from './SuggestBooksPage';
import ManageDashboard from './ManageDashboard';
import BooksPage from './BooksPage'; // Updated BooksPage component

const Dashboard = () => {
  // Retrieve the user role from localStorage; default to "student" if not set.
  const role = localStorage.getItem("user_role") || "student";
  const navigate = useNavigate();

  // Set default active tab based on role.
  const defaultTab = role.toLowerCase() === "librarian" ? "home" : "books";
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Logout: clear localStorage and redirect to landing page.
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
    navigate("/");
  };

  // Define top navigation items for the central nav.
  const topNavItems =
    role.toLowerCase() === "librarian"
      ? [
          { label: "Home", key: "home" },
          { label: "Books", key: "books" },
          { label: "Issued", key: "issued" },
          { label: "Return", key: "return" },
          { label: "Suggesttions", key: "suggesttions" },
          { label: "Notifications", key: "notifications" },
          { label: "Add Books", key: "addBooks" },
          { label: "Send Emails", key: "sendEmails" },
        ]
      : [
          { label: "Books", key: "books" },
          { label: "issued", key: "issued" },
          { label: "return", key: "return" },
          { label: "suggest", key: "suggest" },
          { label: "notifications", key: "notifications" },
        ];

  // Define sidebar items for all roles.
  const sideNavItems =
    role.toLowerCase() === "librarian"
      ? [
          { label: "Home", key: "home" },
          { label: "Books", key: "books" },
          { label: "Issued", key: "issued" },
          { label: "Return", key: "return" },
          { label: "Suggesttions", key: "suggesttions" },
          { label: "Notifications", key: "notifications" },
          { label: "profile", key: "profile" },
          { label: "logout", key: "logout" },
        ]
      : [
          { label: "Books", key: "books" },
          { label: "issued", key: "issued" },
          { label: "return", key: "return" },
          { label: "suggest", key: "suggest" },
          { label: "notifications", key: "notifications" },
          { label: "profile", key: "profile" },
          { label: "logout", key: "logout" },
        ];

  // Sidebar visibility state for hamburger toggle.
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Render main content based on active tab.
  const renderMainContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div style={{ padding: "20px" }}>
            <h2>Librarian Home</h2>
            <p>Welcome to your dashboard home.</p>
          </div>
        );
      case "books":
        return <BooksPage />; // Use the updated BooksPage component here.
      case "issued":
        return <IssuedBooksPage />;
      case "return":
        return <ReturnedBooksPage />;
      case "suggest":
      case "suggesttions":
        return <SuggestBooksPage />;
      case "notifications":
        return (
          <div style={{ padding: "20px" }}>
            <h2>Notifications</h2>
            <p>Notifications data goes here.</p>
          </div>
        );
      case "addBooks":
        return <AddBooksPage />;
      case "sendEmails":
        return <SendEmailsPage />;
      case "profile":
        return <ProfilePage />;
      case "manage":
        return <ManageDashboard />;
      case "logout":
        handleLogout();
        return null;
      default:
        return (
          <div style={{ padding: "20px" }}>
            <h2>Welcome</h2>
            <p>Select an option from the navigation.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <header
        style={{
          background: "#f4f4f4",
          padding: "10px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {role} dashboard
      </header>
      {/* Fixed Top Navigation Bar with Hamburger Icon, Profile Icon and Manage (for librarian) */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#034075",
          color: "#fff",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Hamburger Icon for toggling Sidebar */}
          <button
            onClick={() => setSidebarVisible(!sidebarVisible)}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#fff",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ☰
          </button>
          {topNavItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              style={{
                margin: "0 10px",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {role.toLowerCase() === "librarian" && (
            <button
              onClick={() => setActiveTab("manage")}
              style={{
                marginRight: "20px",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Manage
            </button>
          )}
          {/* Profile Icon in Circle */}
          <button
            onClick={() => setActiveTab("profile")}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #fff",
              }}
            />
          </button>
        </div>
      </nav>
      {/* Fixed Sidebar on the Left */}
      <div style={{ display: "flex", flex: 1 }}>
        {sidebarVisible && (
          <aside style={{ width: "200px", background: "#e0e0e0", padding: "10px" }}>
            {sideNavItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  if (item.key === "logout") {
                    handleLogout();
                  } else {
                    setActiveTab(item.key);
                  }
                }}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: "8px 0",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {item.label}
              </button>
            ))}
          </aside>
        )}
        {/* Main Content Area */}
        <main style={{ flex: 1, padding: "20px" }}>{renderMainContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
