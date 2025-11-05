import React, { useState, useEffect } from 'react';
import { auth } from '../lib/auth';
import type { Student } from '../types/student';

const StudentDashboard: React.FC = () => {
  // Note: sidebarOpen state is handled by the Layout component
  const [_user, setUser] = useState<any>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Note: handleLogout is handled by the Layout component

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      
      {student && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name:</p>
              <p className="font-medium">{student.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-medium">{student.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone:</p>
              <p className="font-medium">{student.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Enrollment Date:</p>
              <p className="font-medium">{student.enrollment_date}</p>
            </div>
            <div>
              <p className="text-gray-600">Course:</p>
              <p className="font-medium">Web Development</p>
            </div>
            <div>
              <p className="text-gray-600">Status:</p>
              <p className={`font-medium ${student.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-blue-100 rounded-lg p-4 md:p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <p className="text-3xl font-bold text-blue-700">92%</p>
          <p className="text-sm text-gray-600 mt-2">Current attendance rate</p>
        </div>
        
        <div className="bg-green-100 rounded-lg p-4 md:p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Courses</h3>
          <p className="text-3xl font-bold text-green-700">2</p>
          <p className="text-sm text-gray-600 mt-2">Active courses</p>
        </div>
        
        <div className="bg-yellow-100 rounded-lg p-4 md:p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Results</h3>
          <p className="text-3xl font-bold text-yellow-700">A+</p>
          <p className="text-sm text-gray-600 mt-2">Latest grade</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
        <ul className="space-y-3">
          <li className="flex justify-between items-center border-b pb-3">
            <span>New course schedule released for next month</span>
            <span className="text-sm text-gray-500">2 days ago</span>
          </li>
          <li className="flex justify-between items-center border-b pb-3">
            <span>Lab maintenance scheduled for Saturday</span>
            <span className="text-sm text-gray-500">1 week ago</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Assignment submission deadline extended</span>
            <span className="text-sm text-gray-500">2 weeks ago</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default StudentDashboard;