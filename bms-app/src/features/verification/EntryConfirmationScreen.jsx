import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, RotateCcw } from 'lucide-react';
import CommandButton from '../../components/ui/CommandButton';

export default function EntryConfirmationScreen({ decision, onReset }) {
  const isApproved = decision === 'APPROVE';
  const color = isApproved ? 'text-emerald' : 'text-red';
  const bgColor = isApproved ? 'bg-emerald/10' : 'bg-red/10';
  const borderColor = isApproved ? 'border-emerald/50' : 'border-red/50';
  const shadow = isApproved ? 'shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'shadow-[0_0_30px_rgba(239,68,68,0.4)]';
  const Icon = isApproved ? ShieldCheck : ShieldAlert;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`w-full max-w-3xl mx-auto p-12 border ${borderColor} ${bgColor} ${shadow} flex flex-col items-center justify-center gap-8 text-center`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className={`p-6 rounded-full border-2 ${borderColor} bg-navy-900/50`}
      >
        <Icon className={`w-24 h-24 ${color}`} />
      </motion.div>

      <div className="flex flex-col gap-2">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`font-bebas text-5xl tracking-[0.2em] ${color}`}
        >
          {isApproved ? 'ENTRY RECORDED' : 'ENTRY DENIED'}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-mono text-white/70 tracking-widest uppercase"
        >
          TRANSACTION LOGGED TO CENTRAL DATABASE
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8"
      >
        <CommandButton variant="primary" onClick={onReset} className="flex gap-2">
          <RotateCcw className="w-5 h-5" />
          START NEW VERIFICATION
        </CommandButton>
      </motion.div>
    </motion.div>
  );
}
