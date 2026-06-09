import { useState, useEffect, useCallback } from 'react';
import { getCourses, getCourse, createCourse, deleteCourse } from '../services/api';

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const addCourse = useCallback(async (courseData) => {
    const created = await createCourse(courseData);
    setCourses((prev) => [created, ...prev]);
    return created;
  }, []);

  const removeCourse = useCallback(async (id) => {
    await deleteCourse(id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { courses, loading, error, addCourse, removeCourse, refetch: fetchCourses };
}

export function useCourse(id) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getCourse(id)
      .then(setCourse)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { course, loading, error };
}
