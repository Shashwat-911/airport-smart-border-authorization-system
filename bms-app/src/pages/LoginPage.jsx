import { useState } from 'react';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommandButton from '../components/ui/CommandButton';
import useAuthStore from '../hooks/useAuthStore';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/verify');
    }
  };

  return (
    <div className="min-h-screen w-full bg-navy-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-navy-800/80 backdrop-blur-md border border-cyan/20 p-8 shadow-[0_0_50px_rgba(0,212,255,0.05)] relative z-10 flex flex-col items-center">
        
        <div className="w-16 h-16 rounded-full border-2 border-cyan/50 flex items-center justify-center bg-navy-900 shadow-[0_0_20px_rgba(0,212,255,0.2)] mb-6">
          <Shield className="w-8 h-8 text-cyan" />
        </div>

        <h1 className="font-bebas text-3xl tracking-widest text-cyan mb-1 text-center">BORDER SECURITY AUTHORITY</h1>
        <p className="font-mono text-xs text-cyan/50 tracking-widest mb-8 text-center uppercase">RESTRICTED ACCESS TERMINAL</p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-cyan tracking-widest">OFFICER ID</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-navy-900 border border-cyan/30 p-3 font-mono text-white focus:outline-none focus:border-cyan"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-cyan tracking-widest">CREDENTIAL PHRASE</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-navy-900 border border-cyan/30 p-3 font-mono text-white focus:outline-none focus:border-cyan"
            />
          </div>

          <CommandButton type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE SESSION'}
          </CommandButton>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-2 border border-red/30 bg-red/10 text-red font-mono tracking-widest text-xs flex items-center justify-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
              {error}
            </motion.div>
          )}
        </form>

        <div className="mt-8 pt-4 border-t border-cyan/10 w-full text-center">
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
            UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED.<br/>
            ALL NODE ACTIVITY IS MONITORED AND LOGGED.
          </p>
        </div>
      </div>
    </div>
  );
}
