// src/app/dashboard/items/page.tsx
'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Item, UserSession } from '@/lib/types';
import ItemCard from '@/components/dashboard/ItemCard';
import AddItemModal from '@/components/dashboard/AddItemModal';
import { PlusCircle, Loader2, Package as PackageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

async function getClientSession(): Promise<UserSession | null> {
  try {
    const res = await fetch('/api/auth/session');
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.userId === 'string' && typeof data.username === 'string') {
        return data as UserSession;
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch client session:', error);
    return null;
  }
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [currentSession, setCurrentSession] = useState<UserSession | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);

      // Load session
      const sessionData = await getClientSession();
      setCurrentSession(sessionData);
      // Optionally redirect if no session:
      // if (!sessionData) return router.push('/login');

      // Load items
      try {
        const res = await fetch('/api/items');
        if (!res.ok) {
          const errorData = (await res.json()) as { message?: string };
          throw new Error(errorData.message || `Failed to fetch items: ${res.status}`);
        }
        const data = (await res.json()) as Item[];
        setItems(
          data.map(item => ({
            ...item,
            createdAt: new Date(item.createdAt),
          }))
        );
      } catch (err: unknown) {
        console.error('Fetch items error:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error while fetching items');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [router]);

  const handleOpenModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = (await res.json()) as { message?: string };
        throw new Error(errorData.message || `Delete failed: ${res.status}`);
      }
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err: unknown) {
      console.error('Delete item error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error while deleting item');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaved = (saved: Item, isEdit: boolean) => {
    const itemWithDate = { ...saved, createdAt: new Date(saved.createdAt) };
    setItems(prev =>
      isEdit
        ? prev.map(i => (i._id === itemWithDate._id ? itemWithDate : i))
        : [itemWithDate, ...prev]
    );
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Wait for session check
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
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
          <PackageIcon className="w-7 h-7 text-sky-500 mr-2" />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
            My Items
          </h1>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors"
        >
          <PlusCircle size={20} className="mr-2" />
          Add New Item
        </button>
      </header>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-sky-500" size={48} />
          <p className="ml-3 text-slate-600 dark:text-slate-400">Loading items...</p>
        </div>
      )}

      {!isLoading && error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 dark:bg-red-900/30 dark:text-red-300 dark:border-red-600 rounded-md mb-6"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && items.length === 0 && (
        <div className="text-center py-10">
          <PackageIcon size={64} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
            No items yet!
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Click “Add New Item” to get started.
          </p>
        </div>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <ItemCard
              key={item._id}
              item={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      )}

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onItemSaved={handleSaved}
        editingItem={editingItem}
      />
    </DashboardLayout>
  );
}
