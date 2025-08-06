import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://community-platform-mbqh.onrender.com/api/posts/",
        { text }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        alert("✅ Post created successfully!");
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Failed to create post");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">📝 Create a New Post</h2>
        <form onSubmit={handlePost}>
          <textarea
            className="w-full border border-gray-300 rounded p-3 mb-4 resize-none"
            rows="5"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
