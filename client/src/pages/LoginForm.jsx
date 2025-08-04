import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      setMessage('Login successful!');
      console.log(res.data);

      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('userId', res.data.user.id);

      navigate('/home');
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.msg || 'Login failed.');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-6 w-[300px] mx-auto bg-white shadow-md rounded-md mt-12"
    >
      <h2 className="text-xl font-semibold mb-5 text-center">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full h-10 px-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full h-10 px-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full h-10 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>

      {message && (
        <p className="mt-3 text-sm text-red-500 text-center">{message}</p>
      )}

      <p className="mt-4 text-center text-sm">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
