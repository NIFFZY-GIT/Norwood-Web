// src/app/layout.tsx
import { getSession, SessionData } from '@/lib/session';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { headers } from 'next/headers';

// Import your global styles and fonts here
import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch session data on the server.
  const session: SessionData | null = await getSession();

  // Determine the current path on the server.
  // The 'headers()' function returns a Promise and should be awaited.
  const headersList = await headers();
  const pathname = headersList.get('x-next-pathname') || '';
  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {/*
          This conditional rendering is the correct and most robust pattern.
          It ensures completely separate layouts for public vs. dashboard routes,
          preventing style conflicts and footer duplication.
        */}
        {isDashboardRoute ? (
          // For dashboard routes, we render ONLY the children.
          // The dashboard's own frame (Sidebar, Header, etc.) will be applied
          // by a layout file within the /dashboard directory.
          <>{children}</>
        ) : (
          // For all public-facing routes, render the full public layout.
          // The 'session' variable is now correctly used by the Navbar.
          <>
            <Navbar session={session} />
            <main className="pt-20"> 
              {children}
            </main>
            {/* This Footer will now ONLY render on public pages, solving the duplication issue. */}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}