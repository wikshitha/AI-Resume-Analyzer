# 🚀 AI Resume Analyzer (Enterprise Edition)

An intelligent full-stack AI-powered resume analysis platform that evaluates resumes against job descriptions using ATS scoring, AI (Gemini), and advanced analytics.

---

## 🧠 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based secure authentication
- Protected routes

### 📄 Resume Management
- Upload PDF resumes
- Parse resume content
- Store resume history
- View & delete resumes

### 🤖 AI Analysis
- ATS Score generation (0–100)
- Skill extraction
- Missing skills detection
- Improvement suggestions
- Job description matching

### 📊 Dashboard Analytics
- ATS score trends
- Skills frequency chart
- Missing skills analysis
- Resume performance history

---

## 🧰 Tech Stack

### Frontend
- React 19 + Vite
- TypeScript
- Tailwind CSS v4
- Shadcn/UI
- React Hook Form + Zod
- Axios
- Recharts
- Sonner

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT + bcrypt

### AI Layer
- Gemini 2.5 Flash API

### DevOps
- Docker + Docker Compose
- Redis
- Nginx
- GitHub Actions

### PDF Processing
- pdf-parse

---

## 🏗️ Architecture

Frontend (React)
        ↓
Backend API (Express)
        ↓
Auth Layer (JWT)
        ↓
Resume Service (PDF Parsing)
        ↓
AI Engine (Gemini)
        ↓
PostgreSQL (Prisma)
        ↓
Redis Cache
        ↓
Nginx (Production)

