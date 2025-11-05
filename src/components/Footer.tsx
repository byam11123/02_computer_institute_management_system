import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Computer Institute</h3>
            <p className="text-gray-300">
              Providing quality computer education since 2020. Our institute is dedicated to helping students excel in the field of technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="/courses" className="text-gray-300 hover:text-white">Courses</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <address className="not-italic text-gray-300">
              <p>123 Education Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@example.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Computer Institute Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;