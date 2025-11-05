import React from 'react';

interface User {
  id?: string;
  email?: string;
  name?: string;
  user_metadata?: {
    name?: string;
  };
  role?: string;
  [key: string]: any; // Allow other properties
}

interface NavbarProps {
  user?: User;
  onLogout?: () => void;
  isAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, isAdmin = false }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-blue-600 font-bold text-xl p-2 rounded">CIMS</div>
          <h1 className="text-xl font-semibold">Computer Institute Management System</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>Hi, {user.name || user.user_metadata?.name || user.email || 'User'}!</span>
              {isAdmin && (
                <a href="/admin" className="text-white hover:underline">Admin</a>
              )}
              <button 
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex space-x-2">
              <a href="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium">Login</a>
              <a href="/admission" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium">Admission</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;