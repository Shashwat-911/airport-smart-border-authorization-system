import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import clsx from 'clsx';

export default function AlertBadge({ variant = 'info', label }) {
  const styles = {
    info: 'border-cyan/30 text-cyan bg-cyan/10',
    success: 'border-emerald/30 text-emerald bg-emerald/10',
    warning: 'border-amber/30 text-amber bg-amber/10',
    critical: 'border-red/30 text-red bg-red/10 animate-pulse',
  };

  const Icon = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    critical: AlertTriangle,
  }[variant];

  return (
    <div className={clsx(
      'inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest border rounded backdrop-blur-sm',
      styles[variant]
    )}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}
