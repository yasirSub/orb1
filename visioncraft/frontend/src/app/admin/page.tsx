"use client";

import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaTasks, 
  FaChartLine, 
  FaEnvelope,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle
} from 'react-icons/fa';

const stats = [
  {
    icon: FaUsers,
    label: 'Total Users',
    value: '2,845',
    change: '+12.5%',
    color: 'bg-blue-500'
  },
  {
    icon: FaTasks,
    label: 'Active Projects',
    value: '24',
    change: '+4.2%',
    color: 'bg-green-500'
  },
  {
    icon: FaChartLine,
    label: 'Revenue',
    value: '$48,290',
    change: '+18.3%',
    color: 'bg-purple-500'
  },
  {
    icon: FaEnvelope,
    label: 'New Inquiries',
    value: '156',
    change: '+8.1%',
    color: 'bg-orange-500'
  }
];

const recentProjects = [
  {
    name: 'E-commerce Website',
    client: 'Fashion Boutique',
    status: 'In Progress',
    progress: 75,
    dueDate: '2024-04-15'
  },
  {
    name: 'Mobile App Development',
    client: 'Tech Startup',
    status: 'Completed',
    progress: 100,
    dueDate: '2024-03-30'
  },
  {
    name: 'Brand Redesign',
    client: 'Marketing Agency',
    status: 'On Hold',
    progress: 35,
    dueDate: '2024-05-01'
  }
];

const recentActivities = [
  {
    type: 'Project',
    action: 'completed',
    subject: 'Website Redesign',
    timestamp: '2 hours ago',
    icon: FaCheckCircle,
    color: 'text-green-500'
  },
  {
    type: 'Task',
    action: 'updated',
    subject: 'Mobile App UI Design',
    timestamp: '4 hours ago',
    icon: FaClock,
    color: 'text-blue-500'
  },
  {
    type: 'Issue',
    action: 'reported',
    subject: 'Server Performance',
    timestamp: '6 hours ago',
    icon: FaExclamationCircle,
    color: 'text-red-500'
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back, Admin!</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-500 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Projects and Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Projects</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {recentProjects.map((project) => (
                <div key={project.name} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{project.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {project.status}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Due {project.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.subject} className="flex items-start space-x-4">
                  <activity.icon className={`w-5 h-5 mt-1 ${activity.color}`} />
                  <div>
                    <p className="text-gray-800 dark:text-white">
                      <span className="font-medium">{activity.type}</span> {activity.action}: {activity.subject}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 