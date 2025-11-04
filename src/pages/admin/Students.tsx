import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StudentForm from '../../features/students/StudentForm';
import StudentList from '../../features/students/StudentList';
import type { Student } from '../../types/student';
import { auth } from '../../lib/auth';
import studentService from '../../features/students/studentService';

const Students: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

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
      const data = await studentService.getAllStudents();
      setStudents(data);
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

  const handleSaveStudent = async (_student: Student) => {
    setShowForm(false);
    setCurrentStudent(null);
    await loadStudents(); // Refresh the list
  };

  const handleEditStudent = (student: Student) => {
    setCurrentStudent(student);
    setShowForm(true);
  };

  const handleAddStudent = () => {
    setCurrentStudent(null);
    setShowForm(true);
  };

  const handleDeleteStudent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        await loadStudents(); // Refresh the list
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student: ' + (error as Error).message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} isAdmin={true} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>Loading students...</p>
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
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Students Management</h1>
            <button
              onClick={handleAddStudent}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Student
            </button>
          </div>

          {showForm ? (
            <StudentForm 
              student={currentStudent || undefined} 
              onSave={handleSaveStudent} 
              onCancel={() => {
                setShowForm(false);
                setCurrentStudent(null);
              }} 
            />
          ) : (
            <StudentList 
              students={students} 
              onEdit={handleEditStudent} 
              onDelete={handleDeleteStudent} 
            />
          )}
        </main>

      </div>
    </div>
  );
};

export default Students;