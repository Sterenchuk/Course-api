import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { useLessons } from '../hooks/useLessons';

function CourseCard({ course, onDelete }) {
  const { lessons, progress } = useLessons(course.id);
  const completed = lessons.filter((l) => l.isCompleted).length;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to={`/courses/${course.id}`} className="card-link" style={{ flex: 1 }}>
        <div className="card-title">{course.title}</div>
        {course.description && (
          <div className="card-description">{course.description}</div>
        )}
      </Link>

      <div className="progress-wrap">
        <div className="progress-label">
          <span className="progress-label-text">
            {completed} / {lessons.length} lessons
          </span>
          <span className="progress-pct">{progress}%</span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-bar${progress === 100 ? ' complete' : ''}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <span className="card-meta">
          {new Date(course.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <button
          className="btn btn-danger"
          onClick={(e) => { e.preventDefault(); onDelete(course.id); }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const { courses, loading, error, addCourse, removeCourse } = useCourses();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setFormError('Course title is required.'); return; }
    setSubmitting(true);
    setFormError('');
    try {
      await addCourse({ title: title.trim(), description: desc.trim() || undefined });
      setTitle('');
      setDesc('');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">My <span>Courses</span></h1>
        <p className="page-subtitle">Track your learning journey across all courses.</p>
      </div>

      <div className="form-card">
        <div className="form-title">New Course</div>
        {formError && <div className="error-msg">{formError}</div>}
        <form onSubmit={handleCreate}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                type="text"
                placeholder="e.g. Introduction to TypeScript"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="desc">Description</label>
              <input
                id="desc"
                type="text"
                placeholder="Optional short description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? '...' : '+ Add'}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="state-container">
          <div className="spinner" />
          <p className="state-text">Loading courses…</p>
        </div>
      )}

      {error && <div className="error-msg">Failed to load: {error}</div>}

      {!loading && !error && courses.length === 0 && (
        <div className="empty-cta">
          <div className="empty-cta-title">No courses yet</div>
          <p className="empty-cta-text">Create your first course above to start tracking progress.</p>
        </div>
      )}

      {!loading && courses.length > 0 && (
        <div className="courses-grid">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} onDelete={removeCourse} />
          ))}
        </div>
      )}
    </>
  );
}
