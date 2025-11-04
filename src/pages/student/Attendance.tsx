import React, { useState, useEffect } from 'react';
import { auth } from '../../lib/auth';
import type { Student } from '../../types/student';

const StudentAttendance: React.FC = () => {
  // Note: sidebarOpen is managed by Layout component
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

  // Note: handleLogout is handled by Layout component

  // Mock attendance data
  const attendanceRecords = [
    { date: '2023-10-01', status: 'present', course: 'Web Development' },
    { date: '2023-10-02', status: 'present', course: 'Web Development' },
    { date: '2023-10-03', status: 'absent', course: 'Web Development' },
    { date: '2023-10-04', status: 'present', course: 'Web Development' },
    { date: '2023-10-05', status: 'present', course: 'Web Development' },
    { date: '2023-10-06', status: 'present', course: 'Python Programming' },
    { date: '2023-10-07', status: 'present', course: 'Python Programming' },
    { date: '2023-10-08', status: 'absent', course: 'Python Programming' },
  ];

  const calculateAttendancePercentage = () => {
    const presentCount = attendanceRecords.filter(record => record.status === 'present').length;
    return Math.round((presentCount / attendanceRecords.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading attendance...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">My Attendance - {student?.name || 'Loading...'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Overall Attendance</h3>
          <p className="text-3xl font-bold text-blue-700">{calculateAttendancePercentage()}%</p>
        </div>
        
        <div className="bg-green-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Present Days</h3>
          <p className="text-3xl font-bold text-green-700">
            {attendanceRecords.filter(r => r.status === 'present').length}
          </p>
        </div>
        
        <div className="bg-red-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Absent Days</h3>
          <p className="text-3xl font-bold text-red-700">
            {attendanceRecords.filter(r => r.status === 'absent').length}
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Attendance Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentAttendance;