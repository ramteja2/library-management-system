import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  // Active section: "students" or "faculty"
  const [activeSection, setActiveSection] = useState('students');
  const [message, setMessage] = useState('');

  // ----- States for Students -----
  const [students, setStudents] = useState([]);
  const [studentForm, setStudentForm] = useState({
    name: '',
    branch: '',
    studentId: '',
    email: '',
    status: 'active'
  });
  const [studentFile, setStudentFile] = useState(null);

  // ----- States for Faculty -----
  const [faculty, setFaculty] = useState([]);
  const [facultyForm, setFacultyForm] = useState({
    name: '',
    branch: '',
    facultyId: '',
    email: '',
    status: 'active'
  });
  const [facultyFile, setFacultyFile] = useState(null);

  // ----- Fetch Data Functions -----
  const fetchStudents = () => {
    axios.get("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/students/")
      .then(res => setStudents(res.data))
      .catch(err => console.error("Error fetching students:", err));
  };

  const fetchFaculty = () => {
    axios.get("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/faculty/")
      .then(res => setFaculty(res.data))
      .catch(err => console.error("Error fetching faculty:", err));
  };

  useEffect(() => {
    fetchStudents();
    fetchFaculty();
  }, []);

  // ----- Handlers for Students -----
  const handleStudentFormChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    axios.post("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/students/", studentForm)
      .then(() => {
        setMessage("Student added successfully.");
        setStudentForm({ name: '', branch: '', studentId: '', email: '', status: 'active' });
        fetchStudents();
      })
      .catch(err => {
        console.error("Error adding student:", err);
        setMessage("Failed to add student.");
      });
  };

  const handleStudentFileChange = (e) => {
    setStudentFile(e.target.files[0]);
  };

  const handleStudentFileUpload = () => {
    if (!studentFile) {
      setMessage("Please select a file for students.");
      return;
    }
    const formData = new FormData();
    formData.append("file", studentFile);
    axios.post("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/upload-students/", formData)
      .then(() => {
        setMessage("Students file uploaded successfully.");
        fetchStudents();
      })
      .catch(err => {
        console.error("Error uploading student file:", err);
        setMessage("Student file upload failed.");
      });
  };

  // ----- Handlers for Faculty -----
  const handleFacultyFormChange = (e) => {
    const { name, value } = e.target;
    setFacultyForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFacultySubmit = (e) => {
    e.preventDefault();
    axios.post("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/faculty/", facultyForm)
      .then(() => {
        setMessage("Faculty added successfully.");
        setFacultyForm({ name: '', branch: '', facultyId: '', email: '', status: 'active' });
        fetchFaculty();
      })
      .catch(err => {
        console.error("Error adding faculty:", err);
        setMessage("Failed to add faculty.");
      });
  };

  const handleFacultyFileChange = (e) => {
    setFacultyFile(e.target.files[0]);
  };

  const handleFacultyFileUpload = () => {
    if (!facultyFile) {
      setMessage("Please select a file for faculty.");
      return;
    }
    const formData = new FormData();
    formData.append("file", facultyFile);
    axios.post("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/upload-faculty/", formData)
      .then(() => {
        setMessage("Faculty file uploaded successfully.");
        fetchFaculty();
      })
      .catch(err => {
        console.error("Error uploading faculty file:", err);
        setMessage("Faculty file upload failed.");
      });
  };

  // ----- Render Students Section -----
  const renderStudentsSection = () => (
    <div style={{ padding: '20px' }}>
      <h2>Manage Students</h2>
      {message && <p>{message}</p>}
      
      {/* Manual Entry for Student */}
      <h3>Add Student (Manual Entry)</h3>
      <form onSubmit={handleStudentSubmit} style={{ marginBottom: '20px', maxWidth: '500px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter student name"
            value={studentForm.name}
            onChange={handleStudentFormChange}
            style={{ padding: '8px', width: '100%' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Branch:</label>
          <input
            type="text"
            name="branch"
            placeholder="Enter branch"
            value={studentForm.branch}
            onChange={handleStudentFormChange}
            style={{ padding: '8px', width: '100%' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Student ID:</label>
          <input
            type="text"
            name="studentId"
            placeholder="Enter student ID"
            value={studentForm.studentId}
            onChange={handleStudentFormChange}
            style={{ padding: '8px', width: '100%' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={studentForm.email}
            onChange={handleStudentFormChange}
            style={{ padding: '8px', width: '100%' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px', background: '#034075', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Student
        </button>
      </form>
      
      {/* File Upload for Students */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
        <h3>Add Students (File Upload)</h3>
        <input type="file" onChange={handleStudentFileChange} accept=".csv, .xlsx" />
        <button onClick={handleStudentFileUpload} style={{ marginLeft: '10px', padding: '8px 16px', background: '#034075', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Upload
        </button>
      </div>
      
      {/* Students List */}
      <h3>Students List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
        <thead style={{ background: '#034075', color: '#fff' }}>
          <tr>
            <th style={{ padding: '8px' }}>Name</th>
            <th style={{ padding: '8px' }}>Branch</th>
            <th style={{ padding: '8px' }}>Student ID</th>
            <th style={{ padding: '8px' }}>Email</th>
            <th style={{ padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {students && students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '8px' }}>{student.name}</td>
                <td style={{ padding: '8px' }}>{student.branch}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.studentId}</td>
                <td style={{ padding: '8px' }}>{student.email}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: '8px', textAlign: 'center' }}>No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  // ----- Render Faculty Section -----
  const renderFacultySection = () => (
    <div style={{ padding: '20px' }}>
      <h2>Manage Faculty</h2>
      {message && <p>{message}</p>}
      
      {/* Manual Entry for Faculty */}
      <h3>Add Faculty (Manual Entry)</h3>
      <form onSubmit={handleFacultySubmit} style={{ marginBottom: '20px', maxWidth: '500px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter faculty name"
            value={facultyForm.name}
            onChange={handleFacultyFormChange}
            style={{ padding: '8px', width: '100%' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Branch:</label>
          <input
            type="text"
            name="branch"
            placeholder="Enter branch"
            value={facultyForm.branch}
            onChange={handleFacultyFormChange}
            style={{ padding: '8px', width: '100%' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Faculty ID:</label>
          <input
            type="text"
            name="facultyId"
            placeholder="Enter faculty ID"
            value={facultyForm.facultyId}
            onChange={handleFacultyFormChange}
            style={{ padding: '8px', width: '100%' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={facultyForm.email}
            onChange={handleFacultyFormChange}
            style={{ padding: '8px', width: '100%' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px', background: '#034075', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Faculty
        </button>
      </form>
      
      {/* File Upload for Faculty */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
        <h3>Add Faculty (File Upload)</h3>
        <input type="file" onChange={handleFacultyFileChange} accept=".csv, .xlsx" />
        <button onClick={handleFacultyFileUpload} style={{ marginLeft: '10px', padding: '8px 16px', background: '#034075', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Upload
        </button>
      </div>
      
      {/* Faculty List */}
      <h3>Faculty List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
        <thead style={{ background: '#034075', color: '#fff' }}>
          <tr>
            <th style={{ padding: '8px' }}>Name</th>
            <th style={{ padding: '8px' }}>Branch</th>
            <th style={{ padding: '8px' }}>Faculty ID</th>
            <th style={{ padding: '8px' }}>Email</th>
            <th style={{ padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {faculty && faculty.length > 0 ? (
            faculty.map((fac) => (
              <tr key={fac.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '8px' }}>{fac.name}</td>
                <td style={{ padding: '8px' }}>{fac.branch}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{fac.facultyId}</td>
                <td style={{ padding: '8px' }}>{fac.email}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{fac.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: '8px', textAlign: 'center' }}>No faculty found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Users</h1>
      {message && <p>{message}</p>}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveSection('students')}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            background: activeSection === 'students' ? '#034075' : '#ccc',
            color: activeSection === 'students' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Students
        </button>
        <button
          onClick={() => setActiveSection('faculty')}
          style={{
            padding: '10px 20px',
            background: activeSection === 'faculty' ? '#034075' : '#ccc',
            color: activeSection === 'faculty' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Faculty
        </button>
      </div>
      {activeSection === 'students' ? renderStudentsSection() : renderFacultySection()}
    </div>
  );
};

export default ManageUsers;
