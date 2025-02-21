// src/LandingPage.js
import React from 'react';
import './App.css';

const LandingPage = () => {
  const handleLoginClick = (role) => {
    // Directly navigate to the login page for that role.
    window.location.href = `/login/${role}`;
  };

  return (
    <div className="LandingPage">
      <header className="App-header">
        <h1>Library Management System</h1>
        <p>Please select your login type:</p>
      </header>

      <section className="hero-section">
        <div className="logo-container">
          <a href="https://idealtech.edu.in/" target="_blank" rel="noopener noreferrer">
            <img src="https://sis.idealtech.edu.in/Logo.png" alt="Logo" style={{ width: '350px' }} />
          </a>
        </div>

        <div className="card-grid">
          {/* Student Login Card */}
          <div className="card" onClick={() => handleLoginClick('student')}>
            <div
              className="card__background"
              style={{
                backgroundImage: "url('https://sis.idealtech.edu.in/student.png')",
              }}
            ></div>
            <div className="card__content">
              <h3 className="card__heading">Student Login</h3>
            </div>
          </div>

          {/* Faculty Login Card */}
          <div className="card" onClick={() => handleLoginClick('faculty')}>
            <div
              className="card__background"
              style={{
                backgroundImage: "url('https://sis.idealtech.edu.in/faculty.png')",
              }}
            ></div>
            <div className="card__content">
              <h3 className="card__heading">Faculty Login</h3>
            </div>
          </div>

          {/* Librarian Login Card */}
          <div className="card" onClick={() => handleLoginClick('librarian')}>
            <div
              className="card__background"
              style={{
                backgroundImage: "url('https://sis.idealtech.edu.in/admin.png')",
              }}
            ></div>
            <div className="card__content">
              <h3 className="card__heading">Librarian Login</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
