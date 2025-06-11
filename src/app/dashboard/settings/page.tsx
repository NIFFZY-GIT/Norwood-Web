'use client';

import { useState, useEffect } from 'react';
import { getSession } from '@/lib/session'; // We'll create a client-side version of this
import { User, UserSession } from '@/lib/types';
import UserListItem from '@/components/dashboard/settings/UserListItem';
import CreateUserModal from '@/components/dashboard/settings/CreateUserModal';
import { PlusCircle, Users, Loader2, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // The session is now managed by the layout, but we might need the ID here.
  const [currentSession, setCurrentSession] = useState<UserSession | null>(null);

  useEffect(() => {
    // A simple function to get session data on the client if needed
    const fetchClientSession = async () => {
        const res = await fetch('/api/auth/session'); // Assuming you have such an endpoint
        if (res.ok) {
            const data = await res.json();
            setCurrentSession(data);
        }
    };

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/users');
            if (!res.ok) throw new Error('Failed to fetch users');
            const data = await res.json();
            setUsers(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchClientSession();
    fetchUsers();
  }, []);


  const handleUserCreated = (newUser: User) => {
    setUsers(prevUsers => [newUser, ...prevUsers]);
    setIsModalOpen(false); // Close modal on success
  };

  const handleDeleteUser = async (userId: string, username: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;

    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // The main layout already shows a loader if the session is loading.
  // We only need to show a loader here for this page's specific data.
  
  // Notice: No <DashboardLayout> wrapper here!
  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <div className="flex items-center">
          <Users className="w-7 h-7 sm:w-8 sm:h-8 text-sky-500 mr-2 sm:mr-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">User Management</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg flex items-center transition-colors self-start sm:self-center"
        >
          <PlusCircle size={20} className="mr-1 sm:mr-2" />
           <span className="hidden sm:inline">Add New User</span>
           <span className="sm:hidden text-sm">Add User</span>
        </button>
      </header>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-sky-500" size={48} />
        </div>
      )}

      {error && (
           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 dark:bg-red-900/30 dark:text-red-300 dark:border-red-600 rounded-md mb-6" role="alert">
              <div className="flex">
                  <div className="py-1"><ShieldAlert className="h-6 w-6 text-red-500 dark:text-red-400 mr-3" /></div>
                  <div>
                      <p className="font-bold">An Error Occurred</p>
                      <p className="text-sm">{error}</p>
                  </div>
              </div>
          </div>
      )}

      {!isLoading && !error && (
        <div className="space-y-3">
          {users.length > 0 ? (
            users.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                currentUserId={currentSession?.userId}
                onDelete={handleDeleteUser}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <Users size={64} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No users found.</h2>
            </div>
          )}
        </div>
      )}

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </>
  );
}