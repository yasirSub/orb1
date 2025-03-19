"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaCalendar, FaComments, FaFileAlt } from 'react-icons/fa';

interface UserData {
  email: string;
  role: string;
  joinDate?: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const userAuth = localStorage.getItem('userAuthenticated');
    const storedUserData = localStorage.getItem('userData');

    if (!userAuth || !storedUserData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData({
        ...parsedUserData,
        joinDate: new Date().toLocaleDateString() // In a real app, this would come from the backend
      });
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }
  }, [router]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your projects and communications all in one place.
          </p>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <FaUser className="text-primary w-8 h-8" />
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {userData.role}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <FaEnvelope className="text-primary w-8 h-8" />
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {userData.email}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <FaCalendar className="text-primary w-8 h-8" />
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Join Date</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {userData.joinDate}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <FaComments className="text-primary w-8 h-8" />
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Messages</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  0 New
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <FaFileAlt className="text-primary w-5 h-5 mt-1" />
              <div className="ml-4">
                <p className="text-gray-900 dark:text-white">Account Created</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome to Orb1! Your account has been successfully created.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 