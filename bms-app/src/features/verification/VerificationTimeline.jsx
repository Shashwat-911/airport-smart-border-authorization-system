import { useEffect, useState } from 'react';
import TimelineLog from '../../components/ui/TimelineLog';

export default function VerificationTimeline({ onComplete }) {
  const [stages, setStages] = useState([
    { label: 'OCR EXTRACTION', detail: 'Parsing document MRZ data...', status: 'loading' },
    { label: 'FACE MATCHING', detail: 'Waiting for biometric input', status: 'pending' },
    { label: 'DATABASE QUERY', detail: 'Connecting to Secure Node', status: 'pending' },
    { label: 'RISK ASSESSMENT', detail: 'Evaluating watchlists', status: 'pending' }
  ]);

  useEffect(() => {
    // 1. OCR Extraction complete after 1s
    const timer1 = setTimeout(() => {
      setStages(prev => {
        const newStages = [...prev];
        newStages[0] = { ...newStages[0], status: 'completed', detail: 'MRZ data extracted successfully' };
        newStages[1] = { ...newStages[1], status: 'loading', detail: 'Cross-referencing facial geometry' };
        return newStages;
      });
    }, 1000);

    // 2. Face Matching complete after 2s
    const timer2 = setTimeout(() => {
      setStages(prev => {
        const newStages = [...prev];
        newStages[1] = { ...newStages[1], status: 'completed', detail: 'Match score: 98.2% (Confirmed)' };
        newStages[2] = { ...newStages[2], status: 'loading', detail: 'Querying Interpol & BSA DBs' };
        return newStages;
      });
    }, 2500);

    // 3. Database Query complete after 4s
    const timer3 = setTimeout(() => {
      setStages(prev => {
        const newStages = [...prev];
        newStages[2] = { ...newStages[2], status: 'completed', detail: 'No active warrants found' };
        newStages[3] = { ...newStages[3], status: 'loading', detail: 'Calculating risk profile' };
        return newStages;
      });
    }, 4000);

    // 4. Risk Assessment complete after 5.5s
    const timer4 = setTimeout(() => {
      setStages(prev => {
        const newStages = [...prev];
        newStages[3] = { ...newStages[3], status: 'completed', detail: 'Risk assessment: LOW' };
        return newStages;
      });
      if (onComplete) onComplete();
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="w-full bg-navy-800 p-6 border border-cyan/20 rounded-sm">
      <h3 className="font-bebas tracking-widest text-lg text-cyan mb-6 border-b border-cyan/20 pb-2">
        VERIFICATION PIPELINE
      </h3>
      <TimelineLog items={stages} />
    </div>
  );
}
