'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ProposalPage() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log('[Proposal Page] Component mounted');
    
    // Create floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
    }));
    setParticles(newParticles);
  }, [router]);

  const handleYes = async () => {
    setSaving(true);
    setError('');
    setAnswer('yes');
    setShowConfetti(true);
    
    // Save response to database
    try {
      const response = await fetch('/api/save-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: 'yes' }),
      });

      const data = await response.json();
      
      if (!data.success) {
        setError('Failed to save your response. But your answer was recorded!');
        console.error('Error saving response:', data.message);
      } else {
        console.log('Response saved successfully');
      }
    } catch (error) {
      setError('Failed to save your response. But your answer was recorded!');
      console.error('Error saving response:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleNo = () => {
    setNoClickCount(prev => prev + 1);
    
    // Move the "No" button to a random position
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/auth';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/auth';
    }
  };

  const noButtonTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Don't be shy!",
    "Last chance!",
    "You'll regret it!",
    "Pretty please?",
  ];

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Logout button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="px-3 sm:px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors min-w-fit"
        >
          Logout
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="absolute top-16 left-4 right-4 z-50 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs sm:text-sm max-h-20 overflow-y-auto">
          {error}
        </div>
      )}
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 animate-pulse-slow" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle text-2xl"
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {['💕', '💖', '💗', '💝', '🌹'][particle.id % 5]}
        </div>
      ))}

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5,
              }}
            >
              {['❤️', '💕', '💖', '🌹', '💐', '✨'][i % 6]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {!answer ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              {/* Glowing flowers decoration */}
              <div className="flex justify-center gap-4 sm:gap-8 mb-6 sm:mb-8">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="text-4xl sm:text-6xl flower-glow"
                  >
                    🌹
                  </motion.div>
                ))}
              </div>

              {/* Main question */}
              <motion.h1
                className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 font-[var(--font-dancing)] text-rose-600 glow-text"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Will You Be My
                <br />
                Valentine? 💖
              </motion.h1>

              {/* Decorative hearts */}
              <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    className="text-xl sm:text-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    💕
                  </motion.span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 sm:mt-12 px-2 sm:px-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYes}
                  disabled={saving}
                  className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-xl sm:text-2xl font-bold shadow-lg glow-box hover:from-rose-600 hover:to-pink-600 transition-all heartbeat disabled:opacity-50 disabled:cursor-not-allowed min-h-14 sm:min-h-auto"
                >
                  {saving ? 'Saving...' : 'Yes! 💖'}
                </motion.button>

                <motion.button
                  animate={{
                    x: noButtonPosition.x,
                    y: noButtonPosition.y,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={handleNo}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-300 text-gray-700 rounded-full text-lg sm:text-xl font-semibold shadow-md hover:bg-gray-400 transition-colors min-h-14 sm:min-h-auto"
                >
                  {noButtonTexts[Math.min(noClickCount, noButtonTexts.length - 1)]}
                </motion.button>
              </div>

              {noClickCount > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 sm:mt-6 text-sm sm:text-lg text-rose-500 font-semibold"
                >
                  Come on... you know you want to say yes! 😊
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-12 shadow-2xl glow-box mx-2 sm:mx-0"
            >
              {/* Success flowers */}
              <div className="flex justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="text-3xl sm:text-5xl flower-glow"
                  >
                    🌹
                  </motion.div>
                ))}
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <h2 className="text-4xl sm:text-6xl mb-4 sm:mb-6">🎉</h2>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 font-[var(--font-dancing)] text-rose-600 glow-text">
                  Yay! She Said Yes!
                </h1>
              </motion.div>

              <p className="text-lg sm:text-2xl text-gray-700 mb-6 sm:mb-8">
                I can't wait to spend Valentine's Day with you! 💕
              </p>

              {/* Animated hearts */}
              <div className="flex justify-center gap-2 sm:gap-3">
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl sm:text-4xl"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    ❤️
                  </motion.span>
                ))}
              </div>

              {/* Bottom decoration */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 sm:mt-12 text-4xl sm:text-6xl"
              >
                💐💝💐
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around p-4 sm:p-8 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="text-3xl sm:text-5xl flower-glow opacity-60"
          >
            🌹
          </motion.div>
        ))}
      </div>
    </main>
  );
}
