import React, { useState, useEffect } from 'react';
import { auth } from '../../lib/auth';
import type { Student } from '../../types/student';

const StudentProfile: React.FC = () => {
  // Note: sidebarOpen is managed by Layout component
  const [_user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Student | null>(null);

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
        setFormData({...mockStudent});
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

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({...student} as Student);
  };

  const handleSave = () => {
    // In a real app, this would save updated student data to Supabase
    setStudent(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({...student} as Student);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {isEditing ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4 px-4 md:px-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData?.name || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-4 px-4 md:px-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData?.email || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly // Email typically shouldn't be changed
                />
              </div>
              
              <div className="mb-4 px-4 md:px-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData?.phone || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-4 px-4 md:px-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_of_birth">
                  Date of Birth
                </label>
                <input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={formData?.date_of_birth.split('T')[0] || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="md:col-span-2 mb-4 px-4 md:px-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData?.address || ''}
                  onChange={handleChange}
                  rows={3}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
              
              <div className="mb-4 px-4 md:px-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enrollment_date">
                  Enrollment Date
                </label>
                <input
                  id="enrollment_date"
                  name="enrollment_date"
                  type="date"
                  value={formData?.enrollment_date.split('T')[0] || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly // Enrollment date typically shouldn't be changed
                />
              </div>
              
              <div className="mb-4 px-4 md:px-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_id">
                  Course
                </label>
                <input
                  id="course_id"
                  name="course_id"
                  type="text"
                  value={formData?.course_id || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly // Course typically shouldn't be changed by student
                />
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600">Full Name</p>
                <p className="font-medium text-lg">{student?.name}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Email Address</p>
                <p className="font-medium">{student?.email}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Phone Number</p>
                <p className="font-medium">{student?.phone}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Date of Birth</p>
                <p className="font-medium">{student?.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'N/A'}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-gray-600">Address</p>
                <p className="font-medium">{student?.address}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Enrollment Date</p>
                <p className="font-medium">{student?.enrollment_date ? new Date(student.enrollment_date).toLocaleDateString() : 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Course</p>
                <p className="font-medium">Web Development</p>
              </div>
              
              <div>
                <p className="text-gray-600">Status</p>
                <p className={`font-medium ${
                  student?.status === 'active' ? 'text-green-600' : 
                  student?.status === 'completed' ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {student?.status ? student.status.charAt(0).toUpperCase() + student.status.slice(1) : 'N/A'}
                </p>
              </div>
              
              <div>
                <p className="text-gray-600">Batch</p>
                <p className="font-medium">Batch #1</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentProfile;