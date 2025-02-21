import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReturnedBooksPage = () => {
  const [returnedBooks, setReturnedBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/returned-books/")
      .then((res) => {
        setReturnedBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching returned books:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Returned Books</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
        <thead style={{ background: "#034075", color: "#fff" }}>
          <tr>
            <th style={{ padding: "8px" }}>Name</th>
            <th style={{ padding: "8px" }}>Date of Issued</th>
            <th style={{ padding: "8px" }}>Date of Returned</th>
            <th style={{ padding: "8px" }}>Name of Student</th>
            <th style={{ padding: "8px" }}>Student ID</th>
          </tr>
        </thead>
        <tbody>
          {returnedBooks && returnedBooks.length > 0 ? (
            returnedBooks.map((book) => (
              <tr key={book.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px" }}>{book.name}</td>
                <td style={{ padding: "8px" }}>{book.dateIssued}</td>
                <td style={{ padding: "8px" }}>{book.dateReturned}</td>
                <td style={{ padding: "8px" }}>{book.studentName}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>{book.studentId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: "8px", textAlign: "center" }}>
                No returned books data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnedBooksPage;
