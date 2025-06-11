import { getSession } from '@/lib/session';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import { UserSession, Item } from '@/lib/types';
import { Package, Users, BarChartBig, ArrowUpRight } from 'lucide-react';

// Mock function to get stats (can remain the same)
async function getDashboardStats(_userId: string) {
  // ... your existing stats function
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    totalItems: 73,
    siteVisitors: 4821,
    newSignUps: 34,
  };
}

// This page is now MUCH simpler. It only cares about its own content.
export default async function DashboardOverviewPage() {
  // The layout already redirected if no session, but we can get it again
  // here to display user-specific content. Next.js de-duplicates fetches.
  const session = (await getSession()) as UserSession; 

  const stats = await getDashboardStats(session.userId);

  // Notice there is NO <DashboardLayout> wrapper here anymore.
  return (
    <>
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back, {session.username}!</p>
      </header>

      {/* Stats Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300">Total Items</h3>
            <Package className="w-7 h-7 sm:w-8 sm:h-8 text-sky-500" />
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">{stats.totalItems}</p>
          <p className="text-xs sm:text-sm text-green-500 flex items-center mt-1">
            <ArrowUpRight size={14} className="mr-1" /> 5% from last month
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300">Site Visitors (30d)</h3>
            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-500" />
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">{stats.siteVisitors.toLocaleString()}</p>
          <p className="text-xs sm:text-sm text-green-500 flex items-center mt-1">
            <ArrowUpRight size={14} className="mr-1" /> 12% from last month
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300">New Sign-ups (30d)</h3>
            <BarChartBig className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500" />
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">{stats.newSignUps}</p>
          <p className="text-xs sm:text-sm text-red-500 flex items-center mt-1"> Static for now </p>
        </div>
      </section>

      {/* Analytics Chart Section */}
      <section>
        <AnalyticsChart />
      </section>
    </>
  );
}