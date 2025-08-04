// client/src/components/RegisterForm.jsx
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: ""   // ✅ bio field added here
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful!");
      console.log(res.data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Registration failed.");
    }
  };

  return (
   <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md"
>
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
    Create Your Account
  </h2>

  <input
    name="name"
    placeholder="Name"
    onChange={handleChange}
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />

  <input
    name="email"
    placeholder="Email"
    onChange={handleChange}
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />

  <input
    name="password"
    type="password"
    placeholder="Password"
    onChange={handleChange}
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />

  <textarea
    name="bio"
    placeholder="Write a short bio..."
    onChange={handleChange}
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
    rows="3"
  />

  <button
    type="submit"
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
  >
    Register
  </button>

  <p className="mt-4 text-center text-sm text-gray-600">
    Already have an account?{" "}
    <Link to="/" className="text-indigo-600 hover:underline">
      Login
    </Link>
  </p>
</form>

  );
};

export default RegisterForm;
