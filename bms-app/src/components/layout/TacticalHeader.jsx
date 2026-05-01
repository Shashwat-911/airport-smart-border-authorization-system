import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, User, Zap, Activity, Users, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import ThemeToggle from '../ui/ThemeToggle';

export default function TacticalHeader() {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }) => clsx(
    "flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors border-b-2",
    isActive 
      ? "text-cyan border-cyan bg-cyan/10" 
      : "text-gray-400 border-transparent hover:text-cyan/70 hover:bg-cyan/5"
  );

  return (
    <header className="h-16 border-b border-cyan/20 bg-navy-900/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 relative z-20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-navy-800 border border-cyan/30 rounded">
            <Shield className="w-5 h-5 text-cyan" />
          </div>
          <div className="flex flex-col">
            <span className="font-bebas text-xl tracking-wider text-white leading-none">BORDER SECURITY</span>
            <span className="font-mono text-[10px] text-cyan uppercase tracking-widest leading-none mt-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald" /> ONLINE
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center h-full ml-8">
          <NavLink to="/verify" className={navLinkStyle}>
            <Activity className="w-4 h-4" />
            VERIFICATION
          </NavLink>
          <NavLink to="/profile" className={navLinkStyle}>
            <Users className="w-4 h-4" />
            DATABASE LOOKUP
          </NavLink>
        </nav>
      </div>

      <div className="hidden lg:flex flex-1 justify-center">
        <div className="px-6 py-1 border border-cyan/10 bg-navy-800/50 rounded flex items-center gap-8 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-cyan/50">STN:</span>
            <span className="text-white">CP-DELTA-09</span>
          </div>
          <div className="flex items-center gap-2 text-amber">
            <User className="w-3 h-3" />
            <span className="text-amber">OFC_773A</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-mono text-cyan bg-navy-800/80 px-3 py-1.5 rounded border border-cyan/20">
          <Clock className="w-4 h-4" />
          <span className="min-w-[70px] text-right font-bold tracking-wider">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </span>
        </div>
        <ThemeToggle />
        <button 
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red transition-colors border border-transparent hover:border-red/30 hover:bg-red/10 rounded"
          title="Disconnect Session"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
      
      {/* Decorative scanline on header bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-cyan/50"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </header>
  );
}
