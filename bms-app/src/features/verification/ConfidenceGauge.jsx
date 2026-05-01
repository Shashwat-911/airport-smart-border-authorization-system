import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import AlertBadge from '../../components/ui/AlertBadge';
import CommandButton from '../../components/ui/CommandButton';

export default function ConfidenceGauge({ score, onComplete, onRetry }) {
  const [displayScore, setDisplayScore] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  const isMatch = score >= 85;
  const color = isMatch ? '#10b981' : '#ef4444'; // emerald or red
  const bgColor = isMatch ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
  
  // SVG Circle Path Variables
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    const animation = animate(count, score, { 
      duration: 1.5, 
      ease: "easeOut",
      onUpdate: (latest) => setDisplayScore(Math.round(latest)),
      onComplete: () => {
        if (isMatch) {
          setTimeout(onComplete, 1500);
        }
      }
    });
    
    return animation.stop;
  }, [score, isMatch, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Background track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-navy-700"
          />
        </svg>

        {/* Animated colored progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 transform drop-shadow-[0_0_10px_currentColor]">
          <motion.circle
            cx="128"
            cy="128"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Internal content */}
        <div className="flex flex-col items-center absolute inset-0 justify-center gap-1">
          <span className="font-bebas text-6xl tracking-widest drop-shadow-[0_0_5px_currentColor]" style={{ color }}>
            {displayScore}%
          </span>
          <span className="font-mono text-[10px] text-gray-400">CONFIDENCE LEVEL</span>
        </div>
      </div>
      
      {/* Result Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: displayScore === score ? 1 : 0, y: displayScore === score ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-center flex flex-col items-center gap-6"
      >
        <AlertBadge 
          variant={isMatch ? 'success' : 'critical'} 
          label={isMatch ? 'IDENTITY CONFIRMED — PROCEEDING' : 'IDENTITY MISMATCH — ACCESS DENIED'} 
        />
        
        {!isMatch && (
          <CommandButton onClick={onRetry} variant="primary">
            RETRY SCAN
          </CommandButton>
        )}
      </motion.div>
    </div>
  );
}
