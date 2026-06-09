# Course API

A full-stack application for managing courses and lessons, featuring a NestJS backend with Prisma and a React frontend.

## 🚀 Overview

The Course API allows users to browse a catalog of courses, view detailed lesson information, and track their learning progress. It demonstrates a modern full-stack architecture using a layered backend and a component-based frontend.

### Key Features
- **Course Catalog:** Browse all available courses.
- **Detailed Lessons:** View lesson descriptions and details within each course.
- **Progress Tracking:** Mark lessons as completed and visualize overall course progress.
- **Automated Calculations:** Backend logic for calculating completion percentages.
- **Robust Persistence:** PostgreSQL database managed with Prisma ORM.

## 🛠 Tech Stack

- **Frontend:** React, React Router, Hooks, Vanilla CSS.
- **Backend:** NestJS (TypeScript), Prisma v6.9.0.
- **Database:** PostgreSQL 17.
- **Infrastructure:** Docker, Docker Compose.

## 🚦 Getting Started

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- (Optional) [Node.js](https://nodejs.org/) (v18+) and npm

### Running with Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Course-api
   ```

2. **Start the application:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:4000](http://localhost:4000)

### Running Locally (Development)

If you prefer to run the services manually:

#### 1. Database
Start a PostgreSQL instance and ensure you have a database named `course_db`.

#### 2. Backend
```bash
cd backend
npm install
# Create a .env file with your DATABASE_URL
# e.g., DATABASE_URL="postgresql://postgres:password@localhost:5432/course_db"
npx prisma migrate dev
npm run start:dev
```

#### 3. Frontend
```bash
cd frontend
npm install
npm start
```

## 🔌 API Endpoints

### Courses
- `GET /courses` - List all courses
- `POST /courses` - Create a new course
- `GET /courses/:id` - Get course details
- `PATCH /courses/:id` - Update a course
- `DELETE /courses/:id` - Delete a course

### Lessons
- `GET /courses/:courseId/lessons` - List lessons for a course
- `POST /courses/:courseId/lessons` - Add a lesson to a course
- `PATCH /courses/:courseId/lessons/:id` - Update a lesson
- `DELETE /courses/:courseId/lessons/:id` - Remove a lesson
- `GET /courses/:courseId/lessons/progress` - Get course completion percentage

## 🏗 Project Structure

```text
├── backend/            # NestJS API
│   ├── prisma/         # Database schema & migrations
│   └── src/            # Application logic (modules, services, controllers)
├── frontend/           # React application
│   ├── src/components/ # Reusable UI components
│   ├── src/hooks/      # Custom hooks for data fetching
│   └── src/pages/      # Page-level components
└── docker-compose.yml  # Container orchestration
```
