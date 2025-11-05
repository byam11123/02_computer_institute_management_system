import React, { useState, useEffect } from 'react';
import { auth } from '../../lib/auth';
import type { Student } from '../../types/student';

const Results: React.FC = () => {
  // Note: sidebarOpen is managed by Layout component
  const [_user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [results, setResults] = useState<Record<string, number>>({});

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
      
      // Initialize results
      const initialResults: Record<string, number> = {};
      mockStudents.forEach(student => {
        initialResults[student.id] = 0; // Default to 0
      });
      setResults(initialResults);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  // Note: handleLogout is passed through Layout component

  const handleResultChange = (studentId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setResults(prev => ({
      ...prev,
      [studentId]: numValue > 100 ? 100 : numValue < 0 ? 0 : numValue
    }));
  };

  const handleSubmitResults = () => {
    // In a real app, this would save results to Supabase
    const resultsData = {
      exam: selectedExam,
      batchId: selectedBatch,
      results: results
    };
    
    console.log('Results submitted:', resultsData);
    alert('Results submitted successfully!');
  };

  const getGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    return 'F';
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-purple-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
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
      <h1 className="text-2xl font-bold mb-6">Results Management</h1>
      
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exam">
              Select Exam
            </label>
            <select
              id="exam"
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Exam</option>
              <option value="midterm">Midterm Exam</option>
              <option value="final">Final Exam</option>
              <option value="assignment1">Assignment #1</option>
              <option value="assignment2">Assignment #2</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleSubmitResults}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
            >
              Submit Results
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={results[student.id] || 0}
                      onChange={(e) => handleResultChange(student.id, e.target.value)}
                      className="shadow appearance-none border rounded w-20 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <span className="text-gray-500 ml-2">/100</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${getGradeColor(results[student.id] || 0)}`}>
                      {getGrade(results[student.id] || 0)}
                    </span>
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
    </>
  );
};

export default Results;