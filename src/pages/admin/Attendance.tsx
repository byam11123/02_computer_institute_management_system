import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { auth } from '../../lib/auth';
import type { Student } from '../../types/student';

const Attendance: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        if (!currentUser) {
          window.location.href = '/login';
          return;
        }
        setUser(currentUser);
        loadStudents();
      } catch (error) {
        console.error('Error fetching user data:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const loadStudents = async () => {
    try {
      // In a real app, this would fetch students from Supabase
      // For now, using mock data
      const mockStudents: Student[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: '123 Main St',
          date_of_birth: '2000-01-01',
          enrollment_date: '2023-09-01',
          batch_id: 'batch1',
          course_id: 'course1',
          status: 'active',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '0987654321',
          address: '456 Oak Ave',
          date_of_birth: '2001-05-15',
          enrollment_date: '2023-09-01',
          batch_id: 'batch1',
          course_id: 'course1',
          status: 'active',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '3',
          name: 'Robert Johnson',
          email: 'robert@example.com',
          phone: '5551234567',
          address: '789 Pine Rd',
          date_of_birth: '1999-08-22',
          enrollment_date: '2023-09-01',
          batch_id: 'batch1',
          course_id: 'course1',
          status: 'active',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
      ];
      setStudents(mockStudents);
      
      // Initialize attendance records
      const initialRecords: Record<string, boolean> = {};
      mockStudents.forEach(student => {
        initialRecords[student.id] = false; // Default to absent
      });
      setAttendanceRecords(initialRecords);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAttendanceChange = (studentId: string, present: boolean) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: present
    }));
  };

  const handleSubmitAttendance = () => {
    // In a real app, this would save attendance to Supabase
    const attendanceData = {
      date: attendanceDate,
      batchId: selectedBatch,
      records: attendanceRecords
    };
    
    console.log('Attendance submitted:', attendanceData);
    alert('Attendance submitted successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} isAdmin={true} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>Loading attendance...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isAdmin={true} />
      
      <div className="flex-grow flex flex-col">
        <Navbar user={user} onLogout={handleLogout} isAdmin={true} />
        
        <main className="flex-grow p-4 md:p-6">
          <div className="md:hidden p-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-blue-600 text-white p-2 rounded-md"
            >
              {sidebarOpen ? 'Close Menu' : 'Open Menu'}
            </button>
          </div>
          
          <h1 className="text-2xl font-bold mb-6">Attendance Management</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="batch">
                  Select Batch
                </label>
                <select
                  id="batch"
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">All Students</option>
                  <option value="batch1">Batch #1: Web Development</option>
                  <option value="batch2">Batch #2: Python Programming</option>
                  <option value="batch3">Batch #3: Data Science</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handleSubmitAttendance}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
                >
                  Submit Attendance
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Web Development
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <label className="inline-flex items-center mr-4">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-green-600"
                              checked={attendanceRecords[student.id] === true}
                              onChange={() => handleAttendanceChange(student.id, true)}
                            />
                            <span className="ml-2 text-green-600">Present</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-red-600"
                              checked={attendanceRecords[student.id] === false}
                              onChange={() => handleAttendanceChange(student.id, false)}
                            />
                            <span className="ml-2 text-red-600">Absent</span>
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default Attendance;