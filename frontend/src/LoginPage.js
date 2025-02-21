import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { role } = useParams(); // Extracts the role from the URL
  const navigate = useNavigate();

  // States for form fields and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Update this backend URL if necessary
  const backendUrl = 'https://ominous-broccoli-6xv46jpx6j92xq9-8000.app.github.dev';


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await fetch(`${backendUrl}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        const responseData = await response.json();
        console.log('Full Response:', responseData); // ✅ Log full response once

        if (response.ok) {
            const data = responseData;  // ✅ Use already parsed JSON data
            console.log('Login data received:', data); 

            if (!data.access || !data.refresh) {
                throw new Error('Tokens not found in response.');
            }

            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            localStorage.setItem('user_role', role);

            navigate('/dashboard');
        } else {
            console.error('Error response:', responseData);
            setError(responseData.detail || 'Login failed. Please check your credentials.');
        }
    } catch (err) {
        console.error('Login error:', err);
        setError('An error occurred during login.');
    }
};


  return (
    <section
      className="flex flex-col md:flex-row h-screen items-center"
      style={{ background: 'linear-gradient(to bottom, #0f03ffc9, #ffffff)' }}
    >
      {/* Home button */}
      <a
        href="/"
        style={{
          position: 'absolute',
          left: '30px',
          top: '50px',
          transform: 'translateY(-50%)'
        }}
      >
        <i className="fa fa-home fa-3x" style={{ color: 'black' }}></i>
      </a>

      {/* Left side image (visible on large screens) */}
      <div className="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://sis.idealtech.edu.in/ideal.jpg"
          alt="Ideal Institute"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side login form */}
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
        style={{ background: 'linear-gradient(to bottom, #3c31ffc9, #ffffff)' }}
      >
        <div
          className="w-full h-100"
          style={{
            border: '1px solid #3d3d3d',
            borderRadius: '5px',
            background: '#f4f4f4',
            padding: '20px'
          }}
        >
          {/* Logo */}
          <img
            src="https://sis.idealtech.edu.in/Logo.png"
            alt="Logo"
            className="logo"
            style={{ backgroundColor: '#434343' }}
          />

          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account ({role})
          </h1>

          {error && <div className="text-red-500 my-2">{error}</div>}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.toUpperCase())}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
