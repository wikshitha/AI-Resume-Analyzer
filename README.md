# 🚀 AI Resume Analyzer (Enterprise Edition)

An AI-powered full-stack web application that analyzes resumes against job descriptions using Google's Gemini AI. The platform provides ATS (Applicant Tracking System) scoring, identifies missing skills, offers personalized improvement suggestions, and visualizes resume analytics through an interactive dashboard.

# ✨ Features

## 🔐 Authentication
- Secure user registration and login
- JWT Authentication
- Password hashing using bcrypt
- Protected API routes
- Persistent user sessions

---

## 📄 Resume Management

- Upload PDF resumes
- Automatic PDF text extraction
- Cloudinary file storage
- Resume history
- Resume deletion
- Resume preview
- Resume metadata storage

---

## 🤖 AI Resume Analysis

Powered by **Google Gemini 2.5 Flash**

Features include:

- ATS Score (0–100)
- Resume vs Job Description comparison
- Missing Skills Detection
- Skill Extraction
- Resume Strengths
- Improvement Suggestions
- Overall Candidate Evaluation

---

## 📊 Analytics Dashboard

Interactive dashboard built using Recharts.

Includes:

- ATS Score Trends
- Resume Analysis History
- Skill Frequency Chart
- Missing Skills Analysis
- Resume Statistics

---

## ⚡ Performance Optimization

- Redis Caching
- Faster AI response retrieval
- Reduced Gemini API calls
- Optimized database queries

---

## 🐳 DevOps

- Docker
- Docker Compose
- Nginx Reverse Proxy
- GitHub Actions CI
- Production Ready Architecture

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- Shadcn/UI
- React Router DOM
- React Hook Form
- Zod
- Axios
- Recharts
- Sonner

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

---

## AI

- Google Gemini 2.5 Flash API

---

## Database

- PostgreSQL
- Prisma ORM

---

## Caching

- Redis

---

## Storage

- Cloudinary

---

## DevOps

- Docker
- Docker Compose
- Nginx
- GitHub Actions

---

# 🏗 System Architecture

```
                    +------------------+
                    |      Client      |
                    |   React + Vite   |
                    +---------+--------+
                              |
                              |
                              ▼
                    +------------------+
                    |      Nginx       |
                    | Reverse Proxy    |
                    +---------+--------+
                              |
                              ▼
                    +------------------+
                    | Express Backend  |
                    +---------+--------+
                              |
          +-------------------+-------------------+
          |                   |                   |
          ▼                   ▼                   ▼
   PostgreSQL             Redis Cache        Gemini AI
      Prisma                                  Analysis
          |
          ▼
     Cloudinary
```

---

# 📁 Project Structure

```
AI-Resume-Analyzer
│
├── frontend
│   ├── src
│   ├── public
│   └── Dockerfile
│
├── backend
│   ├── prisma
│   ├── src│
│   └── Dockerfile
│
├── nginx
│   └── nginx.conf
│
├── .github
│   └── workflows
│
├── docker-compose.yml
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/AI-Resume-Analyzer.git

cd AI-Resume-Analyzer
```

---

## 2. Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=3000

DATABASE_URL=

JWT_SECRET=

GEMINI_API_KEY=

REDIS_URL=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

Run

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 4. Docker

Build containers

```bash
docker compose build
```

Run containers

```bash
docker compose up -d
```

Stop containers

```bash
docker compose down
```

---

# 🔄 CI Pipeline

GitHub Actions automatically performs:

- Install Dependencies
- Generate Prisma Client
- Build Backend
- Build Frontend
- Build Docker Images

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|----------|-----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |

---

## Resume

| Method | Endpoint |
|----------|-----------|
| POST | `/api/resumes/upload` |
| GET | `/api/resumes` |
| GET | `/api/resumes/:id` |
| DELETE | `/api/resumes/:id` |

---

## AI Analysis

| Method | Endpoint |
|----------|-----------|
| POST | `/api/analysis/:resumeId` |

---

## Dashboard

| Method | Endpoint |
|----------|-----------|
| GET | `/api/dashboard` |

---

# 🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Environment Variables
- Secure API Design
- Input Validation using Zod
- Prisma ORM Protection

---

# 📈 Future Improvements

- Resume Versioning
- Multi-language Resume Analysis
- AI Cover Letter Generator
- Resume Templates
- Company-wise ATS Optimization
- Email Notifications
- Interview Preparation Assistant

---

# 👨‍💻 Author

**Wikshitha Umindu**

Bachelor of Computer Science  
Eastern University, Sri Lanka

- GitHub: https://github.com/wikshitha
- LinkedIn: https://www.linkedin.com/in/wikshitha

---

# 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
