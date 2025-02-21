import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    type: '',
    total_quantity: '',
    available_quantity: '',
    isbn: '',
    about: ''
  });
  const [message, setMessage] = useState('');

  // Fetch the list of books from your backend API.
  const fetchBooks = () => {
    axios
      .get("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/books/")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle changes in the form fields.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // When editing, set the form data to the selected book's details.
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      name: book.name,
      department: book.department,
      type: book.type,
      total_quantity: book.total_quantity,
      available_quantity: book.available_quantity,
      isbn: book.isbn || '',
      about: book.about || ''
    });
  };

  // Handle the form submission for add or update.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBook) {
      // Update existing book.
      axios
        .put(`https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/books/${editingBook.id}/`, formData)
        .then((res) => {
          setMessage("Book updated successfully.");
          setEditingBook(null);
          setFormData({ name: '', department: '', type: '', total_quantity: '', available_quantity: '', isbn: '', about: '' });
          fetchBooks();
        })
        .catch((err) => {
          console.error("Error updating book:", err);
          setMessage("Failed to update book.");
        });
    } else {
      // Add new book.
      axios
        .post("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/books/", formData)
        .then((res) => {
          setMessage("Book added successfully.");
          setFormData({ name: '', department: '', type: '', total_quantity: '', available_quantity: '', isbn: '', about: '' });
          fetchBooks();
        })
        .catch((err) => {
          console.error("Error adding book:", err);
          setMessage("Failed to add book.");
        });
    }
  };

  // Handle deletion of a book.
  const handleDelete = (id) => {
    axios
      .delete(`https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/books/${id}/`)
      .then((res) => {
        setMessage("Book deleted successfully.");
        fetchBooks();
      })
      .catch((err) => {
        console.error("Error deleting book:", err);
        setMessage("Failed to delete book.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Books</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", maxWidth: "500px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter book name"
            value={formData.name}
            onChange={handleChange}
            style={{ padding: "8px", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            placeholder="Enter department"
            value={formData.department}
            onChange={handleChange}
            style={{ padding: "8px", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            placeholder="Enter book type (online/offline)"
            value={formData.type}
            onChange={handleChange}
            style={{ padding: "8px", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Total Quantity:</label>
          <input
            type="number"
            name="total_quantity"
            placeholder="Enter total quantity"
            value={formData.total_quantity}
            onChange={handleChange}
            style={{ padding: "8px", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Available Quantity:</label>
          <input
            type="number"
            name="available_quantity"
            placeholder="Enter available quantity"
            value={formData.available_quantity}
            onChange={handleChange}
            style={{ padding: "8px", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>ISBN:</label>
          <input
            type="text"
            name="isbn"
            placeholder="Enter ISBN (optional)"
            value={formData.isbn}
            onChange={handleChange}
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>About:</label>
          <input
            type="text"
            name="about"
            placeholder="Enter description (optional)"
            value={formData.about}
            onChange={handleChange}
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "8px 16px", background: "#034075", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          {editingBook ? "Update Book" : "Add Book"}
        </button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
        <thead style={{ background: "#034075", color: "#fff" }}>
          <tr>
            <th style={{ padding: "8px" }}>Name</th>
            <th style={{ padding: "8px" }}>ISBN</th>
            <th style={{ padding: "8px" }}>About</th>
            <th style={{ padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books && books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px" }}>{book.name}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>{book.isbn}</td>
                <td style={{ padding: "8px" }}>{book.about}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  <button onClick={() => handleEdit(book)} style={{ marginRight: "10px", padding: "4px 8px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(book.id)} style={{ padding: "4px 8px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: "8px", textAlign: "center" }}>
                No books added.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;
