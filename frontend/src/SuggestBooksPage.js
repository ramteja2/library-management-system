import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuggestBooksPage = () => {
  // Retrieve the user role from localStorage; default to "student" if not set.
  const role = localStorage.getItem("user_role") || "student";

  // For student and faculty, render a suggestion form.
  if (role.toLowerCase() === "student" || role.toLowerCase() === "faculty") {
    const [bookName, setBookName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      // Send a POST request to your suggestion endpoint.
      axios.post(
        "https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/suggestions/",
        { bookName, description }
      )
      .then((res) => {
        setMessage("Suggestion sent successfully!");
        setBookName("");
        setDescription("");
      })
      .catch((err) => {
        console.error("Error sending suggestion:", err);
        setMessage("Failed to send suggestion.");
      });
    };

    return (
      <div style={{ padding: "20px" }}>
        <h2>Suggest a Book</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}>
          <label style={{ marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            placeholder="Enter the book name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            style={{ marginBottom: "10px", padding: "8px", fontSize: "16px" }}
            required
          />
          <label style={{ marginBottom: "5px" }}>Description:</label>
          <textarea
            placeholder="About the book"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: "10px", padding: "8px", fontSize: "16px", minHeight: "80px" }}
            required
          ></textarea>
          <button
            type="submit"
            style={{
              padding: "10px",
              background: "#034075",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Send
          </button>
        </form>
        {message && <p style={{ marginTop: "10px", fontSize: "16px" }}>{message}</p>}
      </div>
    );
  } else if (role.toLowerCase() === "librarian") {
    // For librarian, fetch and display suggestion data in a table.
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
      axios
        .get("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/suggestions/")
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
        });
    }, []);

    return (
      <div style={{ padding: "20px" }}>
        <h2>Book Suggestions</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
          <thead style={{ background: "#034075", color: "#fff" }}>
            <tr>
              <th style={{ padding: "8px" }}>Student Name</th>
              <th style={{ padding: "8px" }}>Branch</th>
              <th style={{ padding: "8px" }}>Book Name</th>
              <th style={{ padding: "8px" }}>About</th>
              <th style={{ padding: "8px" }}>Student ID</th>
            </tr>
          </thead>
          <tbody>
            {suggestions && suggestions.length > 0 ? (
              suggestions.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={{ padding: "8px" }}>{item.studentName}</td>
                  <td style={{ padding: "8px" }}>{item.branch}</td>
                  <td style={{ padding: "8px" }}>{item.bookName}</td>
                  <td style={{ padding: "8px" }}>{item.description}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{item.studentId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: "8px", textAlign: "center" }}>
                  No suggestions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    // Fallback: show nothing.
    return <div style={{ padding: "20px" }}><h2>No content available.</h2></div>;
  }
};

export default SuggestBooksPage;
