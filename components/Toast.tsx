'use client';

import { useEffect } from 'react';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
      icon: '✓',
      border: 'border-green-400',
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500 to-rose-500',
      icon: '✕',
      border: 'border-red-400',
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      icon: 'ℹ',
      border: 'border-blue-400',
    },
  };

  const style = styles[type];

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div
        className={`${style.bg} text-white px-8 py-4 rounded-2xl shadow-2xl border-2 ${style.border} min-w-[320px] max-w-md`}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
            {style.icon}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-lg leading-tight">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label="关闭"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
      </div>
    </div>
  );
}
