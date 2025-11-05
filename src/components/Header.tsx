import React from 'react';

interface HeaderProps {
  user?: any;
  onLogout?: () => void;
  onMenuToggle?: () => void;
  sidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onMenuToggle, sidebarOpen }) => {
  const userType = user?.email === 'admin@example.com' ? 'Admin' : 'Student';
  
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-blue-600 font-bold text-xl p-2 rounded">CIMS</div>
          <h1 className="text-xl font-semibold hidden md:block">Computer Institute Management System</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <span className="mr-4">Hi, {user?.user_metadata?.name || user?.email}!</span>
            <span className="bg-blue-800 px-3 py-1 rounded-full text-sm">({userType})</span>
          </div>
          
          <button 
            onClick={onMenuToggle}
            className="md:hidden bg-blue-700 p-2 rounded-md"
          >
            {sidebarOpen ? 'Close' : 'Menu'}
          </button>
          
          <button 
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;