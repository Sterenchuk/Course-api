import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLesson, updateLesson } from '../services/api';
import { useCourse } from '../hooks/useCourses';

export default function LessonDetailPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggling, setToggling] = useState(false);

  const { course } = useCourse(lesson?.courseId);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    getLesson(id)
      .then((data) => {
        setLesson(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Could not load lesson.');
        setLoading(false);
      });
  }, [id]);

  const handleToggle = async () => {
    if (!lesson) return;
    setToggling(true);
    try {
      const updated = await updateLesson(lesson.id, { isCompleted: !lesson.isCompleted });
      setLesson(updated);
    } catch (e) {
      alert('Failed to update: ' + e.message);
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner" />
        <p className="state-text">Loading lesson…</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="state-container">
        <div className="state-icon">⚠️</div>
        <div className="state-title">Lesson not found</div>
        <p className="state-text" style={{ marginTop: 8 }}>{error}</p>
        <Link to="/" className="btn btn-ghost" style={{ marginTop: 16 }}>Back to courses</Link>
      </div>
    );
  }

  return (
    <>
      {lesson.courseId && (
        <Link to={`/courses/${lesson.courseId}`} className="back-link">
          ← {course ? course.title : 'Back to course'}
        </Link>
      )}

      <div className="lesson-detail-card">
        <div className={`lesson-status-badge ${lesson.isCompleted ? 'done' : 'todo'}`}>
          {lesson.isCompleted ? '✓ Completed' : '○ Not completed'}
        </div>

        <h1 className="lesson-detail-title">{lesson.title}</h1>

        {lesson.description ? (
          <p className="lesson-detail-desc">{lesson.description}</p>
        ) : (
          <p className="lesson-detail-desc">No description provided.</p>
        )}

        <div className="lesson-detail-actions">
          <button
            className={`btn ${lesson.isCompleted ? 'btn-ghost' : 'btn-primary'}`}
            onClick={handleToggle}
            disabled={toggling}
          >
            {toggling
              ? '…'
              : lesson.isCompleted
              ? 'Mark as Incomplete'
              : 'Mark as Complete'}
          </button>

          {lesson.courseId && (
            <Link to={`/courses/${lesson.courseId}`} className="btn btn-ghost">
              View Course
            </Link>
          )}
        </div>
      </div>

      <div style={{ marginTop: 24, fontSize: 12, color: 'var(--text-secondary)' }}>
        Created: {new Date(lesson.createdAt).toLocaleString()}
      </div>
    </>
  );
}
