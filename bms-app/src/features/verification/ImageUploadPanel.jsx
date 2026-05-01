import { useState, useRef } from 'react';
import { UploadCloud, Camera, CheckCircle, Image as ImageIcon } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageUploadPanel({ type, label, onImageSelect, image }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      onImageSelect(type, { file, url });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <span className="font-bebas tracking-widest text-lg text-white">
          {label}
        </span>
        {image && <CheckCircle className="w-5 h-5 text-emerald" />}
      </div>

      <div
        className={clsx(
          'relative w-full h-[320px] rounded flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300',
          image ? 'border-2 border-cyan/50 shadow-[0_0_15px_rgba(0,212,255,0.2)]' : 'tactical-dashed-border bg-navy-800/50 hover:bg-navy-700/50',
          isDragActive && 'bg-cyan/10 scale-[1.02]'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <AnimatePresence mode="wait">
          {!image ? (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 text-cyan/70"
            >
              {type === 'passport' ? (
                <ImageIcon className="w-12 h-12" />
              ) : (
                <Camera className="w-12 h-12" />
              )}
              <div className="text-center font-mono">
                <p className="text-sm">CLICK TO BROWSE OR DRAG FILE HERE</p>
                <p className="text-xs text-cyan/40 mt-2">JPEG / PNG MAX 5MB</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full relative"
            >
              <img
                src={image.url}
                alt={label}
                className="w-full h-full object-cover opacity-80"
              />
              {/* Overlay elements */}
              <div className="absolute inset-0 bg-cyan/10 border-4 border-cyan mix-blend-overlay"></div>
              
              {/* Bounding box (fake tactical overlay) */}
              {type === 'live' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-48 border border-emerald/50 flex flex-col justify-between"
                >
                  <div className="w-3 h-3 border-t-2 border-l-2 border-emerald" />
                  <div className="w-10 h-0.5 bg-emerald/30 self-center scan-line-horizontal" />
                  <div className="w-3 h-3 border-b-2 border-r-2 border-emerald self-end" />
                </motion.div>
              )}
              
              {/* Tactical corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
}
