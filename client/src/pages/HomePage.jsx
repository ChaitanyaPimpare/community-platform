import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get("https://community-platform-mbqh.onrender.com/api/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
    .then((res) => {
      if (Array.isArray(res.data)) {
        setPosts(res.data);
      } else if (Array.isArray(res.data.posts)) {
        setPosts(res.data.posts);
      } else {
        setPosts([]);
      }
    })
    .catch((err) => {
      console.error("❌ Error fetching posts:", err);
      setPosts([]);
    });
}, []);


  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          📢 Public Feed
        </h1>

        {Array.isArray(posts) && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <p className="text-gray-800 text-base sm:text-lg mb-3 leading-relaxed">
                  {post.text}
                </p>
                <div className="text-sm text-gray-500 flex flex-col sm:flex-row justify-between sm:items-center">
                  <div className="flex items-center gap-1">
                    👤 <span className="font-medium">{post.author.name}</span>
                  </div>
                  <div>🕒 {new Date(post.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No posts available.</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
