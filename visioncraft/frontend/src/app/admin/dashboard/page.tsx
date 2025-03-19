"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUsers, FaProjectDiagram, FaChartLine, FaBell } from 'react-icons/fa';

const stats = [
  {
    id: 1,
    name: 'Total Users',
    value: '2,345',
    icon: FaUsers,
    change: '+12%',
    changeType: 'increase'
  },
  {
    id: 2,
    name: 'Active Projects',
    value: '45',
    icon: FaProjectDiagram,
    change: '+5%',
    changeType: 'increase'
  },
  {
    id: 3,
    name: 'Revenue',
    value: '$125K',
    icon: FaChartLine,
    change: '+18%',
    changeType: 'increase'
  },
  {
    id: 4,
    name: 'New Inquiries',
    value: '15',
    icon: FaBell,
    change: '+3%',
    changeType: 'increase'
  }
];

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to Orb1 Admin
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-8 w-8 text-[#00F0FF]" />
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: item * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0066FF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  New project created
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  Project {item} has been created by Admin
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item}h ago
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 