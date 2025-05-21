// src/app/dashboard/settings/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { User } from '@/lib/types'; // UserSession is no longer needed here
import UserListItem from '@/components/dashboard/settings/UserListItem';
import CreateUserModal from '@/components/dashboard/settings/CreateUserModal';
import { PlusCircle, Users, Loader2, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Removed session state and sessionUsername state

  useEffect(() => {
    // Directly fetch users on component mount
    fetchUsers();
  }, []); // Empty dependency array, runs once

  const fetchUsers = async () => {
    setIsLoading(true); // Set loading true at the start of fetch
    setError(null);
    try {
      const res = await fetch('/api/users');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to fetch users: ${res.status}`);
      }
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching users.");
      }
      console.error("Fetch users error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserCreated = (newUser: User) => {
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const handleDeleteUser = async (userId: string, username: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }
    setError(null);
    // Add specific loading for delete operation if needed
    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to delete user: ${res.status}`);
      }
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      alert(`User "${username}" deleted successfully.`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while deleting the user.");
      }
      console.error("Delete user error:", err);
    }
    // Reset specific loading for delete operation if added
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Sidebar username is now undefined, or you can pass a generic placeholder */}
      <Sidebar username={undefined /* Or a placeholder like "Guest" if Sidebar requires it */} />
      <main className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-sky-500 mr-3" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">User Management (Public)</h1>
          </div>
          {/* "Add New User" button is always visible */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors self-start sm:self-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Add New User
          </button>
        </header>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-sky-500" size={48} />
            <p className="ml-3 text-slate-600 dark:text-slate-400">Loading users...</p>
          </div>
        )}

        {/* Display error messages */}
        {!isLoading && error && (
             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 dark:bg-red-900/30 dark:text-red-300 dark:border-red-600 rounded-md" role="alert">
                <div className="flex">
                    <div className="py-1"><ShieldAlert className="h-6 w-6 text-red-500 dark:text-red-400 mr-3" /></div>
                    <div>
                        <p className="font-bold">An Error Occurred</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            </div>
        )}

        {/* Show user list if not loading and no errors */}
        {!isLoading && !error && users.length === 0 && (
          <div className="text-center py-10">
            <Users size={64} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No users found.</h2>
            <p className="text-slate-500 dark:text-slate-400">Click Add New User to create the first one.</p>
          </div>
        )}
        
        {!isLoading && !error && users.length > 0 && (
          <ul role="list" className="space-y-3">
            {users.map((user) => (
              <UserListItem 
                key={user._id} 
                user={user} 
                currentUserId={undefined} // No concept of "current logged in user" for comparison
                onDelete={handleDeleteUser}
              />
            ))}
          </ul>
        )}

        {/* Modal for creating users - always available */}
        <CreateUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUserCreated={handleUserCreated}
        />
      </main>
    </div>
  );
}