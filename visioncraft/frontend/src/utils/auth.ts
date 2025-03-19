// Types
interface UserData {
  name: string;
  email?: string;
  phone?: string;
  role: 'admin' | 'worker' | 'user';
  joinDate: string;
  services: Array<{
    id: string;
    name: string;
    status: 'pending' | 'completed' | 'in-progress';
    date: string;
  }>;
  specialty?: string;
}

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  
  const adminAuth = localStorage.getItem('adminAuthenticated') === 'true';
  const workerAuth = localStorage.getItem('workerAuthenticated') === 'true';
  const userAuth = localStorage.getItem('userAuthenticated') === 'true';
  
  return adminAuth || workerAuth || userAuth;
};

// Get user role
export const getUserRole = () => {
  if (typeof window === 'undefined') return null;
  
  if (localStorage.getItem('adminAuthenticated') === 'true') return 'admin';
  if (localStorage.getItem('workerAuthenticated') === 'true') return 'worker';
  if (localStorage.getItem('userAuthenticated') === 'true') return 'user';
  
  return null;
};

// Get user data
export const getUserData = (): UserData | null => {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Set authentication
export const setAuthentication = (role: 'admin' | 'worker' | 'user', userData: UserData) => {
  if (typeof window === 'undefined') return;
  
  // Clear any existing auth
  clearAuthentication();
  
  // Set new auth
  localStorage.setItem(`${role}Authenticated`, 'true');
  localStorage.setItem('userData', JSON.stringify(userData));
  localStorage.setItem('lastLoginTime', new Date().toISOString());
  
  // Set cookies for middleware
  document.cookie = `authenticated=true; path=/`;
  document.cookie = `userRole=${role}; path=/`;
};

// Clear authentication
export const clearAuthentication = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('adminAuthenticated');
  localStorage.removeItem('workerAuthenticated');
  localStorage.removeItem('userAuthenticated');
  localStorage.removeItem('userData');
  localStorage.removeItem('lastLoginTime');
  
  // Clear cookies
  document.cookie = 'authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}; 