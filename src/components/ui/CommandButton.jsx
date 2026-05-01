import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils'; // Assume shadcn utils, or remove if not

const variants = {
  approve: 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500/50 shadow-emerald/25',
  reject: 'bg-red-600 hover:bg-red-700 text-white border-red-500/50 shadow-red/25',
  primary: 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-500/50 shadow-cyan/25',
  default: 'bg-slate-800 hover:bg-slate-700 border-slate-600/50 shadow-slate/25'
};

export default function CommandButton({ children, variant = 'default', className = '', disabled = false, onClick, ...props }) {
  const handleClick = (e) => {
    console.log('CommandButton clicked:', children, 'disabled:', disabled);
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'font-mono font-semibold text-lg px-8 py-4 rounded-lg border-2 shadow-lg transition-all duration-200 uppercase tracking-wider min-w-[200px] flex items-center justify-center',
        variants[variant],
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl active:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

