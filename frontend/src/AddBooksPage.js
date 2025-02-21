import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBooksPage = () => {
  // State for file upload
  const [file, setFile] = useState(null);

  // State for manual entry form with new fields
  const [manualData, setManualData] = useState({
    DATE: "",
    ACC_NUM: "",
    CALL_NUM: "",
    TITLE: "",
    AUTHOR: "",
    SOURCE: "",
    INV_NUM: "",
    INV_DATE: "",
    AMOUNT: "",
    PUBLISHER: "",
    YEAR_PUB: "",
    PAGES: "",
    BOOK_SIZE: "",
    EDITION: "",
    COST: "",
    REMARKS: ""
  });

  // State for list of books (fetched from backend)
  const [books, setBooks] = useState([]);
  // State for any messages (success/error)
  const [message, setMessage] = useState("");

  // Function to fetch the list of books from backend API using /api/books/
  const fetchBooks = () => {
    axios.get("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/books/")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err.response ? err.response.data : err);
      });
  };

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handler for file input changes
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handler for manual form input changes
  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setManualData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handler to upload file (using the /api/upload-books/ endpoint)
  const handleFileUpload = () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    axios.post("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/upload-books/", formData)
      .then((res) => {
        setMessage("File uploaded successfully.");
        // Refresh books list after upload from /api/books/
        return axios.get("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/books/");
      })
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error uploading file:", err.response ? err.response.data : err);
        setMessage("File upload failed: " + (err.response ? JSON.stringify(err.response.data) : err.message));
      });
  };

  // Handler for manual form submission (using the /api/books/ endpoint)
  const handleManualSubmit = (e) => {
    e.preventDefault();
    axios.post("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/books/", manualData)
      .then((res) => {
        setMessage("Book added successfully.");
        // Reset the form fields
        setManualData({
          DATE: "",
          ACC_NUM: "",
          CALL_NUM: "",
          TITLE: "",
          AUTHOR: "",
          SOURCE: "",
          INV_NUM: "",
          INV_DATE: "",
          AMOUNT: "",
          PUBLISHER: "",
          YEAR_PUB: "",
          PAGES: "",
          BOOK_SIZE: "",
          EDITION: "",
          COST: "",
          REMARKS: ""
        });
        // Refresh the books list after adding
        return axios.get("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/books/");
      })
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error adding book manually:", err.response ? err.response.data : err);
        setMessage("Manual book entry failed: " + (err.response ? JSON.stringify(err.response.data) : err.message));
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Books</h2>
      {message && <p style={{ marginBottom: "10px" }}>{message}</p>}

      {/* File Upload Section */}
      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>
        <h3>Add File</h3>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
        <button
          onClick={handleFileUpload}
          style={{ marginLeft: "10px", padding: "8px 16px", background: "#034075", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Upload
        </button>
      </div>

      {/* Manual Entry Section */}
      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>
        <h3>Manual Entry</h3>
        <form onSubmit={handleManualSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {Object.keys(manualData).map((key) => (
            <div key={key}>
              <label>{key}: </label>
              <input
                type="text"
                name={key}
                placeholder={`Enter ${key}`}
                value={manualData[key]}
                onChange={handleManualChange}
                style={{ padding: "8px", width: "100%", fontSize: "16px" }}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            style={{ padding: "8px 16px", background: "#034075", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Add Book
          </button>
        </form>
      </div>

      {/* Books List Table */}
      <div>
        <h3>Books List</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
          <thead style={{ background: "#034075", color: "#fff" }}>
            <tr>
              <th style={{ padding: "8px" }}>DATE</th>
              <th style={{ padding: "8px" }}>ACC_NUM</th>
              <th style={{ padding: "8px" }}>CALL_NUM</th>
              <th style={{ padding: "8px" }}>TITLE</th>
              <th style={{ padding: "8px" }}>AUTHOR</th>
              <th style={{ padding: "8px" }}>SOURCE</th>
              <th style={{ padding: "8px" }}>INV_NUM</th>
              <th style={{ padding: "8px" }}>INV_DATE</th>
              <th style={{ padding: "8px" }}>AMOUNT</th>
              <th style={{ padding: "8px" }}>PUBLISHER</th>
              <th style={{ padding: "8px" }}>YEAR_PUB</th>
              <th style={{ padding: "8px" }}>PAGES</th>
              <th style={{ padding: "8px" }}>BOOK_SIZE</th>
              <th style={{ padding: "8px" }}>EDITION</th>
              <th style={{ padding: "8px" }}>COST</th>
              <th style={{ padding: "8px" }}>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            {books && books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={{ padding: "8px" }}>{book.DATE}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{book.ACC_NUM}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{book.CALL_NUM}</td>
                  <td style={{ padding: "8px" }}>{book.TITLE}</td>
                  <td style={{ padding: "8px" }}>{book.AUTHOR}</td>
                  <td style={{ padding: "8px" }}>{book.SOURCE}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{book.INV_NUM}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{book.INV_DATE}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{book.AMOUNT}</td>
                  <td style={{ padding: "8px" }}>{book.PUBLISHER}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{book.YEAR_PUB}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{book.PAGES}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{book.BOOK_SIZE}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{book.EDITION}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{book.COST}</td>
                  <td style={{ padding: "8px" }}>{book.REMARKS}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" style={{ padding: "8px", textAlign: "center" }}>
                  No books added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddBooksPage;
