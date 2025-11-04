import React, { useState, useEffect } from 'react';
import type { Student } from '../../types/student';
import InputField from '../../components/InputField';
import studentService from './studentService';

interface StudentFormProps {
  student?: Student;
  onSave: (student: Student) => void;
  onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Student, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
    enrollment_date: '',
    batch_id: '',
    course_id: '',
    status: 'active',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (student) {
      const { id, created_at, updated_at, ...rest } = student;
      setFormData(rest);
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of birth is required';
    }
    
    if (!formData.enrollment_date) {
      newErrors.enrollment_date = 'Enrollment date is required';
    }
    
    if (!formData.batch_id) {
      newErrors.batch_id = 'Batch is required';
    }
    
    if (!formData.course_id) {
      newErrors.course_id = 'Course is required';
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
      let result: Student;
      if (student) {
        // Update existing student
        result = await studentService.updateStudent(student.id, {
          ...formData,
          id: student.id, // Preserve the original ID
          created_at: student.created_at,
          updated_at: new Date().toISOString()
        });
      } else {
        // Create new student
        result = await studentService.createStudent(formData);
      }
      
      onSave(result);
    } catch (error: any) {
      console.error('Error saving student:', error);
      alert(`Error saving student: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{student ? 'Edit Student' : 'Add New Student'}</h2>
      
      <form onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.address ? 'border-red-500' : ''
            }`}
            required
          ></textarea>
          {errors.address && <p className="text-red-500 text-xs italic mt-1">{errors.address}</p>}
        </div>
        
        <InputField
          label="Date of Birth"
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={handleChange}
          error={errors.date_of_birth}
          required
        />
        
        <InputField
          label="Enrollment Date"
          name="enrollment_date"
          type="date"
          value={formData.enrollment_date}
          onChange={handleChange}
          error={errors.enrollment_date}
          required
        />
        
        <InputField
          label="Batch ID"
          name="batch_id"
          value={formData.batch_id}
          onChange={handleChange}
          error={errors.batch_id}
          required
        />
        
        <InputField
          label="Course ID"
          name="course_id"
          value={formData.course_id}
          onChange={handleChange}
          error={errors.course_id}
          required
        />
        
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
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {student ? 'Update Student' : 'Add Student'}
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

export default StudentForm;