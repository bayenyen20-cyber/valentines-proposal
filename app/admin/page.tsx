'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Response {
  _id: string;
  userName: string;
  userEmail: string;
  answer: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);

  // Check if admin already logged in from /auth page
  useEffect(() => {
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const storedEmail = sessionStorage.getItem('adminEmail');
    const storedPassword = sessionStorage.getItem('adminPassword');

    if (adminLoggedIn === 'true' && storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      // Automatically login with stored credentials
      loginWithCredentials(storedEmail, storedPassword);
    }
  }, []);

  const loginWithCredentials = async (emailToUse: string, passwordToUse: string) => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToUse, password: passwordToUse }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        setDashboardData(data.data);
      } else {
        setError(data.message || 'Invalid credentials');
        // Clear invalid session
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminEmail');
        sessionStorage.removeItem('adminPassword');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      sessionStorage.removeItem('adminLoggedIn');
      sessionStorage.removeItem('adminEmail');
      sessionStorage.removeItem('adminPassword');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store session for future visits
        sessionStorage.setItem('adminEmail', email);
        sessionStorage.setItem('adminPassword', password);
        sessionStorage.setItem('adminLoggedIn', 'true');
        setIsLoggedIn(true);
        setDashboardData(data.data);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminPassword');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setDashboardData(null);
    setError('');
    // Redirect to auth page
    window.location.href = '/auth';
  };

  const refreshData = async () => {
    if (!isLoggedIn) return;

    setRefreshLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      } else {
        setError('Failed to refresh data');
      }
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Failed to refresh data');
    } finally {
      setRefreshLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(refreshData, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">View all Valentine's responses</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                💖 Valentine's Dashboard
              </h1>
              <p className="text-gray-600">Real-time response monitoring</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={refreshData}
                disabled={refreshLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {refreshLoading ? '⏳ Refreshing...' : '🔄 Refresh'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          {/* Statistics */}
          {dashboardData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-2xl font-bold">
                  {dashboardData.stats.totalUsers}
                </div>
                <div className="text-blue-100">Total Users</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="text-4xl mb-2">💚</div>
                <div className="text-2xl font-bold">
                  {dashboardData.stats.yesCount}
                </div>
                <div className="text-green-100">Said YES!</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-2xl font-bold">
                  {dashboardData.stats.totalResponses}
                </div>
                <div className="text-purple-100">Total Responses</div>
              </div>
            </div>
          )}

          {/* Responses Table */}
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Responses
            </h2>
            {dashboardData && dashboardData.responses.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Answer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.responses.map((response: Response) => (
                    <motion.tr
                      key={response._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {response.userName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{response.userEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {response.answer === 'yes' ? (
                          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            💚 YES
                          </span>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            ❌ No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(response.timestamp).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📭</div>
                <p>No responses yet. Share the link with your valentine!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
