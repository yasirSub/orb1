"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope } from 'react-icons/fa';

// Demo worker credentials (in real app, this would be in a database)
const WORKER_CREDENTIALS = [
  {
    email: 'video@orb1.com',
    password: 'video123',
    role: 'video_editor'
  },
  {
    email: 'design@orb1.com',
    password: 'design123',
    role: 'designer'
  }
];

export default function WorkerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const worker = WORKER_CREDENTIALS.find(w => w.email === email);
      
      if (worker && worker.password === password) {
        // Store worker info in localStorage
        localStorage.setItem('workerAuthenticated', 'true');
        localStorage.setItem('workerRole', worker.role);
        localStorage.setItem('workerEmail', worker.email);
        
        // Redirect to worker dashboard
        router.push('/worker/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1E51] to-[#4B0082] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="gradient-border">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg">
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                <h1 className="orb1-logo text-5xl font-bold tracking-wider">
                  Orb1
                </h1>
                <p className="orb1-tagline mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Worker Portal
                </p>
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sign in to your worker account
                </p>
              </div>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-500 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
                      placeholder="Email address"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#00F0FF] to-[#0066FF] hover:from-[#0066FF] hover:to-[#00F0FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00F0FF] ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 