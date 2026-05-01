import { motion } from 'framer-motion';
import clsx from 'clsx';
import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';

export default function TimelineLog({ items }) {
  return (
    <div className="flex flex-col gap-4 font-mono text-sm relative">
      <div className="absolute left-3 top-2 bottom-2 w-px bg-cyan/20"></div>
      
      {items.map((item, index) => {
        let StatusIcon = Circle;
        let iconColor = 'text-cyan/30';
        let glow = '';

        switch (item.status) {
          case 'completed':
            StatusIcon = CheckCircle2;
            iconColor = 'text-emerald';
            glow = 'shadow-[0_0_10px_rgba(16,185,129,0.3)] bg-emerald/10';
            break;
          case 'loading':
            StatusIcon = Loader2;
            iconColor = 'text-cyan animate-spin';
            glow = 'shadow-[0_0_10px_rgba(0,212,255,0.3)] bg-cyan/10';
            break;
          case 'error':
            StatusIcon = XCircle;
            iconColor = 'text-red';
            glow = 'shadow-[0_0_10px_rgba(239,68,68,0.3)] bg-red/10';
            break;
          case 'pending':
          default:
            StatusIcon = Circle;
            iconColor = 'text-gray-600';
            glow = 'bg-navy-800';
            break;
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            className="flex items-start gap-4 z-10"
          >
            <div className={clsx("rounded-full p-1 border border-transparent", glow, item.status === 'pending' && 'border-gray-700/50')}>
              <StatusIcon className={clsx("w-4 h-4", iconColor)} />
            </div>
            
            <div className="flex flex-col pt-0.5">
              <span className={clsx(
                "tracking-widest uppercase",
                item.status === 'completed' ? 'text-emerald/90' :
                item.status === 'error' ? 'text-red' :
                item.status === 'loading' ? 'text-cyan' : 'text-gray-500'
              )}>
                {item.label}
              </span>
              {item.detail && (
                <span className="text-xs mt-1 text-gray-400 font-sans tracking-wide">
                  {item.detail}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
