// src/app/layout.tsx
import { getSession, SessionData } from '@/lib/session';
import Navbar from '@/components/Navbar'; // Adjust path if needed
import Footer from '@/components/Footer';   // Adjust path if needed
import { headers } from 'next/headers';     // 1. Import `headers` to read the pathname

// ... your other global imports like fonts, css, etc.
import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Fetch the session data on the server
  const session: SessionData | null = await getSession();

  // 3. Determine if the current route is part of the dashboard
  const headersList = await headers();
  const pathname = headersList.get('x-next-pathname') || ''; // Get the pathname from the request headers
  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <html lang="en">
      <body>
        {/* 4. Conditional Rendering Logic */}
        {isDashboardRoute ? (
          // For dashboard routes, render only the children.
          // The DashboardLayout will be part of these children.
          <>
            {children}
          </>
        ) : (
          // For all public routes, render the full public layout.
          <>
            <Navbar session={session} />
            {/* The pt-20 class ensures content doesn't hide behind the fixed navbar */}
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