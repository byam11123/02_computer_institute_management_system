import React, { useState, useEffect } from 'react';
import BatchForm from '../../features/batches/BatchForm';
import type { Batch } from '../../types/batch';
import { auth } from '../../lib/auth';
import batchService from '../../features/batches/batchService';

const Batches: React.FC = () => {
  // Note: sidebarOpen is managed by Layout component
  const [_user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentBatch, setCurrentBatch] = useState<Batch | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
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
        loadBatches();
      } catch (error) {
        console.error('Error fetching user data:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const loadBatches = async () => {
    try {
      const data = await batchService.getAllBatches();
      setBatches(data);
    } catch (error) {
      console.error('Error loading batches:', error);
    }
  };

  // Note: handleLogout is passed through Layout component

  const handleSaveBatch = async (_batch: Batch) => {
    setShowForm(false);
    setCurrentBatch(null);
    await loadBatches(); // Refresh the list
  };

  const handleEditBatch = (batch: Batch) => {
    setCurrentBatch(batch);
    setShowForm(true);
  };

  const handleAddBatch = () => {
    setCurrentBatch(null);
    setShowForm(true);
  };

  const handleDeleteBatch = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      try {
        await batchService.deleteBatch(id);
        await loadBatches(); // Refresh the list
      } catch (error) {
        console.error('Error deleting batch:', error);
        alert('Error deleting batch: ' + (error as Error).message);
      }
    }
  };

  const filteredBatches = batches.filter(batch => 
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.course_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading batches...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Batches Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleAddBatch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Batch
          </button>
        </div>
      </div>

      {showForm ? (
        <BatchForm 
          batch={currentBatch || undefined} 
          onSave={handleSaveBatch} 
          onCancel={() => {
            setShowForm(false);
            setCurrentBatch(null);
          }} 
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBatches.map((batch) => (
                  <tr key={batch.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{batch.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {batch.course_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(batch.start_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(batch.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {batch.current_students}/{batch.max_students}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        batch.status === 'active' ? 'bg-green-100 text-green-800' :
                        batch.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditBatch(batch)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBatch(batch.id)}
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
          {filteredBatches.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No batches found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Batches;