import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isAdmin = false }) => {
  const navItems = isAdmin
    ? [
        { name: 'Dashboard', href: '/admin' },
        { name: 'Students', href: '/admin/students' },
        { name: 'Courses', href: '/admin/courses' },
        { name: 'Batches', href: '/admin/batches' },
        { name: 'Attendance', href: '/admin/attendance' },
        { name: 'Results', href: '/admin/results' },
      ]
    : [
        { name: 'Dashboard', href: '/student' },
        { name: 'My Courses', href: '/student/courses' },
        { name: 'Attendance', href: '/student/attendance' },
        { name: 'Results', href: '/student/results' },
        { name: 'Profile', href: '/student/profile' },
      ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Navigation</h2>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                  onClick={onClose}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;