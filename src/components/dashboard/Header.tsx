// src/components/dashboard/Header.tsx
'use client';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
 // Import the new component

interface HeaderProps {
  onMobileMenuClick: () => void;
}

// A helper to get a nice title from the URL path
function getPageTitle(pathname: string): string {
    if (pathname === '/dashboard') return 'Dashboard Overview';
    
    const segment = pathname.split('/').pop() || '';
    if (!segment) return 'Dashboard';

    // Capitalize the first letter and return
    return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function Header({ onMobileMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuClick}
            className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
            aria-controls="sidebar-menu"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Dynamic Page Title (visible on desktop) */}
          <h1 className="hidden md:block text-xl font-semibold text-slate-700 dark:text-slate-200">
            {title}
          </h1>
        </div>

        {/* Right-side header content with the UserNav component */}
        <div className="flex items-center space-x-4">
            {/* You can add other icons here, e.g., for notifications */}
      
        </div>
      </div>
    </header>
  );
}