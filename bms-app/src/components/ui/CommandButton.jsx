import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function CommandButton({ 
  children, 
  variant = 'primary', 
  disabled = false, 
  onClick, 
  className 
}) {
  const styles = {
    primary: 'border-cyan/50 text-cyan hover:bg-cyan hover:text-navy-900 shadow-[0_0_10px_rgba(0,212,255,0.2)] hover:shadow-[0_0_20px_rgba(0,212,255,0.6)]',
    approve: 'border-emerald/50 text-emerald hover:bg-emerald hover:text-navy-900 shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]',
    reject: 'border-red/50 text-red hover:bg-red hover:text-white shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed border-gray-600 text-gray-500 hover:bg-transparent hover:text-gray-500 hover:shadow-none shadow-none';

  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.98 }}
      whileHover={disabled ? {} : { scale: 1.02 }}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'relative px-8 py-4 font-bebas text-2xl tracking-widest transition-all duration-300 border backdrop-blur-sm uppercase flex items-center justify-center gap-3',
        disabled ? disabledStyles : styles[variant],
        className
      )}
    >
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-70"></span>
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-70"></span>
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-70"></span>
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-70"></span>
      
      {children}
    </motion.button>
  );
}
