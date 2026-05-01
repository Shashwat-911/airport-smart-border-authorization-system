import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import VerificationStageIndicator from '../../components/ui/VerificationStageIndicator';
import CommandButton from '../../components/ui/CommandButton';

import ImageUploadPanel from './ImageUploadPanel';
import FaceScanAnimation from './FaceScanAnimation';
import ConfidenceGauge from './ConfidenceGauge';
import VerificationTimeline from './VerificationTimeline';
import TravelerDataPanel from './TravelerDataPanel';
import EntryDecisionPanel from './EntryDecisionPanel';
import EntryConfirmationScreen from './EntryConfirmationScreen';

const STAGES = ['UPLOAD', 'BIOMETRIC', 'DATABASE', 'DECISION'];

import api from '../../services/api';
import useAuthStore from '../../hooks/useAuthStore';

export default function VerificationPage() {
  const { user } = useAuthStore();
  const [currentStage, setCurrentStage] = useState(1);
  const [images, setImages] = useState({ passport: null, live: null });
  const [scanScore, setScanScore] = useState(0);
  const [travelerData, setTravelerData] = useState(null);
  const [travelerId, setTravelerId] = useState(null); // Added to store backend traveler ID
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [decision, setDecision] = useState(null);
  const [error, setError] = useState(null);

  const handleImageSelect = (type, data) => {
    setImages(prev => ({ ...prev, [type]: data }));
  };

  const startVerification = () => {
    if (images.passport && images.live) {
      setCurrentStage(2);
      // Simulate backend generating a match score
      setTimeout(() => {
        setScanScore(98); // Force success for demo
      }, 2500); // After scan line animation ends
    }
  };

  const onScanComplete = async () => {
    setCurrentStage(3);
    try {
      setError(null);
      const formData = new FormData();
      if (images.passport?.file) formData.append('passport_image', images.passport.file);
      if (images.live?.file) formData.append('live_face_image', images.live.file);
      
      const response = await api.post('/api/verify-traveler/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setTravelerData(response.data);
      setTravelerId(response.data.id);
      
    } catch (err) {
      console.error(err);
      setError('Failed to securely contact database node. Offline mode engaged or network error.');
    }
  };

  const onDbCheckComplete = () => {
    // Show data panel, user manually advances or auto advance? Let's manual advance.
  };

  const handleDecision = async (dec) => {
    setIsSubmitting(true);
    try {
      await api.post('/api/entry/', {
        traveler_id: travelerId,
        border_location: 'MAIN_TERMINAL_01', 
        officer_id: user?.username || 'UNKNOWN',
        status: dec === 'APPROVED' ? 'APPROVED' : 'REJECTED'
      });
      setDecision(dec);
    } catch (err) {
       console.error(err);
       setError('Failed to record entry. Communication error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetVerification = () => {
    setImages({ passport: null, live: null });
    setScanScore(0);
    setTravelerData(null);
    setTravelerId(null);
    setDecision(null);
    setError(null);
    setCurrentStage(1);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
      
      {!decision && (
        <VerificationStageIndicator currentStage={currentStage} stages={STAGES} />
      )}

      {decision ? (
        <EntryConfirmationScreen decision={decision} onReset={resetVerification} />
      ) : (
        <AnimatePresence mode="wait">
          {currentStage === 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ImageUploadPanel 
                  type="passport" 
                  label="PASSPORT DOCUMENT PHOTO"
                  image={images.passport}
                  onImageSelect={handleImageSelect}
                />
                <ImageUploadPanel 
                  type="live" 
                  label="LIVE TRAVELLER PHOTO"
                  image={images.live}
                  onImageSelect={handleImageSelect}
                />
              </div>

              <div className="flex justify-center mt-4">
                <CommandButton 
                  onClick={startVerification} 
                  disabled={!images.passport || !images.live}
                  className="w-full max-w-md"
                >
                  BEGIN VERIFICATION PIPELINE
                </CommandButton>
              </div>
            </motion.div>
          )}

          {currentStage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col gap-8"
            >
              {scanScore === 0 ? (
                <FaceScanAnimation 
                  passportImage={images.passport?.url} 
                  liveImage={images.live?.url} 
                  onComplete={() => {}} // Score gets set automatically via timeout above
                />
              ) : (
                <div className="bg-navy-800 border border-cyan/20 p-8">
                  <ConfidenceGauge 
                    score={scanScore} 
                    onComplete={onScanComplete} 
                    onRetry={() => {
                        setScanScore(0);
                        startVerification();
                    }}
                  />
                </div>
              )}
            </motion.div>
          )}

          {currentStage === 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 sticky top-6">
                  <VerificationTimeline onComplete={onDbCheckComplete} />
                  
                  {travelerData && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 flex justify-center"
                    >
                      <CommandButton 
                        variant="primary" 
                        onClick={() => setCurrentStage(4)}
                        className="w-full text-lg py-3"
                      >
                        PROCEED TO DECISION
                      </CommandButton>
                    </motion.div>
                  )}
                </div>
                
                <div className="lg:col-span-8">
                  {error ? (
                    <div className="h-full min-h-[400px] border border-red/20 bg-red/10 flex items-center justify-center font-mono text-red p-6 text-center">
                      CRITICAL NODE FAILURE:<br/>{error}
                    </div>
                  ) : travelerData ? (
                    <TravelerDataPanel data={travelerData} />
                  ) : (
                    <div className="h-full min-h-[400px] border border-cyan/20 bg-navy-800/50 flex items-center justify-center font-mono text-cyan/50 animate-pulse">
                      WAITING FOR SECURE DATABASE NODE...
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStage === 4 && (
            <motion.div
              key="stage4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <EntryDecisionPanel 
                onDecision={handleDecision} 
                isSubmitting={isSubmitting} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
