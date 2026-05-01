import { Check } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function VerificationStageIndicator({ currentStage, stages }) {
  return (
    <div className="w-full flex items-center justify-between relative px-4 py-8">
      {/* Background track line */}
      <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-navy-700 -translate-y-1/2" />
      
      {/* Active progress line */}
      <motion.div 
        className="absolute top-1/2 left-8 h-[2px] bg-cyan -translate-y-1/2 shadow-[0_0_10px_rgba(0,212,255,0.8)]"
        initial={{ width: '0%' }}
        animate={{ width: `${(Math.max(0, currentStage - 1) / (stages.length - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ maxWidth: 'calc(100% - 4rem)' }}
      />

      {stages.map((stage, index) => {
        const isCompleted = currentStage > index + 1;
        const isActive = currentStage === index + 1;
        const isPending = currentStage < index + 1;

        return (
          <div key={index} className="relative z-10 flex flex-col items-center gap-3">
            <motion.div
              layout
              className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-all duration-300',
                isCompleted ? 'bg-cyan text-navy-900 shadow-[0_0_15px_rgba(0,212,255,0.5)]' :
                isActive ? 'bg-navy-800 border-2 border-cyan text-cyan shadow-[0_0_20px_rgba(0,212,255,0.8)] scale-110' :
                'bg-navy-800 border-2 border-navy-700 text-gray-500'
              )}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : (index + 1)}
            </motion.div>
            <span className={clsx(
              "font-bebas text-sm tracking-widest uppercase absolute -bottom-8 whitespace-nowrap",
               isActive ? 'text-cyan' : isCompleted ? 'text-cyan/70' : 'text-gray-500'
            )}>
              {stage}
            </span>
          </div>
        );
      })}
    </div>
  );
}
