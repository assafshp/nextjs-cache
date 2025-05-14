'use client'

import { useState, useEffect } from 'react';

export function ClientSideContent() {
  const [time, setTime] = useState('');
  const [isInvalidating, setIsInvalidating] = useState(false);
  
  useEffect(() => {
    // Initial set on mount to avoid hydration mismatch
    setTime(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
    
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleInvalidateCache = async () => {
    setIsInvalidating(true);
    try {
      await fetch('/api/invalidate', { method: 'POST' });
      window.location.reload();
    } catch (error) {
      console.error('Failed to invalidate cache:', error);
    }
    setIsInvalidating(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Current Time:</h2>
        <p className="text-lg">{time}</p>
        <p className="text-sm text-gray-600 mt-2">
          This timestamp updates every second to show real-time
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cache Control</h2>
        <button 
          onClick={handleInvalidateCache}
          disabled={isInvalidating}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isInvalidating ? 'Invalidating...' : 'Invalidate Cache'}
        </button>
        <p className="text-sm text-gray-600 mt-4">
          Click this button to invalidate the cache and get a fresh cached timestamp
        </p>
      </div>
    </div>
  );
}
