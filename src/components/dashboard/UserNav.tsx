// src/components/dashboard/UserNav.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, LogOut, Settings, UserCircle2 } from 'lucide-react';
import { UserSession } from '@/lib/types';

// A simple client-side function to get session info
// This is useful for components that need session data but are deep in the tree.
async function getClientSession(): Promise<UserSession | null> {
    try {
        const res = await fetch('/api/auth/session'); // Ensure you have this API route
        if (res.ok) {
            return res.json();
        }
        return null;
    } catch {
        return null;
    }
}

export default function UserNav() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch session data when the component mounts
    getClientSession().then(setSession);
  }, []);

  // Effect to close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' }); // Ensure you have this API route
    router.push('/login');
    router.refresh(); // Important to clear client-side cache
  };

  // Show a pulsing placeholder while session data is loading
  if (!session) {
    return (
        <div className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-full hover:ring-2 hover:ring-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
        aria-label="User menu"
      >
        <UserCircle2 className="w-6 h-6 text-slate-500 dark:text-slate-400" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700"
        >
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
              {session.username}
            </p>
          </div>
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
             <Link
            href="/dashboard/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}