// src/app/dashboard/page.tsx
// This line is not needed here since this is a server component
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import { UserSession, Item } from '@/lib/types';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Package, Users, BarChartBig, ArrowUpRight } from 'lucide-react'; // Uncommented icons
// import ItemCard from '@/components/dashboard/ItemCard'; // If displaying items

// Mock function to get stats
async function getDashboardStats(_userId: string) {
  console.log('Fetching stats for user:', _userId); // Use _userId to satisfy linter
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    totalItems: Math.floor(Math.random() * 100),
    siteVisitors: Math.floor(Math.random() * 5000) + 1000,
    newSignUps: Math.floor(Math.random() * 50), // Changed to newSignUps
  };
}

async function getRecentItems(userId: string): Promise<Item[]> {
  console.log("Fetching recent items for overview for user:", userId);
  await new Promise(resolve => setTimeout(resolve, 200));
  return [
    // Mock items if needed
  ];
}

export default async function DashboardOverviewPage() {
  const session = await getSession() as UserSession | null;

  if (!session?.userId) {
    redirect('/login');
  }

  const stats = await getDashboardStats(session.userId); // Uncommented
  const recentItems = await getRecentItems(session.userId);

  return (
    <DashboardLayout session={session}>
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back, {session.username}!</p>
      </header>

      {/* Stats Cards (Example - uncommented and ensured responsive grid) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300">Total Items</h3>
            <Package className="w-7 h-7 sm:w-8 sm:h-8 text-sky-500" />
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">{stats.totalItems}</p>
          <p className="text-xs sm:text-sm text-green-500 flex items-center mt-1">
            <ArrowUpRight size={14} /* sm:size={16} // Adjusted size for consistency with other cards if needed */ className="mr-1" /> 5% from last month
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300">Site Visitors (30d)</h3>
            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-500" />
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">{stats.siteVisitors.toLocaleString()}</p>
          <p className="text-xs sm:text-sm text-green-500 flex items-center mt-1">
            <ArrowUpRight size={14} /* sm:size={16} */ className="mr-1" /> 12% from last month
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300">New Sign-ups (30d)</h3> {/* Changed Signups to Sign-ups */}
            <BarChartBig className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500" />
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">{stats.newSignUps}</p> {/* Changed to stats.newSignUps */}
          <p className="text-xs sm:text-sm text-red-500 flex items-center mt-1"> Static for now </p>
        </div>
      </section>


      {recentItems.length > 0 && (
        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Recent Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* {recentItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onEdit={() => console.log('Edit clicked on overview for item:', item._id)}
                onDelete={() => console.log('Delete clicked on overview for item:', item._id)}
              />
            ))} */}
            <p className="text-slate-600 dark:text-slate-400 col-span-full">Recent items display coming soon...</p>
          </div>
        </section>
      )}

      <section>
        <AnalyticsChart />
      </section>
    </DashboardLayout>
  );
}