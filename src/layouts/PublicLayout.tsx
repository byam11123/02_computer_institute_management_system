import React, { type ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface PublicLayoutProps {
  children: ReactNode;
  user?: any;
  onLogout?: () => void;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;