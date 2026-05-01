import { motion } from 'framer-motion';

export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-tactical-grid opacity-30"></div>
      <motion.div
        className="absolute left-0 right-0 h-1 bg-cyan shadow-[0_0_15px_rgba(0,212,255,0.8)] opacity-20"
        style={{ width: '100%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,212,255,0.05),transparent_40%)]"></div>
    </div>
  );
}
