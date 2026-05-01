import { motion } from 'framer-motion';
import AlertBadge from '../../components/ui/AlertBadge';
import { User, FileText, Globe, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TravelerDataPanel({ data }) {
  if (!data) return null;

  const tData = data.traveler || data;
  const nameParts = (tData.name || tData.first_name || '').split(' ');
  const firstName = nameParts[0] || 'JOHN';
  const lastName = tData.last_name || (nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'DOE');
  const passportNumber = tData.passport_number || 'X89011244M';
  const nationality = tData.nationality || 'USA';
  const dob = tData.dob || '1985-11-23';
  const gender = tData.gender || 'U';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-navy-800 border border-cyan/20 grid grid-cols-1 md:grid-cols-2 gap-px bg-cyan/20"
    >
      {/* Col 1: Passport Info */}
      <div className="bg-navy-900 p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-cyan/20 pb-2">
          <FileText className="text-cyan w-5 h-5" />
          <h3 className="font-bebas tracking-widest text-lg text-cyan">PASSPORT DATA</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 font-mono text-sm">
          <div className="flex flex-col gap-1 text-gray-400">
            <span className="text-[10px] uppercase">GIVEN NAMES</span>
            <span className="text-white font-bold">{firstName}</span>
          </div>
          <div className="flex flex-col gap-1 text-gray-400">
            <span className="text-[10px] uppercase">SURNAME</span>
            <span className="text-white font-bold">{lastName}</span>
          </div>

          <div className="flex flex-col gap-1 text-gray-400">
            <span className="text-[10px] uppercase">DOCUMENT NO</span>
            <span className="text-white bg-navy-800 px-2 py-1 rounded inline-block w-max border border-cyan/10">
              {passportNumber}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-gray-400">
            <span className="text-[10px] uppercase">NATIONALITY</span>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan/70" />
              <span className="text-white">{nationality}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1 text-gray-400">
            <span className="text-[10px] uppercase">DATE OF BIRTH</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan/70" />
              <span className="text-white">{dob}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1 text-gray-400">
            <span className="text-[10px] uppercase">GENDER</span>
            <span className="text-white">{gender}</span>
          </div>
        </div>
      </div>

      {/* Col 2: Visa & Security Info */}
      <div className="bg-navy-900 p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-cyan/20 pb-2">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-emerald w-5 h-5" />
            <h3 className="font-bebas tracking-widest text-lg text-emerald">RISK & VISA STATUS</h3>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center p-3 border border-emerald/20 bg-emerald/5 rounded-sm">
            <span className="font-mono text-xs text-gray-400">VISA STATUS</span>
            <AlertBadge variant="success" label="VALID — TOURIST (B2)" />
          </div>

          <div className="flex justify-between items-center p-3 border border-emerald/20 bg-emerald/5 rounded-sm">
            <span className="font-mono text-xs text-gray-400">INTERPOL DB</span>
            <AlertBadge variant="success" label="NO MATCH" />
          </div>

          <div className="flex justify-between items-center p-3 border border-amber/20 bg-amber/5 rounded-sm">
            <span className="font-mono text-xs text-gray-400">PREVIOUS RECORDS</span>
            <AlertBadge variant="warning" label="1 OVERSTAY (2021)" />
          </div>
        </div>
        
        <div className="mt-auto border-t border-cyan/20 pt-4 flex items-center justify-between">
            <span className="font-mono text-xs text-cyan">SYSTEM RECOMMENDATION:</span>
            <span className="font-bebas tracking-widest text-emerald animate-pulse text-lg drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]">
              CLEAR FOR ENTRY
            </span>
        </div>
      </div>
    </motion.div>
  );
}
