import { motion } from 'framer-motion';
import CommandButton from '../../components/ui/CommandButton';

export default function EntryDecisionPanel({ onDecision, isSubmitting }) {
  const handleApprove = () => {
    console.log('Approve button clicked');
    onDecision('APPROVE');
  };

  const handleReject = () => {
    console.log('Reject button clicked');
    onDecision('REJECT');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-navy-800 p-8 border border-cyan/30 flex flex-col items-center justify-center gap-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-tactical-grid opacity-10"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center gap-2">
        <h2 className="font-bebas text-3xl tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          FINAL OFFICER ACTION REQUIRED
        </h2>
        <p className="font-mono text-sm text-cyan/70">
          SELECT ENTRY STATUS TO RECORD IN CENTRAL DATABASE
        </p>
      </div>

      <div className="relative z-10 w-full max-w-2xl grid grid-cols-2 gap-8 mt-4">
        <CommandButton 
          variant="approve" 
          disabled={isSubmitting}
          onClick={handleApprove}
          className="h-32 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]"
        >
          {isSubmitting ? 'PROCESSING...' : 'APPROVE ENTRY'}
        </CommandButton>
        
        <CommandButton 
          variant="reject" 
          disabled={isSubmitting}
          onClick={handleReject}
          className="h-32 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]"
        >
          {isSubmitting ? 'PROCESSING...' : 'REJECT ENTRY'}
        </CommandButton>
      </div>

      <div className="relative z-10 mt-4 px-6 py-2 border border-amber/30 bg-amber/5 font-mono text-xs text-amber flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-amber animate-pulse"></div>
        WARNING: THIS ACTION IS IRREVERSIBLE AND WILL BE LOGGED
      </div>
    </motion.div>
  );
}

