import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth } from '../lib/auth';
import Home from '../pages/Home';
import About from '../pages/About';
import Courses from '../pages/Courses';
import Contact from '../pages/Contact';
import Admission from '../pages/Admission';
import Login from '../pages/Login';
import StudentDashboard from '../pages/StudentDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Import new admin pages
import Students from '../pages/admin/Students';
import CoursesPage from '../pages/admin/Courses';
import Batches from '../pages/admin/Batches';
import Attendance from '../pages/admin/Attendance';
import Results from '../pages/admin/Results';

// Import new student pages
import StudentCourses from '../pages/student/Courses';
import StudentAttendance from '../pages/student/Attendance';
import StudentResults from '../pages/student/Results';
import StudentProfile from '../pages/student/Profile';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await auth.isAuthenticated();
        const currentUser = await auth.getCurrentUser();
        
        setIsAuthenticated(authStatus);
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    React.useEffect(() => {
      const timer = setTimeout(() => {
        window.location.href = '/login';
      }, 1000); // Small delay to allow the redirect message to show
      return () => clearTimeout(timer);
    }, []);
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Redirecting to login...</div>
      </div>
    );
  }
  
  // If adminOnly is true, check if user is admin
  if (adminOnly && user) {
    // In a real app, you would check user role here
    // For now, we'll assume any logged in user can access admin routes
  }
  
  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        } />
        <Route path="/about" element={
          <PublicLayout>
            <About />
          </PublicLayout>
        } />
        <Route path="/courses" element={
          <PublicLayout>
            <Courses />
          </PublicLayout>
        } />
        <Route path="/contact" element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        } />
        <Route path="/admission" element={
          <PublicLayout>
            <Admission />
          </PublicLayout>
        } />
        <Route path="/login" element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        } />
        
        {/* Student Dashboard */}
        <Route path="/student" element={
          <ProtectedRoute>
            <AdminLayout>
              <StudentDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* Student-specific routes */}
        <Route path="/student/courses" element={
          <ProtectedRoute>
            <AdminLayout>
              <StudentCourses />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/attendance" element={
          <ProtectedRoute>
            <AdminLayout>
              <StudentAttendance />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/results" element={
          <ProtectedRoute>
            <AdminLayout>
              <StudentResults />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/profile" element={
          <ProtectedRoute>
            <AdminLayout>
              <StudentProfile />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* Admin-specific routes */}
        <Route path="/admin/students" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout>
              <Students />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/courses" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout>
              <CoursesPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/batches" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout>
              <Batches />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/attendance" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout>
              <Attendance />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/results" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout>
              <Results />
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;