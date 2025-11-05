import React, { useState, useEffect } from 'react';
import { auth } from '../../lib/auth';
import type { Student } from '../../types/student';

const StudentResults: React.FC = () => {
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

  // Mock results data
  const examResults = [
    { 
      exam: 'Midterm Exam', 
      course: 'Web Development', 
      score: 85, 
      grade: 'A', 
      date: '2023-10-15',
      maxScore: 100
    },
    { 
      exam: 'Assignment #1', 
      course: 'Web Development', 
      score: 92, 
      grade: 'A+', 
      date: '2023-10-10',
      maxScore: 100
    },
    { 
      exam: 'Final Exam', 
      course: 'Python Programming', 
      score: 78, 
      grade: 'B+', 
      date: '2023-11-05',
      maxScore: 100
    },
    { 
      exam: 'Project Presentation', 
      course: 'Web Development', 
      score: 95, 
      grade: 'A+', 
      date: '2023-11-01',
      maxScore: 100
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'text-green-600';
    if (grade === 'B+' || grade === 'B') return 'text-blue-600';
    if (grade === 'C') return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">My Results - {student?.name || 'Loading...'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-blue-700">
            {examResults.length ? Math.round(examResults.reduce((sum, result) => sum + result.score, 0) / examResults.length) : 0}%
          </p>
        </div>
        
        <div className="bg-green-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Best Performance</h3>
          <p className="text-3xl font-bold text-green-700">
            {examResults.length ? Math.max(...examResults.map(r => r.score)) : 0}
          </p>
        </div>
        
        <div className="bg-purple-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Overall Grade</h3>
          <p className="text-3xl font-bold text-purple-700">
            {examResults.length ? 
              (Math.round(examResults.reduce((sum, result) => sum + result.score, 0) / examResults.length) >= 90 ? 
               'A' : 
               Math.round(examResults.reduce((sum, result) => sum + result.score, 0) / examResults.length) >= 80 ? 
               'B' : 
               Math.round(examResults.reduce((sum, result) => sum + result.score, 0) / examResults.length) >= 70 ? 
               'C' : 'D') : '-'}
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Exam Results</h2>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Course</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {examResults.map((result, index) => (
                    <tr key={index}>
                      <td className="px-3 md:px-6 py-4 text-sm">{result.exam}</td>
                      <td className="px-3 md:px-6 py-4 text-sm hidden sm:table-cell">{result.course}</td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm">{result.score}/{result.maxScore}</td>
                      <td className={`px-3 md:px-6 py-4 whitespace-nowrap text-sm font-semibold ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                        {new Date(result.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentResults;