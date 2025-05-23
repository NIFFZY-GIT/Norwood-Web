'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout'; // IMPORT NEW LAYOUT
import { User, UserSession } from '@/lib/types';
import UserListItem from '@/components/dashboard/settings/UserListItem';
import CreateUserModal from '@/components/dashboard/settings/CreateUserModal';
import { PlusCircle, Users, Loader2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation'; // For potential redirect

// Assuming getClientSession is similar to ItemsPage or defined in a shared lib
async function getClientSession(): Promise<UserSession | null> {
  try {
    const res = await fetch('/api/auth/session');
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.userId === 'string' && typeof data.username === 'string') {
        return data as UserSession;
      }
      return null;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch client session:', error);
    return null;
  }
}


export default function SettingsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<UserSession | null | undefined>(undefined);
  const router = useRouter();


  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      const sessionData = await getClientSession();
      setCurrentSession(sessionData);

      // For this "public" user management page, we might not strictly need a session
      // to view users, but creating/deleting would. The original code didn't use session for display.
      // For now, let's assume fetching users is independent of session, but DashboardLayout needs it.
      // If session is required for settings, add router.push('/login') here.

      await fetchUsers(); // Fetch users regardless of session for this example page
      setIsLoading(false); // Set loading to false after users are fetched (or session check fails)
    };
    fetchInitialData();
  }, [router]); // Added router to dependency array as it's used inside useEffect implicitly by fetchInitialData

  const fetchUsers = async () => {
    // setIsLoading(true); // Handled by fetchInitialData
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
    }
    // finally { setIsLoading(false); } // Handled by fetchInitialData
  };

  const handleUserCreated = (newUser: User) => {
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const handleDeleteUser = async (userId: string, username: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }
    setError(null);
    // Optionally, add a specific loading state for delete operation
    // const previousUsers = [...users]; // For optimistic update rollback
    // setUsers(prevUsers => prevUsers.filter(user => user._id !== userId)); // Optimistic update

    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json();
        // If optimistic update: setUsers(previousUsers); // Rollback optimistic update
        throw new Error(errorData.message || `Failed to delete user: ${res.status}`);
      }
      // If not optimistic update, update users state here:
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      alert(`User "${username}" deleted successfully.`); // Or use a toast notification
    } catch (err: unknown) {
      // If optimistic update and error occurred: setUsers(previousUsers); // Ensure rollback
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while deleting the user.");
      }
      console.error("Delete user error:", err);
    }
    // Reset specific loading state if added
  };

  if (currentSession === undefined) {
    return (
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 items-center justify-center">
        <Loader2 className="animate-spin text-sky-500" size={48} />
        <p className="ml-3 text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardLayout session={currentSession}>
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
          <p className="ml-3 text-slate-600 dark:text-slate-400">Loading users...</p>
        </div>
      )}

      {!isLoading && error && (
           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 dark:bg-red-900/30 dark:text-red-300 dark:border-red-600 rounded-md mb-6" role="alert"> {/* Added mb-6 */}
              <div className="flex">
                  <div className="py-1"><ShieldAlert className="h-6 w-6 text-red-500 dark:text-red-400 mr-3" /></div>
                  <div>
                      <p className="font-bold">An Error Occurred</p>
                      <p className="text-sm">{error}</p>
                  </div>
              </div>
          </div>
      )}

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
              currentUserId={currentSession?.userId} // Pass currentUserId if UserListItem needs it
              onDelete={handleDeleteUser}
            />
          ))}
        </ul>
      )}

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </DashboardLayout>
  );
}