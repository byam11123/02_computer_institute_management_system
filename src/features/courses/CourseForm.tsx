import React, { useState, useEffect } from 'react';
import type { Course } from '../../types/course';
import InputField from '../../components/InputField';
import courseService from './courseService';

interface CourseFormProps {
  course?: Course;
  onSave: (course: Course) => void;
  onCancel: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Course, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    description: '',
    duration: '',
    fee: 0,
    syllabus: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (course) {
      const { id, created_at, updated_at, ...rest } = course;
      setFormData(rest);
    }
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }
    
    if (formData.fee <= 0) {
      newErrors.fee = 'Fee must be greater than 0';
    }
    
    if (!formData.syllabus.trim()) {
      newErrors.syllabus = 'Syllabus URL is required';
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
      let result: Course;
      if (course) {
        // Update existing course
        result = await courseService.updateCourse(course.id, {
          ...formData,
          id: course.id, // Preserve the original ID
          created_at: course.created_at,
          updated_at: new Date().toISOString()
        });
      } else {
        // Create new course
        result = await courseService.createCourse(formData);
      }
      
      onSave(result);
    } catch (error: any) {
      console.error('Error saving course:', error);
      alert(`Error saving course: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{course ? 'Edit Course' : 'Add New Course'}</h2>
      
      <form onSubmit={handleSubmit}>
        <InputField
          label="Course Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
        />
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.description ? 'border-red-500' : ''
            }`}
            required
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs italic mt-1">{errors.description}</p>}
        </div>
        
        <InputField
          label="Duration (e.g., 3 months, 6 weeks)"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          error={errors.duration}
          required
        />
        
        <InputField
          label="Fee (in INR)"
          name="fee"
          type="number"
          value={formData.fee}
          onChange={handleChange}
          error={errors.fee}
          required
        />
        
        <InputField
          label="Syllabus URL"
          name="syllabus"
          value={formData.syllabus}
          onChange={handleChange}
          error={errors.syllabus}
          required
        />
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {course ? 'Update Course' : 'Add Course'}
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

export default CourseForm;