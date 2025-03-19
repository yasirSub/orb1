"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaPhone, FaClock, FaShoppingBag, FaTools } from 'react-icons/fa';
import Link from 'next/link';

interface UserData {
  email: string;
  phone?: string;
  role: string;
  joinDate?: string;
  services?: Array<{
    name: string;
    status: string;
    date: string;
  }>;
}

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userAuth = localStorage.getItem('userAuthenticated');
    const storedUserData = localStorage.getItem('userData');

    if (!userAuth || !storedUserData) {
      router.push('/login');
      return;
    }

    try {
      const parsedData = JSON.parse(storedUserData);
      // In a real app, you would fetch this data from an API
      setUserData({
        ...parsedData,
        joinDate: new Date().toLocaleDateString(),
        services: [
          {
            name: "Website Development",
            status: "In Progress",
            date: "2024-03-15"
          },
          {
            name: "Logo Design",
            status: "Completed",
            date: "2024-02-28"
          }
        ]
      });
    } catch (error) {
      console.error('Error parsing user data:', error);
    }

    setLoading(false);
  }, [router]);

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <FaUser className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {userData.email}
              </h1>
              <p className={`text-sm ${
                userData.role === 'worker' ? 'text-yellow-500' : 'text-primary'
              }`}>
                {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
              </p>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">{userData.email}</span>
              </div>
              {userData.phone && (
                <div className="flex items-center">
                  <FaPhone className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">{userData.phone}</span>
                </div>
              )}
              <div className="flex items-center">
                <FaClock className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Joined {userData.joinDate}</span>
              </div>
            </div>
          </div>

          {userData.role === 'user' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Service History
              </h2>
              {userData.services && userData.services.length > 0 ? (
                <div className="space-y-4">
                  {userData.services.map((service, index) => (
                    <div key={index} className="flex items-start">
                      <FaShoppingBag className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {service.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Status: {service.status}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(service.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No services purchased yet.</p>
              )}
            </div>
          )}

          {userData.role === 'worker' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Worker Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaTools className="w-5 h-5 text-yellow-400 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">Active Worker</span>
                </div>
                <Link 
                  href="/worker/dashboard"
                  className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md transition-colors"
                >
                  Go to Worker Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 