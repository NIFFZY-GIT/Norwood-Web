// src/app/dashboard/items/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import AddItemModal from '@/components/dashboard/AddItemModal';
import ItemCard from '@/components/dashboard/ItemCard';
import { Item, UserSession } from '@/lib/types';
import { PlusCircle, Loader2, Package } from 'lucide-react'; 

async function getClientSession(): Promise<UserSession | null> {
    try {
        const res = await fetch('/api/auth/session'); 
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data.userId === 'string' && typeof data.username === 'string') {
                return data as UserSession;
            }
            console.warn('Received unexpected session data structure:', data);
            return null;
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch client session:', error);
        return null;
    }
}

export default function ItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true); // General loading for page
  const [isDeleting, setIsDeleting] = useState(false); // Specific loading for delete operation
  const [error, setError] = useState<string | null>(null);
  const [sessionUsername, setSessionUsername] = useState<string | undefined>(undefined);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    // ... (fetchUser and fetchItems remain the same, ensure fetchItems sets general setIsLoading)
    const fetchUser = async () => {
        const sessionData = await getClientSession();
        if (sessionData) {
            setSessionUsername(sessionData.username);
        }
    };
    fetchUser();

    const fetchItems = async () => {
      setIsLoading(true); // For initial page load
      setError(null);
      try {
        const res = await fetch('/api/items');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `Failed to fetch items: ${res.status}`);
        }
        let data: Item[] = await res.json();
        data = data.map(item => ({
            ...item,
            createdAt: new Date(item.createdAt) 
        }));
        setItems(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred while fetching items.');
        }
        console.error(err);
      } finally {
        setIsLoading(false); // For initial page load
      }
    };
    fetchItems();
  }, []);

  const handleOpenAddItemModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (itemToEdit: Item) => {
    setEditingItem(itemToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    setError(null);
    setIsDeleting(true); // Indicate deletion is in progress

    try {
      const res = await fetch(`/api/items/${itemId}`, { method: 'DELETE' });

      if (!res.ok) {
        let errorMessage = `Failed to delete item. Status: ${res.status}`;
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          try {
            const errorData = await res.json();
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            // If it claims to be JSON but isn't, log the original text
            const errorText = await res.text();
            console.error("Failed to parse JSON error response. Raw response:", errorText, jsonError);
            errorMessage = `Failed to parse error (Status: ${res.status}). Please check console.`;
          }
        } else {
          // If not JSON, it's likely HTML or plain text
          const errorText = await res.text();
          console.error("Non-JSON error response from server:", errorText);
          // You might want to display a generic error or part of errorText if it's short and meaningful
          errorMessage = `Server returned an unexpected response (Status: ${res.status}). Check console for details.`;
        }
        throw new Error(errorMessage);
      }

      // If DELETE is successful, our API returns JSON: { message: 'Item deleted successfully' }
      // If your API returned 204 No Content, you would skip .json()
      const successData = await res.json(); 
      console.log(successData.message); // Or use a success toast

      setItems(prevItems => prevItems.filter(item => item._id !== itemId));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while deleting the item.');
      }
      console.error("Error during item deletion:",err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleItemSaved = (savedItem: Item, isEditingOp: boolean) => {
    // Ensure createdAt is a Date object if it's coming back as string
    const itemWithDate = {
        ...savedItem,
        createdAt: new Date(savedItem.createdAt)
    };

    if (isEditingOp) {
      setItems(prevItems => prevItems.map(item => (item._id === itemWithDate._id ? itemWithDate : item)));
    } else {
      setItems(prevItems => [itemWithDate, ...prevItems]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar username={sessionUsername} />
      <main className="flex-1 p-6 md:p-8 ml-0 md:ml-64"> {/* Adjusted ml for mobile */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">My Items</h1>
          <button
            onClick={handleOpenAddItemModal}
            disabled={isDeleting} // Disable while deleting
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors disabled:opacity-50"
          >
            <PlusCircle size={20} className="mr-2" />
            Add New Item
          </button>
        </header>

        {isLoading && ( // This is for the initial page load
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-sky-500" size={48} />
            <p className="ml-3 text-slate-600 dark:text-slate-400">Loading items...</p>
          </div>
        )}

        {isDeleting && ( // Specific loading indicator for delete operations
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
                <Loader2 className="animate-spin text-white" size={64} />
                <p className="ml-4 text-white text-xl">Deleting item...</p>
            </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold mr-1">Error:</strong>
            <span className="block sm:inline">{error}</span>
            <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-700 dark:text-red-300">
                <span className="text-2xl leading-none">×</span>
            </button>
          </div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="text-center py-10">
            <Package size={64} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No items yet!</h2>
            <p className="text-slate-500 dark:text-slate-400">Click Add New Item to get started.</p>
          </div>
        )}
        
        {!isLoading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard 
                key={item._id} 
                item={item} 
                onEdit={handleEditItem}
                onDelete={handleDeleteItem} // No direct check for isDeleting here, button inside ItemCard can be disabled
              />
            ))}
          </div>
        )}

        <AddItemModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onItemSaved={handleItemSaved}
          editingItem={editingItem}
        />
      </main>
    </div>
  );
}