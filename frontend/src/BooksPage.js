import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BooksPage = () => {
  // Retrieve the user role from localStorage; default to "student" if not set.
  const role = localStorage.getItem("user_role") || "student";

  // State for search query.
  const [searchQuery, setSearchQuery] = useState("");

  // State for filter checkboxes (matching the new table columns)
  const [filters, setFilters] = useState({
    ascending: false,
    descending: false,
    title: false,
    author: false,
    publisher: false,
    published_date: false,
    edition: false,
    quantity: false,
  });

  // State to toggle the visibility of the filter options panel.
  const [showFilters, setShowFilters] = useState(false);

  // State for fetched books data.
  const [books, setBooks] = useState([]);

  // Fetch books from the backend API on mount.
  useEffect(() => {
    axios.get("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/books/")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, []);

  // For demonstration, filter books based on TITLE matching the search query.
  const filteredBooks = books.filter(book =>
    book.TITLE.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Bar Row with "Go" and "Filter" Buttons */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Search by title, author, publisher, etc..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <button style={{
          marginLeft: "10px",
          padding: "8px 16px",
          fontSize: "16px",
          background: "#034075",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          Go
        </button>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          style={{
            marginLeft: "10px",
            padding: "8px 16px",
            fontSize: "16px",
            background: "#ccc",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Filter
        </button>
      </div>

      {/* Filter Options Panel (toggle) */}
      {showFilters && (
        <div style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <label>
              <input type="checkbox" name="ascending" checked={filters.ascending} onChange={(e) => setFilters({ ...filters, ascending: e.target.checked })} /> Ascending
            </label>
            <label>
              <input type="checkbox" name="descending" checked={filters.descending} onChange={(e) => setFilters({ ...filters, descending: e.target.checked })} /> Descending
            </label>
            <label>
              <input type="checkbox" name="title" checked={filters.title} onChange={(e) => setFilters({ ...filters, title: e.target.checked })} /> Title
            </label>
            <label>
              <input type="checkbox" name="author" checked={filters.author} onChange={(e) => setFilters({ ...filters, author: e.target.checked })} /> Author
            </label>
            <label>
              <input type="checkbox" name="publisher" checked={filters.publisher} onChange={(e) => setFilters({ ...filters, publisher: e.target.checked })} /> Publisher
            </label>
            <label>
              <input type="checkbox" name="published_date" checked={filters.published_date} onChange={(e) => setFilters({ ...filters, published_date: e.target.checked })} /> Published Date
            </label>
            <label>
              <input type="checkbox" name="edition" checked={filters.edition} onChange={(e) => setFilters({ ...filters, edition: e.target.checked })} /> Edition
            </label>
            <label>
              <input type="checkbox" name="quantity" checked={filters.quantity} onChange={(e) => setFilters({ ...filters, quantity: e.target.checked })} /> Quantity
            </label>
            <button style={{
              padding: "8px 16px",
              background: "#034075",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Apply Changes
            </button>
            <button onClick={() => {
              setSearchQuery("");
              setFilters({
                ascending: false,
                descending: false,
                title: false,
                author: false,
                publisher: false,
                published_date: false,
                edition: false,
                quantity: false,
              });
            }} style={{
              padding: "8px 16px",
              background: "#ccc",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Books Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
        <thead style={{ background: "#034075", color: "#fff" }}>
          <tr>
            <th style={{ padding: "8px" }}>S_NO.</th>
            <th style={{ padding: "8px" }}>TITLE</th>
            <th style={{ padding: "8px" }}>AUTHOR</th>
            <th style={{ padding: "8px" }}>PUBLISHER</th>
            <th style={{ padding: "8px" }}>PUBLISHED_DATE</th>
            <th style={{ padding: "8px" }}>EDITION</th>
            <th style={{ padding: "8px" }}>QUANTITY</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <tr key={book.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px", textAlign: "center" }}>{index + 1}</td>
                <td style={{ padding: "8px" }}>{book.TITLE}</td>
                <td style={{ padding: "8px" }}>{book.AUTHOR}</td>
                <td style={{ padding: "8px" }}>{book.PUBLISHER}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>{book.PUBLISHED_DATE}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>{book.EDITION}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>{book.QUANTITY}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: "8px", textAlign: "center" }}>
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksPage;
