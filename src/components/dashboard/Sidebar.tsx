// src/components/dashboard/Sidebar.tsx
'use client';
import Link from 'next/link';
// Removed 'Users' from this import line
import { LayoutDashboard, Package, BarChart3, LogOut, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/items', label: 'My Items', icon: Package },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ username }: { username?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('/api/logout', { method: 'POST' });
    if (res.ok) {
      router.push('/login');
    } else {
      // Handle logout error
      console.error("Logout failed");
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <aside className="w-64 bg-slate-800 text-slate-100 p-6 flex flex-col min-h-screen fixed top-0 left-0">
      <div className="mb-8">
        <Link href="/dashboard" className="text-2xl font-bold text-sky-400 hover:text-sky-300 transition-colors">
          MyDashboard
        </Link>
        {username && <p className="text-sm text-slate-400 mt-1">Welcome, {username}</p>}
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="mb-2">
              <Link
                href={item.href}
                className={`flex items-center space-x-3 p-2 rounded-md hover:bg-slate-700 transition-colors ${
                  pathname === item.href ? 'bg-sky-500 text-white font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-md text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}