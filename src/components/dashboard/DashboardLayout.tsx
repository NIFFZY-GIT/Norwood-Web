// src/components/dashboard/DashboardLayout.tsx
'use client';

import { useState, type ReactNode } from 'react';
import { UserSession } from '@/lib/types';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/Footer'; // Assuming your footer is at src/components/Footer.tsx
import { Loader2 } from 'lucide-react';

export default function DashboardLayoutComponent({
  session,
  children,
}: {
  session: UserSession | null;
  children: ReactNode;
}) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!session) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin text-sky-500" />
      </div>
    );
  }

  // This is the correct layout structure
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar
        username={session.username}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area: flex-1 makes it grow, md:ml-64 pushes it right */}
      <div className="flex-1 flex flex-col overflow-y-auto md:ml-64">
        
        {/* Header (optional, but good practice) */}
        {/* If you don't have a header, you can remove this line */}
        <Header onMobileMenuClick={() => setMobileSidebarOpen(true)} />

        {/* This is where your page content goes */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        
        {/* Your elaborate footer is placed here, at the bottom of the scrollable content */}
        <Footer />
      </div>
    </div>
  );
}