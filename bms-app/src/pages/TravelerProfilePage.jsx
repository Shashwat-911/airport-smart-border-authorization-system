import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TravelerDataPanel from '../features/verification/TravelerDataPanel';

import api from '../services/api';

export default function TravelerProfilePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsSearching(true);
    setError(null);
    setProfileData(null);
    
    try {
      const response = await api.get(`/api/traveler/${searchQuery.toUpperCase()}/`);
      setProfileData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
         setError('NO RECORD FOUND FOR PASSPORT NUMBER.');
      } else {
         setError('FAILED TO SECURE CONNECTION TO DATABASE NODE.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
      <div className="relative z-10">
        <h1 className="font-bebas text-3xl tracking-widest text-cyan mb-2">TRAVELER DATABASE LOOKUP</h1>
        <p className="font-mono text-sm text-cyan/50">ACCESS TO SECURE FEDERATED RECORDS</p>
      </div>

      <form onSubmit={handleSearch} className="relative z-10 w-full">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ENTER PASSPORT NO..."
            className="w-full bg-navy-800 border-2 border-cyan/30 text-white font-mono h-16 pl-16 pr-32 focus:outline-none focus:border-cyan transition-colors uppercase placeholder:text-cyan/30 tracking-widest text-lg"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-cyan/50" />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-2 top-2 bottom-2 bg-cyan/10 text-cyan border border-cyan/50 px-6 font-bebas tracking-widest text-lg hover:bg-cyan hover:text-navy-900 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
          >
            {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'QUERY DB'}
          </button>
        </div>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mt-3 text-red font-mono text-sm tracking-widest flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 bg-red animate-pulse" />
            {error}
          </motion.div>
        )}
      </form>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {profileData && !isSearching && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <TravelerDataPanel data={profileData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
