// src/components/dashboard/AnalyticsChart.tsx
'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Jan', visitors: 400, pageViews: 2400 },
  { name: 'Feb', visitors: 300, pageViews: 1398 },
  { name: 'Mar', visitors: 600, pageViews: 9800 },
  { name: 'Apr', visitors: 278, pageViews: 3908 },
  { name: 'May', visitors: 589, pageViews: 4800 },
  { name: 'Jun', visitors: 390, pageViews: 3800 },
  { name: 'Jul', visitors: 649, pageViews: 4300 },
];

export default function AnalyticsChart() {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg h-96">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Visitor Trends (Mock Data)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockData}
          margin={{
            top: 5,
            right: 20, // Adjusted for better label visibility
            left: 0,  // Adjusted for better label visibility
            bottom: 20, // Space for X-axis labels
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} className="dark:stroke-slate-700 stroke-slate-300" />
          <XAxis dataKey="name" tick={{ fill: 'currentColor' }} className="text-xs text-slate-600 dark:text-slate-400" />
          <YAxis tick={{ fill: 'currentColor' }} className="text-xs text-slate-600 dark:text-slate-400" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(var(--background-rgb), 0.9)', // Use CSS vars for dark/light
              borderColor: 'rgba(var(--foreground-rgb), 0.2)',
              borderRadius: '0.5rem',
              color: 'rgb(var(--foreground-rgb))'
            }}
            labelStyle={{ fontWeight: 'bold', color: 'rgb(var(--foreground-rgb))' }}
          />
          <Legend wrapperStyle={{ color: 'currentColor', paddingTop: '10px' }} />
          <Line type="monotone" dataKey="visitors" stroke="#38bdf8" strokeWidth={2} activeDot={{ r: 6 }} name="Unique Visitors"/>
          <Line type="monotone" dataKey="pageViews" stroke="#818cf8" strokeWidth={2} activeDot={{ r: 6 }} name="Page Views"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
// Add to global.css or similar:
// :root {
//   --background-rgb: 255, 255, 255;
//   --foreground-rgb: 15, 23, 42; /* slate-900 */
// }
// .dark {
//   --background-rgb: 15, 23, 42; /* slate-900 */
//   --foreground-rgb: 248, 250, 252; /* slate-50 */
// }