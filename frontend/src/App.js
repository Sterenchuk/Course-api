import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonDetailPage from './pages/LessonDetailPage';
import './index.css';

function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">
        course<span>track</span>
      </NavLink>
      <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        All Courses
      </NavLink>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Nav />
        <main className="main">
          <Routes>
            <Route path="/" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/lessons/:id" element={<LessonDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
