import React, { useState, useEffect } from 'react';
import CourseForm from '../../features/courses/CourseForm';
import type { Course } from '../../types/course';
import { auth } from '../../lib/auth';
import courseService from '../../features/courses/courseService';

const Courses: React.FC = () => {
  // Note: sidebarOpen is managed by Layout component
  const [_user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        if (!currentUser) {
          window.location.href = '/login';
          return;
        }
        setUser(currentUser);
        loadCourses();
      } catch (error) {
        console.error('Error fetching user data:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  // Note: handleLogout is passed through Layout component

  const handleSaveCourse = async (_course: Course) => {
    setShowForm(false);
    setCurrentCourse(null);
    await loadCourses(); // Refresh the list
  };

  const handleEditCourse = (course: Course) => {
    setCurrentCourse(course);
    setShowForm(true);
  };

  const handleAddCourse = () => {
    setCurrentCourse(null);
    setShowForm(true);
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(id);
        await loadCourses(); // Refresh the list
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course: ' + (error as Error).message);
      }
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Courses Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleAddCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Course
          </button>
        </div>
      </div>

      {showForm ? (
        <CourseForm 
          course={currentCourse || undefined} 
          onSave={handleSaveCourse} 
          onCancel={() => {
            setShowForm(false);
            setCurrentCourse(null);
          }} 
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{course.fee.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No courses found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Courses;