import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import ProfilePage from "./pages/ProfilePage";
import HomePage from './pages/HomePage';
import CreatePost from "./pages/CreatePost";
import './index.css';  // This line must exist in your main JS file

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
