import { motion } from 'framer-motion';

export default function FaceScanAnimation({ passportImage, liveImage, onComplete }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[320px] relative bg-navy-800 border border-cyan/20 overflow-hidden">
      <div className="absolute inset-0 bg-tactical-grid opacity-20"></div>
      
      <div className="relative z-10 flex gap-4 w-full h-full p-4">
        {/* Passport Face */}
        <div className="flex-1 relative h-full rounded overflow-hidden border border-cyan/30">
          <img src={passportImage} alt="Passport" className="w-full h-full object-cover opacity-80 filter grayscale brightness-75 mix-blend-screen" />
          <div className="absolute inset-0 border-2 border-dashed border-cyan/50 m-4 rounded pointer-events-none"></div>
          <div className="absolute bottom-2 left-2 font-mono text-xs text-cyan tracking-widest bg-navy-900/80 px-2">REF: SRC_DOC</div>
        </div>
        
        {/* Live Face */}
        <div className="flex-1 relative h-full rounded overflow-hidden border border-cyan/30">
          <img src={liveImage} alt="Live" className="w-full h-full object-cover opacity-80 filter grayscale brightness-75 contrast-125 mix-blend-screen" />
          <div className="absolute inset-0 border-2 border-dashed border-cyan/50 m-4 rounded pointer-events-none"></div>
          <div className="absolute bottom-2 right-2 font-mono text-xs text-cyan tracking-widest bg-navy-900/80 px-2">REF: LIVE_CAM</div>
        </div>
      </div>

      {/* Horizontal Scanning Line */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-transparent via-cyan/40 to-cyan border-r-2 border-cyan shadow-[0_0_20px_rgba(0,212,255,1)] z-20 mix-blend-screen"
        initial={{ left: '-10%' }}
        animate={{ left: '110%' }}
        transition={{ 
          duration: 2.5, 
          ease: "linear",
          onComplete: () => {
            if(onComplete) onComplete();
          }
        }}
      />
      
      {/* Scanning status text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 font-mono text-cyan animate-pulse bg-navy-900/80 px-4 py-1 border border-cyan/50">
        <div className="w-2 h-2 rounded-full bg-cyan"></div>
        BIOMETRIC SCAN IN PROGRESS
      </div>
    </div>
  );
}
