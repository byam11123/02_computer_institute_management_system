import React, { useState, useEffect } from 'react';
import type { Batch } from '../../types/batch';
import InputField from '../../components/InputField';
import batchService from './batchService';

interface BatchFormProps {
  batch?: Batch;
  onSave: (batch: Batch) => void;
  onCancel: () => void;
}

const BatchForm: React.FC<BatchFormProps> = ({ batch, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Batch, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    course_id: '',
    start_date: '',
    end_date: '',
    max_students: 0,
    current_students: 0,
    status: 'active',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    if (batch) {
      const { id, created_at, updated_at, ...rest } = batch;
      setFormData(rest);
    }
    
    // In a real app, this would fetch courses from Supabase
    // For now, using mock data
    setCourses([
      { id: 'course1', title: 'Web Development' },
      { id: 'course2', title: 'Python Programming' },
      { id: 'course3', title: 'Data Science' },
      { id: 'course4', title: 'Mobile App Development' },
      { id: 'course5', title: 'UI/UX Design' },
    ]);
  }, [batch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'max_students' || name === 'current_students' ? Number(value) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.course_id) {
      newErrors.course_id = 'Course is required';
    }
    
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }
    
    if (!formData.end_date) {
      newErrors.end_date = 'End date is required';
    }
    
    if (new Date(formData.end_date) < new Date(formData.start_date)) {
      newErrors.end_date = 'End date must be after start date';
    }
    
    if (formData.max_students <= 0) {
      newErrors.max_students = 'Max students must be greater than 0';
    }
    
    if (formData.current_students < 0) {
      newErrors.current_students = 'Current students cannot be negative';
    }
    
    if (formData.current_students > formData.max_students) {
      newErrors.current_students = 'Current students cannot exceed max students';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    try {
      let result: Batch;
      if (batch) {
        // Update existing batch
        result = await batchService.updateBatch(batch.id, {
          ...formData,
          id: batch.id, // Preserve the original ID
          created_at: batch.created_at,
          updated_at: new Date().toISOString()
        });
      } else {
        // Create new batch
        result = await batchService.createBatch(formData);
      }
      
      onSave(result);
    } catch (error: any) {
      console.error('Error saving batch:', error);
      alert(`Error saving batch: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{batch ? 'Edit Batch' : 'Add New Batch'}</h2>
      
      <form onSubmit={handleSubmit}>
        <InputField
          label="Batch Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_id">
            Course <span className="text-red-500">*</span>
          </label>
          <select
            id="course_id"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.course_id ? 'border-red-500' : ''
            }`}
            required
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
          {errors.course_id && <p className="text-red-500 text-xs italic mt-1">{errors.course_id}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Start Date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleChange}
            error={errors.start_date}
            required
          />
          
          <InputField
            label="End Date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleChange}
            error={errors.end_date}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Max Students"
            name="max_students"
            type="number"
            value={formData.max_students}
            onChange={handleChange}
            error={errors.max_students}
            required
          />
          
          <InputField
            label="Current Students"
            name="current_students"
            type="number"
            value={formData.current_students}
            onChange={handleChange}
            error={errors.current_students}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {batch ? 'Update Batch' : 'Add Batch'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BatchForm;