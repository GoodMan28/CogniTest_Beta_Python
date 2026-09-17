
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import { Menu } from 'lucide-react';

const StudentLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] print:block print:bg-white">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#FAFAFA] border-b border-gray-200 flex items-center px-4 z-40">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-900"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="ml-4 font-semibold text-gray-900">Student Portal</span>
      </div>

      <StudentSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex-1 min-w-0 mt-16 md:mt-0 md:ml-64 print:ml-0 print:w-full print:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
