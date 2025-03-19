export default function Home() {
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to{' '}
        <span className="bg-gradient-to-r from-[#00F0FF] to-[#0066FF] bg-clip-text text-transparent">
          Orb1
        </span>
      </h1>
      <p className="text-center text-lg mb-8">
        Your one-stop platform for service management
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">For Users</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Find and book services easily. Track your orders and manage your appointments.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">For Workers</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your services, track orders, and grow your business with our platform.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">For Admins</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Oversee operations, manage users, and ensure smooth service delivery.
          </p>
        </div>
      </div>
    </div>
  );
}