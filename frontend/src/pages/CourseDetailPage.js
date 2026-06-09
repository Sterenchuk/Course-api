import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCourse } from '../hooks/useCourses';
import { useLessons } from '../hooks/useLessons';
import ProgressRing from '../components/ProgressRing';
import { deleteCourse } from '../services/api';

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="#FDEB9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { course, loading: courseLoading, error: courseError } = useCourse(id);
  const { lessons, loading: lessonsLoading, error: lessonsError, addLesson, toggleLesson, removeLesson, progress } = useLessons(id);

  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const completed = lessons.filter((l) => l.isCompleted).length;

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!lessonTitle.trim()) { setFormError('Lesson title is required.'); return; }
    setSubmitting(true);
    setFormError('');
    try {
      await addLesson({ title: lessonTitle.trim(), description: lessonDesc.trim() || undefined });
      setLessonTitle('');
      setLessonDesc('');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!window.confirm('Delete this course and all its lessons?')) return;
    setDeleting(true);
    try {
      await deleteCourse(id);
      navigate('/');
    } catch (err) {
      alert('Failed to delete: ' + err.message);
      setDeleting(false);
    }
  };

  if (courseLoading) {
    return (
      <div className="state-container">
        <div className="spinner" />
        <p className="state-text">Loading course…</p>
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="state-container">
        <div className="state-icon">⚠️</div>
        <div className="state-title">Course not found</div>
        <Link to="/" className="btn btn-ghost" style={{ marginTop: 8 }}>Back to courses</Link>
      </div>
    );
  }

  return (
    <>
      <Link to="/" className="back-link">
        ← All Courses
      </Link>

      <div className="progress-hero">
        <ProgressRing percent={progress} size={130} stroke={10} />
        <div className="progress-hero-info">
          <div className="progress-hero-title">{course.title}</div>
          {course.description && (
            <div className="progress-hero-desc">{course.description}</div>
          )}
          <div className="progress-hero-stats">
            <div className="stat">
              <span className="stat-value">{lessons.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-value">{completed}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat">
              <span className="stat-value">{lessons.length - completed}</span>
              <span className="stat-label">Remaining</span>
            </div>
          </div>
        </div>
        <button
          className="btn btn-danger"
          onClick={handleDeleteCourse}
          disabled={deleting}
          style={{ alignSelf: 'flex-start' }}
        >
          {deleting ? '…' : 'Delete Course'}
        </button>
      </div>

      <div className="form-card">
        <div className="form-title">Add Lesson</div>
        {formError && <div className="error-msg">{formError}</div>}
        <form onSubmit={handleAddLesson}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ltitle">Title *</label>
              <input
                id="ltitle"
                type="text"
                placeholder="e.g. Variables and Types"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ldesc">Description</label>
              <input
                id="ldesc"
                type="text"
                placeholder="Optional"
                value={lessonDesc}
                onChange={(e) => setLessonDesc(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? '...' : '+ Add'}
            </button>
          </div>
        </form>
      </div>

      <div className="section-heading">
        Lessons
        <span className="section-count">{lessons.length} total</span>
      </div>

      {lessonsLoading && (
        <div className="state-container" style={{ padding: '40px 0' }}>
          <div className="spinner" />
        </div>
      )}

      {lessonsError && <div className="error-msg">Failed to load lessons: {lessonsError}</div>}

      {!lessonsLoading && lessons.length === 0 && (
        <div className="state-container" style={{ padding: '40px 0' }}>
          <div className="state-icon">📚</div>
          <div className="state-title">No lessons yet</div>
          <p className="state-text">Add your first lesson using the form above.</p>
        </div>
      )}

      <div className="lessons-list">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`lesson-item${lesson.isCompleted ? ' completed' : ''}`}
          >
            <button
              className="lesson-checkbox"
              onClick={() => toggleLesson(lesson)}
              title={lesson.isCompleted ? 'Mark incomplete' : 'Mark complete'}
            >
              <CheckIcon />
            </button>
            <div className="lesson-content">
              <Link to={`/lessons/${lesson.id}`} style={{ display: 'block' }}>
                <div className="lesson-title">{lesson.title}</div>
                {lesson.description && (
                  <div className="lesson-desc">{lesson.description}</div>
                )}
              </Link>
            </div>
            <div className="lesson-actions">
              <button className="btn btn-danger" onClick={() => removeLesson(lesson.id)}>
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
