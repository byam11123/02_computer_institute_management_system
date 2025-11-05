import React, { useState } from 'react';
import InputField from '../components/InputField';

const Admission: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    course_id: '',
    batch_id: '',
    previous_education: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of birth is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.course_id) {
      newErrors.course_id = 'Please select a course';
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would send data to Supabase
    setTimeout(() => {
      console.log('Admission form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        address: '',
        course_id: '',
        batch_id: '',
        previous_education: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  // Sample courses data - in a real app, this would come from Supabase
  const courses = [
    { id: '1', title: 'Web Development' },
    { id: '2', title: 'Python Programming' },
    { id: '3', title: 'Data Science' },
    { id: '4', title: 'Mobile App Development' },
    { id: '5', title: 'UI/UX Design' },
  ];

  return (
    <>
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Admission Form</h1>
          
          <div className="max-w-2xl mx-auto">
            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you for your admission request! We'll get back to you soon.
              </div>
            )}
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Apply for Admission</h2>
              
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
                
                <InputField
                  label="Date of Birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  error={errors.date_of_birth}
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
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_id">
                    Select Course <span className="text-red-500">*</span>
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
                
                <InputField
                  label="Previous Education"
                  name="previous_education"
                  value={formData.previous_education}
                  onChange={handleChange}
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Admission;