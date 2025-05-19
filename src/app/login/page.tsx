// src/app/login/page.tsx
'use client'; // Add this if it's an App Router client component

import { useState, FormEvent } from 'react'; // Import FormEvent
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import Head from 'next/head'; // Still okay for <Head> within client components if needed, or handle metadata differently

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // <--- TYPE ADDED HERE
    e.preventDefault(); // Important to prevent default form submission
    setError('');
    setLoading(true);

    // --- FRONTEND ONLY: Simulate API Call & Logic ---
    console.log("Attempting login with:", { username, password });

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === "admin" && password === "password123") {
      console.log("Simulated login successful!");
      router.push('/admin/dashboard'); // Adjust path if needed
    } else if (username === "admin" && password !== "password123") {
      console.log("Simulated login failed: Incorrect password");
      setError('Incorrect password. (Frontend simulation)');
    } else {
      console.log("Simulated login failed: Invalid credentials");
      setError('Invalid username or password. (Frontend simulation)');
    }
    // --- END OF FRONTEND ONLY SIMULATION ---

    setLoading(false);
  };

  return (
    <>
      {/*
        For App Router, metadata is typically handled in layout.tsx or page.tsx via export const metadata = {...}
        If you need dynamic Head updates within a client component, Head from next/head still works,
        but the primary method for static metadata has changed.
      */}
      <Head>
        <title>Admin Login (Frontend Only)</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" // Replace with your logo
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Panel Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              (Frontend Demo - No Backend)
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}> {/* Ensure onSubmit is here */}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username_login" className="sr-only">
                  Username
                </label>
                <input
                  id="username_login"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(ev) => setUsername(ev.target.value)} // ev for onChange is React.ChangeEvent<HTMLInputElement>
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username (try 'admin')"
                />
              </div>
              <div>
                <label htmlFor="password_login_page" className="sr-only">
                  Password
                </label>
                <input
                  id="password_login_page"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)} // ev for onChange is React.ChangeEvent<HTMLInputElement>
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password (try 'password123')"
                />
              </div>
            </div>

            {error && (
              <p className="mt-2 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}