# 🌐 Mini LinkedIn-like Community Platform

A minimal social platform where users can register, log in, create posts, view profiles, and interact in a public feed — built with a modern full-stack approach using **React, Flask, and PostgreSQL**.

---

## 🔗 Live Demo

- **Frontend:** [https://community-platform-frontend-6hcu.onrender.com](https://community-platform-frontend-6hcu.onrender.com)  
- **Backend:** [https://community-platform-mbqh.onrender.com](https://community-platform-mbqh.onrender.com)

---

## 📂 GitHub Repositories

- **Frontend:** [`/client`](https://github.com/ChaitanyaPimpare/community-platform/client)  
- **Backend:** [`/server`](https://github.com/ChaitanyaPimpare/community-platform/server)

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Axios  
- JWT Authentication

### Backend
- Python Flask  
- Flask-JWT-Extended  
- PostgreSQL (SQLAlchemy ORM)  
- Flask-Migrate  
- Flask-Bcrypt  
- Flask-CORS  

### Deployment
- Render (Frontend & Backend)

---

## ⚙️ Backend Setup (Flask + PostgreSQL)

### 🔁 Clone the Repository

```bash
git clone https://github.com/ChaitanyaPimpare/community-platform
cd community-platform/server
```

### 🧪 Create and Activate Virtual Environment

```bash
python -m venv venv

# For macOS/Linux
source venv/bin/activate

# For Windows
venv\Scripts\activate
```

### 📦 Install Dependencies

```bash
pip install -r requirements.txt
```

### 🔐 Set Environment Variables

> You can create a `.env` file or run these in your terminal:

```bash
export DATABASE_URL=your_postgres_url
export JWT_SECRET_KEY=your_secret_key
export FLASK_APP=app.py
```

### 🗃️ Initialize the Database

```bash
flask db init
flask db migrate
flask db upgrade
```

### ▶️ Run the Server

```bash
flask run
```

---

## 👤 Demo User Credentials

| Role | Email                | Password    |
|------|----------------------|-------------|
| Demo | demo@example.com     | password123 |

---

## ✨ Features

- 🔐 Secure user registration and login using JWT  
- 📝 Create, view, and list public posts  
- 👤 View your own or others’ profiles  
- 📱 Responsive UI using Tailwind CSS  
- ☁️ Deployed frontend and backend on Render
