import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CountdownTimer component renders a glassmorphism countdown clock box
 * with animated digits and soft glow.
 */
export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num) => String(num).padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-3 bg-slate-950/60 border border-white/15 px-4 py-2.5 rounded-2xl backdrop-blur-md shadow-xl shadow-slate-950/50 self-start md:self-auto">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Clock size={18} className="text-amber-400 animate-pulse" />
          <span className="absolute inset-0 rounded-full bg-amber-400/30 blur-sm pointer-events-none" />
        </div>
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider hidden sm:inline">
          Ends in:
        </span>
      </div>

      <div className="flex items-center gap-1.5 font-mono font-extrabold text-sm text-amber-400">
        <TimerBox value={formatDigit(timeLeft.hours)} unit="h" />
        <span className="text-slate-500 font-bold">:</span>
        <TimerBox value={formatDigit(timeLeft.minutes)} unit="m" />
        <span className="text-slate-500 font-bold">:</span>
        <TimerBox value={formatDigit(timeLeft.seconds)} unit="s" />
      </div>
    </div>
  );
}

function TimerBox({ value, unit }) {
  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-center flex items-center gap-0.5 shadow-inner">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span className="text-[10px] text-slate-400 font-sans font-semibold uppercase">{unit}</span>
    </div>
  );
}
