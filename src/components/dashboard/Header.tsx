// src/components/dashboard/Header.tsx
'use client';

import { Menu } from 'lucide-react';

interface HeaderProps {
  onMobileMenuClick: () => void;
}

export default function Header({ onMobileMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        
        {/* Mobile menu button (visible only on small screens) */}
        <button
          onClick={onMobileMenuClick}
          className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
          aria-controls="sidebar-menu"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* This div is a spacer on mobile to keep the title/actions centered if needed */}
        {/* On desktop, it's hidden, allowing the right-side content to align correctly. */}
        <div className="md:hidden"></div>

        {/* Right-side header content */}
        <div className="flex items-center space-x-4">
          {/* 
            Placeholder for future features like:
            - A Search Bar
            - Notifications Icon
            - User Profile Dropdown
            
            Example:
            <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
              <Bell size={20} />
            </button>
            <UserNav /> // A component for the user profile picture and dropdown
          */}
          <p className="text-sm text-slate-600 dark:text-slate-400">Header Content</p>
        </div>
      </div>
    </header>
  );
}