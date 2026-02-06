'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [mode, setMode] = useState<'signup' | 'login' | 'admin'>('login'); // 'signup', 'login', or 'admin'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Clear any old auth tokens on mount
  useEffect(() => {
    // This doesn't actually clear the httpOnly cookie, but it helps with client-side state
    console.log('[Auth Page] Mounted, checking for redirect loop');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      let endpoint = '';
      let body: any = {};

      if (mode === 'admin') {
        // Admin login
        endpoint = '/api/admin/dashboard';
        body = { email: adminEmail, password: adminPassword };
        console.log('[Auth] Admin login attempt');
      } else if (mode === 'login') {
        // User login
        endpoint = '/api/auth/login';
        body = { email: formData.email, password: formData.password };
        console.log('[Auth] User login attempt');
      } else {
        // User signup
        endpoint = '/api/auth/signup';
        body = formData;
        console.log('[Auth] User signup attempt');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('[Auth] Response:', data);

      if (data.success) {
        if (mode === 'admin') {
          // Admin login successful
          const successMsg = '✓ Admin login successful!';
          setSuccess(successMsg);
          console.log('[Auth] Admin authenticated');
          // Store admin session in sessionStorage for /admin page to use
          sessionStorage.setItem('adminEmail', adminEmail);
          sessionStorage.setItem('adminPassword', adminPassword);
          sessionStorage.setItem('adminLoggedIn', 'true');
          setTimeout(() => {
            window.location.href = '/admin';
          }, 1500);
        } else if (mode === 'login') {
          // User login successful
          const successMsg = '✓ Login successful!';
          setSuccess(successMsg);
          console.log('[Auth] User authenticated');
        } else {
          // User signup successful
          const successMsg = 'Account created successfully! Now please log in.';
          setSuccess(successMsg);
          console.log('[Auth] Account created, switching to login');
          setTimeout(() => {
            setFormData({ name: '', email: formData.email, password: '' });
            setMode('login');
            setSuccess('');
            setLoading(false);
          }, 2000);
          return;
        }
      } else {
        console.log(`[Auth] Error: ${data.message}`);
        setError(data.message || 'An error occurred');
        setLoading(false);
      }
    } catch (err) {
      console.error('[Auth] Fetch error:', err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-red-100" />

      {/* Floating hearts */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          💕
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-4 sm:mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 glow-box">
          {/* Mode Selector Tabs */}
          <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
            <button
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-3 px-4 font-semibold text-sm sm:text-base border-b-4 transition-colors ${
                mode === 'login'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              💕 Login
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-3 px-4 font-semibold text-sm sm:text-base border-b-4 transition-colors ${
                mode === 'signup'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              ✨ Sign Up
            </button>
            <button
              onClick={() => {
                setMode('admin');
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-3 px-4 font-semibold text-sm sm:text-base border-b-4 transition-colors ${
                mode === 'admin'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              👨‍💼 Admin
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-5xl sm:text-6xl mb-3 sm:mb-4"
            >
              {mode === 'admin' ? '🔐' : '💖'}
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-rose-600 font-[var(--font-dancing)] mb-1 sm:mb-2">
              {mode === 'login' && 'Hi Mylove!'}
              {mode === 'signup' && 'Create Your Account'}
              {mode === 'admin' && 'Admin Login'}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {mode === 'login' && 'Login to see your special surprise'}
              {mode === 'signup' && 'Sign up for something special'}
              {mode === 'admin' && 'Access the admin dashboard'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Signup Fields */}
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-rose-400 focus:outline-none transition-colors text-base"
                  placeholder="Enter your beautiful name"
                  required
                />
              </div>
            )}

            {/* User Login/Signup Email */}
            {(mode === 'login' || mode === 'signup') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-rose-400 focus:outline-none transition-colors text-base"
                  placeholder="your email love"
                  required
                />
              </div>
            )}

            {/* User Login/Signup Password */}
            {(mode === 'login' || mode === 'signup') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-rose-400 focus:outline-none transition-colors text-base"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            )}

            {/* Admin Login Fields */}
            {mode === 'admin' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-rose-400 focus:outline-none transition-colors text-base"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-rose-400 focus:outline-none transition-colors text-base"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs sm:text-sm"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-xs sm:text-sm"
              >
                ✓ {success}
              </motion.div>
            )}

            {success && mode === 'login' && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  console.log('[Auth] User clicked "Go to Proposal" button');
                  window.location.href = '/proposal';
                }}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-rose-600 hover:to-pink-600 transition-all text-base min-h-12"
              >
                💖 Go to Proposal →
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || (mode === 'login' && !!success)}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 sm:py-3 rounded-lg font-semibold shadow-lg hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base min-h-12"
            >
              {loading ? (
                mode === 'admin' ? 'Logging in...' : mode === 'login' ? 'Logging in...' : 'Creating account...'
              ) : mode === 'admin' ? (
                'Admin Login'
              ) : mode === 'login' ? (
                'Login'
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          {/* Decorative hearts */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="text-lg sm:text-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                💕
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
