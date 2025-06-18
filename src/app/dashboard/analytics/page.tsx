import { getAnalyticsData } from '@/lib/data';
import { Users, Package, Briefcase, FileText, CalendarDays } from 'lucide-react';
import ActivityChart from '@/components/dashboard/ActivityChart';

// Helper to format dates nicely
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// This page is a Server Component, so we can fetch data directly
export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <>
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Site Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">An overview of key metrics and recent activity.</p>
      </header>

      {/* KPI Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
          <Users className="w-8 h-8 text-indigo-500 mb-2" />
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">Total Users</h3>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{data.totalUsers}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
          <Package className="w-8 h-8 text-sky-500 mb-2" />
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">Total Items</h3>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{data.totalItems}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
          <Briefcase className="w-8 h-8 text-emerald-500 mb-2" />
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">Total Vacancies</h3>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{data.totalVacancies}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
          <FileText className="w-8 h-8 text-amber-500 mb-2" />
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">Applications</h3>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{data.totalApplications}</p>
        </div>
      </section>

      {/* Activity Chart Section */}
      <section className="mb-6 sm:mb-8">
        <ActivityChart data={data.activityLast7Days} />
      </section>

      {/* Recent Activity Lists Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Recent User Sign-ups</h3>
          <ul className="space-y-4">
            {data.recentUsers.map(user => (
              <li key={user._id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{user.username}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>{formatDate(user.createdAt)}</span>
                </div>
              </li>
            ))}
            {data.recentUsers.length === 0 && <p className="text-slate-500 dark:text-slate-400">No recent users.</p>}
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Recently Added Items</h3>
          <ul className="space-y-4">
            {data.recentItems.map(item => (
              <li key={item._id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{item.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Code: {item.itemCode}</p>
                </div>
                 <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </li>
            ))}
            {data.recentItems.length === 0 && <p className="text-slate-500 dark:text-slate-400">No recent items.</p>}
          </ul>
        </div>
      </section>
    </>
  );
}