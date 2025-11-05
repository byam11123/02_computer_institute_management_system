import React, { useState, useEffect } from 'react';
import { auth } from '../../lib/auth';
import type { Student } from '../../types/student';

const StudentCourses: React.FC = () => {
  const [_sidebarOpen, _setSidebarOpen] = useState(false);
  const [_user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        if (!currentUser) {
          window.location.href = '/login';
          return;
        }
        setUser(currentUser);
        
        // In a real app, this would fetch student data from Supabase
        // For now, using mock data
        const mockStudent: Student = {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: '123 Main St, City, State',
          date_of_birth: '2000-01-01',
          enrollment_date: '2023-09-01',
          batch_id: 'batch1',
          course_id: 'course1',
          status: 'active',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        };
        
        setStudent(mockStudent);
      } catch (error) {
        console.error('Error fetching user data:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Note: handleLogout is passed through Layout component

  // Mock courses data
  const courses = [
    {
      id: '1',
      title: 'Web Development',
      description: 'Learn to build responsive websites using HTML, CSS, JavaScript and modern frameworks',
      duration: '3 months',
      fee: 15000,
      syllabus: '#',
      instructor: 'Dr. Smith',
      progress: 75,
      status: 'active'
    },
    {
      id: '2',
      title: 'Python Programming',
      description: 'Master Python programming from basics to advanced concepts',
      duration: '2 months',
      fee: 12000,
      syllabus: '#',
      instructor: 'Prof. Johnson',
      progress: 40,
      status: 'active'
    }
  ];

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
      <h1 className="text-2xl font-bold mb-6">My Courses - {student?.name || 'Loading...'}</h1>
      
      <div className="space-y-4 md:space-y-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2">{course.title}</h2>
            <p className="text-sm md:text-base text-gray-600 mb-4">{course.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 text-sm">
              <div className="text-gray-700">
                <span className="font-semibold">Instructor:</span> {course.instructor}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">Duration:</span> {course.duration}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                Continue
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm">
                Syllabus
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentCourses;