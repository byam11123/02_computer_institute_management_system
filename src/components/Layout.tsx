import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  user?: any;
  onLogout?: () => void;
  isAdmin?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, isAdmin = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={onLogout} isAdmin={isAdmin} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isAdmin={isAdmin} />
        
        <main className="flex-grow p-4 md:p-6 overflow-auto">
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
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;