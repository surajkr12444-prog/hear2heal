import React, { useState } from 'react';
import { ArrowLeft, BellRing, Volume2, HeartCrack, Droplets, UserX, AlertTriangle, Baby, Siren } from 'lucide-react';
import { ScreenId, EmergencyAction } from '../../types';
import { EMERGENCY_ACTIONS } from '../../data/mockData';
import { playTextToSpeech, stopTextToSpeech } from '../../utils/audio';
import { LungsIcon } from '../icons/MedicalIcons';

interface EmergencyScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({ onNavigate }) => {
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyAction>(EMERGENCY_ACTIONS[1]); // Default severe chest pain
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayDoctorLanguage = () => {
    if (isPlayingAudio) {
      stopTextToSpeech();
      setIsPlayingAudio(false);
      return;
    }

    const doctorEmergencyAnnouncement = `Medical emergency! The patient reports: ${selectedEmergency.title}. ${selectedEmergency.detail}. Immediate doctor assistance required!`;
    
    playTextToSpeech(
      doctorEmergencyAnnouncement,
      'en-US',
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  const renderEmergencyIcon = (id: string) => {
    switch (id) {
      case 'cant_breathe':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
            <LungsIcon className="w-7 h-7" />
          </div>
        );
      case 'chest_pain':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
            <HeartCrack className="w-7 h-7" />
          </div>
        );
      case 'bleeding':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
            <Droplets className="w-7 h-7" />
          </div>
        );
      case 'unconscious':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
            <UserX className="w-7 h-7" />
          </div>
        );
      case 'allergy':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle className="w-7 h-7" />
          </div>
        );
      case 'pregnancy':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
            <Baby className="w-7 h-7" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[640px] neu-bg relative">
      {/* Neumorphic Emergency Banner Header */}
      <div className="p-4">
        <div className="neu-btn-sos px-4 py-3.5 rounded-2xl flex items-center justify-between text-white shadow-lg">
          <button
            onClick={() => onNavigate('patient_translation')}
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Back to Translation"
            title="Back to Patient Translation"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Siren className="w-5 h-5 animate-bounce text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Emergency Protocol</h2>
              <p className="text-[10px] text-red-100 font-semibold uppercase tracking-wider">Priority Red Alert</p>
            </div>
          </div>

          <div className="w-10"></div>
        </div>
      </div>

      {/* 6 Tactile Quick-Action Emergency Tiles */}
      <div className="px-5 py-2 flex-1 overflow-y-auto">
        <div className="mb-3 text-center">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Tap critical condition to alert medical team
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {EMERGENCY_ACTIONS.map((item) => {
            const isSelected = selectedEmergency.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedEmergency(item)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all cursor-pointer text-center group ${
                  isSelected
                    ? 'neu-inset ring-2 ring-red-500/60 bg-[#dee5ee] scale-[0.98]'
                    : 'neu-raised hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isSelected ? 'neu-inset-sm bg-red-100 text-red-600' : 'neu-inset-sm bg-white/60 text-red-600'
                }`}>
                  {renderEmergencyIcon(item.id)}
                </div>

                <span className="mt-3 text-xs font-black text-slate-800 leading-tight">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 font-bold">
                  {item.hindiTitle}
                </span>

                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Emergency Preview Banner in Inset Well */}
        <div className="mt-4 p-4 neu-inset-sm rounded-2xl bg-[#e6ecf5]">
          <div className="flex items-center justify-between text-[11px] font-black text-red-600 mb-1.5 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
              Selected Emergency
            </span>
            <span className="text-slate-500 font-bold">Hindi &rarr; English</span>
          </div>
          <div className="text-sm font-black text-slate-900">
            "{selectedEmergency.hindiTitle}"
          </div>
          <div className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
            &rarr; <span className="font-bold text-slate-800">{selectedEmergency.title}</span>: {selectedEmergency.detail}
          </div>
        </div>
      </div>

      {/* Bottom Tactile High-Priority Emergency Broadcast Button */}
      <div className="p-5 pt-3">
        <button
          onClick={handlePlayDoctorLanguage}
          className={`w-full py-4 px-5 rounded-2xl text-white font-extrabold flex items-center justify-center gap-3 transition-all cursor-pointer ${
            isPlayingAudio
              ? 'neu-btn-sos scale-[0.98] ring-4 ring-red-300'
              : 'neu-btn-sos hover:scale-[1.01] active:scale-[0.98]'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
            {isPlayingAudio ? (
              <Volume2 className="w-6 h-6 animate-pulse" />
            ) : (
              <BellRing className="w-6 h-6 animate-bounce" />
            )}
          </div>
          <div className="text-left">
            <div className="text-base font-black tracking-tight">Play in Doctor Language</div>
            <div className="text-[11px] text-red-100 font-medium">Broadcast immediate audio alert to clinical team</div>
          </div>
        </button>
      </div>
    </div>
  );
};
