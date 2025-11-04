import React, { type ReactNode, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

interface AdminLayoutProps {
  children: ReactNode;
  user?: any;
  onLogout?: () => void;
  isAdmin?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, user, onLogout, isAdmin = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isAdmin={isAdmin} />
      
      <div className="flex-grow flex flex-col">
        <Navbar user={user} onLogout={onLogout} isAdmin={isAdmin} />
        
        <main className="flex-grow p-4 md:p-6">
          <div className="md:hidden p-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-blue-600 text-white p-2 rounded-md"
            >
              {sidebarOpen ? 'Close Menu' : 'Open Menu'}
            </button>
          </div>
          
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;