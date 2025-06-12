# WhatToPlay.Now

A modern web application that helps users discover new video games through a Tinder-like swiping interface with personalized recommendations. Built with a React/TypeScript frontend, ASP.NET 8 backend, Tailwind CSS, and Playwright for end-to-end testing. 

## Features
- Swipe-based game recommendation UI
- Progress bar for onboarding/questions
- Personalized recommendations in a youtube reel with direct buy link
- Responsive design

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** ASP.NET 8 WebAPI with a Clean Architecture project structure
- **Database:** PostgresDB via EFCore
- **Testing:** Playwright
- **DevOps:** Docker, Docker Compose, GitHub Actions

## Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (for frontend and tests)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) (for backend)
- [Docker](https://www.docker.com/) (for full-stack local dev)

### 2. Run with Docker Compose (Recommended)

This will start both frontend and backend, with hot reload for development:

```sh
docker-compose up --build
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:5241

### 3. Run Frontend Manually

```sh
cd frontend
npm install
npm run dev
```
- App runs at http://localhost:5173

### 4. Run Backend Manually

```sh
cd backend/Presentation
dotnet run
```
- API runs at http://localhost:5241

### 5. Run Playwright End-to-End Tests

```sh
cd tests
npm install
npm test
```

## Project Structure
- `frontend/` — React app (Vite, Tailwind CSS)
- `backend/` — ASP.NET 8 WebAPI
- `tests/` — Playwright end-to-end tests
- `docker-compose.yml` — Multi-service dev environment

## Contributing
Pull requests and issues are welcome!

---

