🌐 Mini LinkedIn-like Community Platform
A minimal social platform where users can register, log in, create posts, view their profile and interact in a public feed — built with a modern full-stack approach using React, Flask, and PostgreSQL.

🔗 Live Demo
Frontend: https://community-platform-frontend-6hcu.onrender.com
Backend: https://community-platform-backend.onrender.com

📂 GitHub Repositories
Frontend: github.com/yourusername/community-platform-frontend

Backend: github.com/yourusername/community-platform-backend

(Replace the above URLs with your actual GitHub repo links.)

🛠️ Stack Used
Frontend

React.js

Tailwind CSS

Axios

JWT (for authentication)

Backend

Python Flask

Flask-JWT-Extended

PostgreSQL (via SQLAlchemy)

Flask-Migrate

Flask-Bcrypt

CORS for cross-origin support

Deployment

Render (Frontend & Backend)

⚙️ Setup Instructions
📦 Backend Setup (Flask + PostgreSQL)

# Clone the repo
git clone https://github.com/yourusername/community-platform-backend
cd community-platform-backend

# Create virtual environment and activate
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL=your_postgres_url
export JWT_SECRET_KEY=your_secret_key
export FLASK_APP=app.py

# Initialize DB
flask db init
flask db migrate
flask db upgrade

# Run the server
flask run

👤 Demo User Credentials
| Role | Email                                       | Password    |
| ---- | ------------------------------------------- | ----------- |
| Demo | [demo@example.com](mailto:demo@example.com) | password123 |

✨ Features
🔐 Secure user registration and login (JWT-based)

📝 Create, read, and view public posts

👤 View profile and user-specific posts

🌐 Responsive UI with Tailwind CSS

☁️ Full-stack deployment on Render