import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isAdmin = false }) => {
  // Role-based navigation items
  const navItems = isAdmin
    ? [
        { name: 'Dashboard', href: '/admin' },
        { name: 'Manage Students', href: '/admin/manage-students' },
        { name: 'Manage Courses', href: '/admin/manage-courses' },
        { name: 'Reports', href: '/admin/reports' },
        { name: 'Settings', href: '/admin/settings' },
      ]
    : [
        { name: 'Dashboard', href: '/student' },
        { name: 'Courses', href: '/student/courses' },
        { name: 'Attendance', href: '/student/attendance' },
        { name: 'Results', href: '/student/results' },
        { name: 'Profile', href: '/student/profile' },
      ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-16 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:top-0 md:h-auto`}
      >
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">
            {isAdmin ? 'Admin Navigation' : 'Student Dashboard'}
          </h2>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`block py-2 px-4 rounded hover:bg-gray-700 transition-colors ${
                    window.location.pathname === item.href ? 'bg-blue-600 text-white' : 'text-gray-200'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onClose(); // Close sidebar on mobile after clicking
                    }
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;