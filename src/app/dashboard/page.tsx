'use server'; // This line is not needed here since this is a server component
// src/app/dashboard/page.tsx
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar'; // Ensure correct casing
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
// import { Package, Users, BarChartBig, ArrowUpRight } from 'lucide-react'; 
import { UserSession, Item } from '@/lib/types'; // Import Item if displaying items
// Import components if you use them here
// import ItemCard from '@/components/dashboard/ItemCard'; 
// import AddItemModal from '@/components/dashboard/AddItemModal';
// import { useState } from 'react'; // If managing modal state here

// Mock function to get stats
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getDashboardStats(_userId: string) { 
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    totalItems: Math.floor(Math.random() * 100), 
    siteVisitors: Math.floor(Math.random() * 5000) + 1000,
    newSignups: Math.floor(Math.random() * 50),
  };
}

// (Optional) Mock function if you want to display some recent items on overview
async function getRecentItems(userId: string): Promise<Item[]> {
    // In a real app, fetch a few recent items
    console.log("Fetching recent items for overview for user:", userId); // Use userId
    await new Promise(resolve => setTimeout(resolve, 200));
    // return some mock items if needed for display, or an empty array
    return [
        // { _id: 'mock1', name: 'Recent Item 1', description: 'Desc 1', itemCode: 'R001', userId, createdAt: new Date(), imageBase64: 'your_mock_base64_or_placeholder_url_logic' },
        // { _id: 'mock2', name: 'Recent Item 2', description: 'Desc 2', itemCode: 'R002', userId, createdAt: new Date(), imageBase64: 'your_mock_base64_or_placeholder_url_logic' },
    ];
}


export default async function DashboardOverviewPage() {
  const session = await getSession() as UserSession | null;

  if (!session?.userId) {
    redirect('/login');
  }

  // const stats = await getDashboardStats(session.userId);
  const recentItems = await getRecentItems(session.userId); // Optional: fetch recent items

  // If you want an "Add Item" button on the overview page, you'll need state for its modal
  // This would typically make the overview page a client component or have a client sub-component
  // For simplicity, let's assume the overview page DOES NOT have its own AddItemModal for now.
  // If it does, the modal state management would be similar to items/page.tsx.

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar username={session.username} />
      <main className="flex-1 p-6 md:p-8 ml-64"> 
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-600 dark:text-slate-400">Welcome back, {session.username}!</p>
        </header>

        {/* Stats Cards (Same as before) */}
        {/* <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* ... Stat cards ... */}{/*
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Total Items</h3>
              <Package className="w-8 h-8 text-sky-500" />
            </div>
            <p className="text-4xl font-bold text-slate-800 dark:text-white">{stats.totalItems}</p>
            <p className="text-sm text-green-500 flex items-center mt-1">
              <ArrowUpRight size={16} className="mr-1" /> 5% from last month
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Site Visitors (30d)</h3>
              <Users className="w-8 h-8 text-indigo-500" /> 
            </div>
            <p className="text-4xl font-bold text-slate-800 dark:text-white">{stats.siteVisitors.toLocaleString()}</p>
            <p className="text-sm text-green-500 flex items-center mt-1">
              <ArrowUpRight size={16} className="mr-1" /> 12% from last month
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">New Signups (30d)</h3>
              <BarChartBig className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-4xl font-bold text-slate-800 dark:text-white">{stats.newSignups}</p>
            <p className="text-sm text-red-500 flex items-center mt-1"> Static for now </p>
          </div>
        </section> */}

        {/* Optional: Display recent items */}
        {recentItems.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Recent Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 
                If you display ItemCards here, they need onEdit and onDelete.
                For an overview page, these might be no-op functions or link to the items page.
              */}
              {/* {recentItems.map((item) => (
                <ItemCard 
                  key={item._id} 
                  item={item} 
                  onEdit={() => console.log('Edit clicked on overview for item:', item._id)} 
                  onDelete={() => console.log('Delete clicked on overview for item:', item._id)} 
                />
              ))} */}
              <p className="text-slate-600 dark:text-slate-400">Recent items display coming soon...</p>
            </div>
          </section>
        )}

        {/* Charts Section */}
        <section>
          <AnalyticsChart />
        </section>

        {/* 
          If you had an AddItemModal here (line 123 of your error), it would be:
          This typically requires making this page a client component for state management (isModalOpen, editingItem)
          or extracting the modal logic into its own client component.
        */}
        {/* 
        const [isModalOpen, setIsModalOpen] = useState(false); // Needs 'use client'
        const [editingItem, setEditingItem] = useState<Item | null>(null); // Needs 'use client'
        // ... plus handler functions ...
        {isModalOpen && (
          <AddItemModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onItemSaved={(item, isEditing) => console.log('Item saved on overview:', item, isEditing)} // Dummy handler
            editingItem={editingItem}
          />
        )} 
        */}
      </main>
    </div>
  );
}