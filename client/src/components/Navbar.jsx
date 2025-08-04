import { Link } from "react-router-dom";

const Navbar = () => {
  const userId = localStorage.getItem("userId");

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/home" className="hover:underline">Home</Link>
        <Link to={`/profile/${userId}`} className="hover:underline">Profile</Link>

        <Link to="/create-post" className="text-indigo-500 hover:text-indigo-700 font-medium">
  + New Post
</Link>

      </div>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;