import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  // Initialize the profile state with empty values.
  const [profile, setProfile] = useState({
    name: "",
    branch: "",
    studentId: "",
    email: "",
    profilePic: ""
  });

  // Uncomment the following useEffect to fetch profile data from your API when ready.
  /*
  useEffect(() => {
    axios.get("https://your-backend-url/api/profile/")
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);
  */

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Profile</h2>
      <div style={{ position: "relative", width: "150px", height: "150px", margin: "0 auto" }}>
        {profile.profilePic ? (
          <img
            src={profile.profilePic}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #034075"
            }}
          />
        ) : (
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "2px solid #034075",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#e0e0e0"
            }}
          >
            No Image
          </div>
        )}
        {/* Edit icon overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            background: "#034075",
            color: "#fff",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "2px solid #fff"
          }}
        >
          ✏️
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p><strong>Name:</strong> {profile.name || "N/A"}</p>
        <p><strong>Branch:</strong> {profile.branch || "N/A"}</p>
        <p><strong>Student ID:</strong> {profile.studentId || "N/A"}</p>
        <p><strong>Email:</strong> {profile.email || "N/A"}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
