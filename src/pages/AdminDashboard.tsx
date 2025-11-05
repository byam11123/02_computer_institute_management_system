import React, { useState, useEffect } from 'react';
import { auth } from '../lib/auth';

const AdminDashboard: React.FC = () => {
  const [_user, setUser] = useState<any>(null);  // Mark as intentionally unused
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // If not authenticated, redirect to login
        window.location.href = '/login';
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
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-blue-700">245</p>
        </div>
        
        <div className="bg-green-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
          <p className="text-3xl font-bold text-green-700">12</p>
        </div>
        
        <div className="bg-yellow-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Active Batches</h3>
          <p className="text-3xl font-bold text-yellow-700">8</p>
        </div>
        
        <div className="bg-purple-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">New Enquiries</h3>
          <p className="text-3xl font-bold text-purple-700">17</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Student Enrollments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap">Web Development</td>
                  <td className="px-6 py-4 whitespace-nowrap">2023-10-15</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Sarah Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap">Data Science</td>
                  <td className="px-6 py-4 whitespace-nowrap">2023-10-14</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Michael Brown</td>
                  <td className="px-6 py-4 whitespace-nowrap">UI/UX Design</td>
                  <td className="px-6 py-4 whitespace-nowrap">2023-10-12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Course Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Web Development</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Python Programming</span>
                <span>88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Data Science</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Mobile App Development</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="flex items-center border-b pb-3">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <p className="font-medium">New student enrolled: Jane Doe</p>
              <p className="text-sm text-gray-500">Web Development course</p>
            </div>
            <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
          </li>
          <li className="flex items-center border-b pb-3">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div>
              <p className="font-medium">Course updated: Python Programming</p>
              <p className="text-sm text-gray-500">Syllabus modified</p>
            </div>
            <span className="ml-auto text-sm text-gray-500">5 hours ago</span>
          </li>
          <li className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="font-medium">Batch scheduled: Batch #15</p>
              <p className="text-sm text-gray-500">Starts on 2023-11-01</p>
            </div>
            <span className="ml-auto text-sm text-gray-500">1 day ago</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;