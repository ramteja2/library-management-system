import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendEmailsPage = () => {
  const [data, setData] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    axios
      .get("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/send-emails/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching email data:", err);
      });
  }, []);

  const selectAll = () => {
    setData(data.map(item => ({ ...item, selected: true })));
    setAllSelected(true);
  };

  const unselectAll = () => {
    setData(data.map(item => ({ ...item, selected: false })));
    setAllSelected(false);
  };

  const toggleSelect = (id) => {
    setData(data.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const sendEmails = () => {
    const selectedEmails = data.filter(item => item.selected).map(item => item.studentMail);
    if (selectedEmails.length === 0) {
      alert("No students selected for email.");
      return;
    }
    axios.post("https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev/api/send-email-action/", { emails: selectedEmails })
      .then(() => alert("Emails sent successfully!"))
      .catch(err => console.error("Error sending emails:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Send Emails</h2>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={selectAll} style={buttonStyle}>Select All</button>
        <button onClick={unselectAll} style={buttonStyle}>Unselect All</button>
        <button onClick={sendEmails} style={sendButtonStyle}>Send Emails</button>
      </div>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Student Mail</th>
            <th>Book Name</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.studentName}</td>
                <td>{item.studentId}</td>
                <td>{item.studentMail}</td>
                <td>{item.bookName}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!item.selected}
                    onChange={() => toggleSelect(item.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const buttonStyle = {
  marginRight: "10px",
  padding: "8px 16px",
  background: "#034075",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const sendButtonStyle = {
  ...buttonStyle,
  background: "#28a745"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  border: "1px solid #ccc"
};

const theadStyle = {
  background: "#034075",
  color: "#fff"
};

export default SendEmailsPage;
