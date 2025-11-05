import React, { useState } from 'react';
import InputField from '../components/InputField';
import { auth } from '../lib/auth';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name] || loginError) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      // Try to log the user in
      await auth.login({
        email: formData.email,
        password: formData.password
      });
      
      // Redirect based on user role after login
      const currentUser = await auth.getCurrentUser();
      if (currentUser && currentUser.email === 'admin@example.com') {
        window.location.href = '/admin';
      } else {
        // Default to student dashboard for students and other users
        window.location.href = '/student';
      }
    } catch (error: any) {
      setLoginError(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>
              
              {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {loginError}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
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
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <a href="/admission" className="text-blue-600 hover:underline">
                    Register here
                  </a>
                </p>
                <p className="text-gray-600 mt-2">
                  <a href="#" className="text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;