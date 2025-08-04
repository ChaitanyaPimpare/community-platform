// src/api.js
import axios from "axios";

const BASE_URL = "https://community-platform-mbqh.onrender.com"; // Your backend Render URL

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if you're using cookies or tokens
});

export default api;
