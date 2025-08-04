import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id || id === "null") {
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  }, [id, navigate]);

  if (!user)
    return (
      <p className="text-center text-gray-500 text-lg mt-20">
        Loading profile...
      </p>
    );

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <div className="bg-gray-300 h-32 relative">
              <div className="absolute -bottom-10 left-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 border-4 border-white" />
              </div>
            </div>
            <div className="pt-16 px-6 pb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                {user.name}'s Profile
              </h1>
              <p className="text-sm text-gray-500 mt-1">Bio</p>
              <p className="text-gray-700 mt-1">{user.bio || "No bio available."}</p>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mt-8 bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              📄 Posts
            </h2>
            {user.posts.length > 0 ? (
              <div className="space-y-6">
                {user.posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow transition"
                  >
                    <p className="text-gray-800 text-base mb-2">{post.text}</p>
                    <p className="text-sm text-gray-500">
                      🕒 {new Date(post.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">No posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
