// src/app/layout.tsx
import { getSession, SessionData } from '@/lib/session';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { headers } from 'next/headers'; // This is correct

// Import your global styles and fonts here
import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch session data on the server
  const session: SessionData | null = await getSession();

  // Determine the current path on the server
  const headersList = await headers();
  const pathname = headersList.get('x-next-pathname') || '';
  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <html lang="en">
      <body>
        {/* Perform conditional rendering based on the route */}
        {isDashboardRoute ? (
          // For dashboard routes, only render the children.
          // The dashboard's own layout will be inside {children}.
          <>{children}</>
        ) : (
          // For all public-facing routes, render the full public layout
          <>
            {/* Pass the session prop to the Navbar */}
            <Navbar session={session} />
            <main className="pt-20"> 
              {children}
            </main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}