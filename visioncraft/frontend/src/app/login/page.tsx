"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaEnvelope, 
  FaPhone, 
  FaLock, 
  FaUserCircle, 
  FaTools, 
  FaUserShield,
  FaSpinner 
} from 'react-icons/fa';

interface UserData {
  name: string;
  emailOrPhone: string;
  password: string;
  email: string;
  phone: string;
  role: string;
  joinDate: string;
  services: Array<{
    id: string;
    name: string;
    status: 'pending' | 'completed' | 'in-progress';
    date: string;
  }>;
}

type UserRole = 'user' | 'worker' | 'admin';

export default function Login() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      const adminAuth = localStorage.getItem('adminAuthenticated');
      const workerAuth = localStorage.getItem('workerAuthenticated');
      const userAuth = localStorage.getItem('userAuthenticated');

      if (adminAuth === 'true') {
        router.push('/admin/dashboard');
      } else if (workerAuth === 'true') {
        router.push('/worker/dashboard');
      } else if (userAuth === 'true') {
        router.push('/dashboard');
      }
    };

    checkAuthStatus();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (selectedRole === 'admin') {
        // Admin login (using hardcoded credentials for demo)
        if (formData.emailOrPhone === 'admin@orb1.com' && formData.password === 'admin123') {
          localStorage.setItem('adminAuthenticated', 'true');
          localStorage.setItem('userData', JSON.stringify({
            name: 'Admin',
            email: 'admin@orb1.com',
            role: 'admin',
            joinDate: new Date().toISOString(),
            services: []
          }));
          router.push('/admin/dashboard');
          return;
        } else {
          setError('Invalid admin credentials');
          setLoading(false);
          return;
        }
      }

      // Get registered users for worker and regular user login
      const registeredUsers: UserData[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      // Find user with matching credentials and role
      const user = registeredUsers.find(u => 
        u.emailOrPhone === formData.emailOrPhone && 
        u.password === formData.password &&
        u.role === selectedRole
      );

      if (!user) {
        setError(`Invalid ${selectedRole} credentials`);
        setLoading(false);
        return;
      }

      // Set appropriate authentication flag and user data
      if (selectedRole === 'worker') {
        localStorage.setItem('workerAuthenticated', 'true');
      } else {
        localStorage.setItem('userAuthenticated', 'true');
      }

      // Store user data in localStorage for persistent session
      localStorage.setItem('userData', JSON.stringify({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        joinDate: user.joinDate,
        services: user.services
      }));

      // Store last login timestamp
      localStorage.setItem('lastLoginTime', new Date().toISOString());

      // Redirect to appropriate dashboard
      router.push(selectedRole === 'worker' ? '/worker/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link href="/signup" className="font-medium text-primary hover:text-primary-dark">
              create a new account
            </Link>
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <button
            onClick={() => setSelectedRole('user')}
            className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all transform hover:scale-105 ${
              selectedRole === 'user'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            type="button"
          >
            <FaUserCircle className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">User</span>
          </button>

          <button
            onClick={() => setSelectedRole('worker')}
            className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all transform hover:scale-105 ${
              selectedRole === 'worker'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            type="button"
          >
            <FaTools className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Worker</span>
          </button>

          <button
            onClick={() => setSelectedRole('admin')}
            className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all transform hover:scale-105 ${
              selectedRole === 'admin'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            type="button"
          >
            <FaUserShield className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Admin</span>
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 text-red-500 dark:text-red-200 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="emailOrPhone" className="sr-only">
                Email or Phone number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {formData.emailOrPhone.includes('@') ? (
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  id="emailOrPhone"
                  name="emailOrPhone"
                  type="text"
                  autoComplete="email tel"
                  required
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                  placeholder={selectedRole === 'admin' ? 'admin@orb1.com' : 'Email or Phone number'}
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                  placeholder={selectedRole === 'admin' ? '••••••••' : 'Password'}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <FaSpinner className="animate-spin h-5 w-5" />
              ) : (
                `Sign in as ${selectedRole}`
              )}
            </button>
          </div>

          {selectedRole !== 'admin' && (
            <div className="text-center">
              <Link
                href={selectedRole === 'worker' ? '/worker/signup' : '/signup'}
                className="text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Don&apos;t have a {selectedRole} account? Sign up here
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 