import React, { useState } from 'react';
import { ArrowLeft, ArrowDown, Volume2, Pill, FlaskRound as Flask, Syringe, Wind, Check } from 'lucide-react';
import { ScreenId, DosageType } from '../../types';
import { MEDICINE_PRESCRIPTIONS } from '../../data/mockData';
import { playTextToSpeech, stopTextToSpeech } from '../../utils/audio';

interface MedicineScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const MedicineScreen: React.FC<MedicineScreenProps> = ({ onNavigate }) => {
  const [selectedDosage, setSelectedDosage] = useState<DosageType>('tablet');
  const [isPlayingEnglish, setIsPlayingEnglish] = useState(false);
  const [isPlayingHindi, setIsPlayingHindi] = useState(false);

  const currentPrescription = MEDICINE_PRESCRIPTIONS[selectedDosage];

  const handlePlayEnglish = () => {
    if (isPlayingEnglish) {
      stopTextToSpeech();
      setIsPlayingEnglish(false);
      return;
    }
    playTextToSpeech(
      currentPrescription.englishInstruction,
      'en-US',
      () => setIsPlayingEnglish(true),
      () => setIsPlayingEnglish(false)
    );
  };

  const handlePlayHindi = () => {
    if (isPlayingHindi) {
      stopTextToSpeech();
      setIsPlayingHindi(false);
      return;
    }
    playTextToSpeech(
      currentPrescription.hindiInstruction,
      'hi-IN',
      () => setIsPlayingHindi(true),
      () => setIsPlayingHindi(false)
    );
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[640px] p-5 neu-bg relative">
      <div>
        {/* Neumorphic Header */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => onNavigate('doctor_reply')}
            className="neu-btn w-11 h-11 rounded-2xl flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Rx Instructions</h2>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Prescription & Dosage Audio</p>
          </div>
        </div>

        {/* Doctor Instruction Card (English) */}
        <div className="neu-raised p-5 rounded-3xl bg-[#e6ecf5]">
          <div className="flex items-center justify-between text-xs font-bold mb-3">
            <span className="flex items-center gap-2 text-blue-700 uppercase tracking-wider text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              Doctor Instruction (EN)
            </span>
            <button
              onClick={handlePlayEnglish}
              className={`neu-btn p-2 rounded-xl transition-all cursor-pointer ${
                isPlayingEnglish ? 'neu-inset text-blue-600 scale-95' : 'text-slate-700 hover:text-blue-600'
              }`}
              title="Play English Audio"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingEnglish ? 'animate-bounce' : ''}`} />
            </button>
          </div>

          <div className="neu-inset-sm p-4 rounded-2xl bg-[#e6ecf5]">
            <p className="text-slate-900 font-bold text-base leading-snug">
              {currentPrescription.englishInstruction}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="neu-inset-deep px-3 py-1.5 rounded-xl text-[11px] text-blue-700 font-mono font-bold tracking-tight">
              Schedule: {currentPrescription.schedule}
            </div>
            <div className="neu-inset-deep px-3 py-1.5 rounded-xl text-[11px] text-slate-600 font-mono font-bold tracking-tight">
              Duration: {currentPrescription.duration}
            </div>
          </div>
        </div>

        {/* Tactile Flow Indicator */}
        <div className="flex justify-center my-3.5">
          <div className="neu-inset w-9 h-9 rounded-full text-blue-600 flex items-center justify-center">
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Translated Instruction Card (Hindi) */}
        <div className="neu-raised p-5 rounded-3xl bg-[#e6ecf5] border-t-2 border-emerald-400/40">
          <div className="flex items-center justify-between text-xs font-bold mb-3">
            <span className="flex items-center gap-2 text-emerald-700 uppercase tracking-wider text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Translated for Patient (HI)
            </span>
            <button
              onClick={handlePlayHindi}
              className={`neu-btn p-2 rounded-xl transition-all cursor-pointer ${
                isPlayingHindi ? 'neu-inset text-emerald-600 scale-95' : 'text-slate-700 hover:text-emerald-600'
              }`}
              title="Play Hindi Audio"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingHindi ? 'animate-bounce' : ''}`} />
            </button>
          </div>

          <div className="neu-inset-sm p-4 rounded-2xl bg-[#e6ecf5]">
            <p className="text-slate-900 font-extrabold text-lg leading-relaxed">
              {currentPrescription.hindiInstruction}
            </p>
          </div>
        </div>
      </div>

      {/* Dosage Selector Navigation Bar at Bottom */}
      <div className="neu-raised p-4 rounded-3xl bg-[#e6ecf5] mt-4">
        <div className="text-[11px] font-black text-slate-500 mb-3 text-center uppercase tracking-wider">
          Select Dosage Format
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {/* Tablet */}
          <button
            type="button"
            onClick={() => setSelectedDosage('tablet')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer ${
              selectedDosage === 'tablet'
                ? 'neu-inset ring-2 ring-blue-500/50 bg-[#dee5ee] scale-[0.98]'
                : 'neu-btn hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 transition-all ${
              selectedDosage === 'tablet' ? 'neu-inset-sm bg-blue-600 text-white' : 'neu-inset-sm text-slate-700'
            }`}>
              <Pill className="w-4 h-4" />
            </div>
            <span className={`text-[11px] font-black ${selectedDosage === 'tablet' ? 'text-blue-700' : 'text-slate-700'}`}>Tablet</span>
          </button>

          {/* Syrup */}
          <button
            type="button"
            onClick={() => setSelectedDosage('syrup')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer ${
              selectedDosage === 'syrup'
                ? 'neu-inset ring-2 ring-blue-500/50 bg-[#dee5ee] scale-[0.98]'
                : 'neu-btn hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 transition-all ${
              selectedDosage === 'syrup' ? 'neu-inset-sm bg-blue-600 text-white' : 'neu-inset-sm text-slate-700'
            }`}>
              <Flask className="w-4 h-4" />
            </div>
            <span className={`text-[11px] font-black ${selectedDosage === 'syrup' ? 'text-blue-700' : 'text-slate-700'}`}>Syrup</span>
          </button>

          {/* Injection */}
          <button
            type="button"
            onClick={() => setSelectedDosage('injection')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer ${
              selectedDosage === 'injection'
                ? 'neu-inset ring-2 ring-blue-500/50 bg-[#dee5ee] scale-[0.98]'
                : 'neu-btn hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 transition-all ${
              selectedDosage === 'injection' ? 'neu-inset-sm bg-blue-600 text-white' : 'neu-inset-sm text-slate-700'
            }`}>
              <Syringe className="w-4 h-4" />
            </div>
            <span className={`text-[11px] font-black ${selectedDosage === 'injection' ? 'text-blue-700' : 'text-slate-700'}`}>Injection</span>
          </button>

          {/* Inhaler */}
          <button
            type="button"
            onClick={() => setSelectedDosage('inhaler')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer ${
              selectedDosage === 'inhaler'
                ? 'neu-inset ring-2 ring-blue-500/50 bg-[#dee5ee] scale-[0.98]'
                : 'neu-btn hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 transition-all ${
              selectedDosage === 'inhaler' ? 'neu-inset-sm bg-blue-600 text-white' : 'neu-inset-sm text-slate-700'
            }`}>
              <Wind className="w-4 h-4" />
            </div>
            <span className={`text-[11px] font-black ${selectedDosage === 'inhaler' ? 'text-blue-700' : 'text-slate-700'}`}>Inhaler</span>
          </button>
        </div>
      </div>
    </div>
  );
};
