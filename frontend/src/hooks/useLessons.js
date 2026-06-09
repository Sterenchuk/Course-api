import { useState, useEffect, useCallback } from 'react';
import { getLessons, createLesson, updateLesson, deleteLesson } from '../services/api';

export function useLessons(courseId) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLessons = useCallback(async () => {
    if (!courseId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getLessons(courseId);
      setLessons(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => { fetchLessons(); }, [fetchLessons]);

  const addLesson = useCallback(async (lessonData) => {
    const created = await createLesson(courseId, lessonData);
    setLessons((prev) => [...prev, created]);
    return created;
  }, [courseId]);

  const toggleLesson = useCallback(async (lesson) => {
    const updated = await updateLesson(lesson.id, { isCompleted: !lesson.isCompleted });
    setLessons((prev) => prev.map((l) => (l.id === lesson.id ? updated : l)));
    return updated;
  }, []);

  const removeLesson = useCallback(async (id) => {
    await deleteLesson(id);
    setLessons((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const progress = lessons.length === 0
    ? 0
    : Math.round((lessons.filter((l) => l.isCompleted).length / lessons.length) * 100);

  return { lessons, loading, error, addLesson, toggleLesson, removeLesson, progress, refetch: fetchLessons };
}
