const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// Courses
export const getCourses = () => request('/courses');
export const getCourse = (id) => request(`/courses/${id}`);
export const createCourse = (data) => request('/courses', { method: 'POST', body: JSON.stringify(data) });
export const deleteCourse = (id) => request(`/courses/${id}`, { method: 'DELETE' });

// Lessons
export const getLessons = (courseId) => request(`/courses/${courseId}/lessons`);
export const getLesson = (id) => request(`/lessons/${id}`);
export const createLesson = (courseId, data) => request(`/courses/${courseId}/lessons`, { method: 'POST', body: JSON.stringify(data) });
export const updateLesson = (id, data) => request(`/lessons/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteLesson = (id) => request(`/lessons/${id}`, { method: 'DELETE' });
export const getLessonProgress = (courseId) => request(`/courses/${courseId}/lessons/progress`);
