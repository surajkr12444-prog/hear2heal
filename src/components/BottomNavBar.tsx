import React from 'react';
import { Mic, Activity, User, Siren, Pill, Layers } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenDrawer: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  onOpenDrawer,
}) => {
  // Don't show bottom nav on splash screen for clean initial view
  if (currentScreen === 'splash') {
    return null;
  }

  const isTranslateActive = currentScreen === 'patient_translation' || currentScreen === 'doctor_reply';
  const isSymptomsActive = currentScreen === 'symptoms';
  const isBodyMapActive = currentScreen === 'body_map';
  const isEmergencyActive = currentScreen === 'emergency';
  const isMedicineActive = currentScreen === 'medicine';

  return (
    <div className="neu-bg px-2 sm:px-3 py-2.5 flex items-center justify-around sm:justify-center sm:gap-2.5 md:gap-4 z-20 shrink-0 border-t border-white/60">
      {/* 1. Translate */}
      <button
        onClick={() => onNavigate('patient_translation')}
        className={`flex sm:flex-row flex-col items-center gap-1 sm:gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl transition-all cursor-pointer ${
          isTranslateActive ? 'neu-inset ring-1 ring-blue-500/40 text-blue-700 font-black' : 'neu-btn text-slate-700 hover:text-slate-900'
        }`}
      >
        <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
        <span className="text-[10px] sm:text-xs font-bold">Translate</span>
      </button>

      {/* 2. Symptoms */}
      <button
        onClick={() => onNavigate('symptoms')}
        className={`flex sm:flex-row flex-col items-center gap-1 sm:gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl transition-all cursor-pointer ${
          isSymptomsActive ? 'neu-inset ring-1 ring-blue-500/40 text-blue-700 font-black' : 'neu-btn text-slate-700 hover:text-slate-900'
        }`}
      >
        <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
        <span className="text-[10px] sm:text-xs font-bold">Symptoms</span>
      </button>

      {/* 3. Body Map */}
      <button
        onClick={() => onNavigate('body_map')}
        className={`flex sm:flex-row flex-col items-center gap-1 sm:gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl transition-all cursor-pointer ${
          isBodyMapActive ? 'neu-inset ring-1 ring-blue-500/40 text-blue-700 font-black' : 'neu-btn text-slate-700 hover:text-slate-900'
        }`}
      >
        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
        <span className="text-[10px] sm:text-xs font-bold">Body Map</span>
      </button>

      {/* 4. SOS Mode */}
      <button
        onClick={() => onNavigate('emergency')}
        className={`relative flex sm:flex-row flex-col items-center gap-1 sm:gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl transition-all cursor-pointer ${
          isEmergencyActive ? 'neu-inset ring-1 ring-red-500/50 text-red-600 font-black' : 'neu-btn text-red-600 font-bold'
        }`}
      >
        <div className="relative">
          <Siren className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        </div>
        <span className="text-[10px] sm:text-xs font-bold">SOS</span>
      </button>

      {/* 5. Prescription */}
      <button
        onClick={() => onNavigate('medicine')}
        className={`flex sm:flex-row flex-col items-center gap-1 sm:gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl transition-all cursor-pointer ${
          isMedicineActive ? 'neu-inset ring-1 ring-blue-500/40 text-blue-700 font-black' : 'neu-btn text-slate-700 hover:text-slate-900'
        }`}
      >
        <Pill className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
        <span className="text-[10px] sm:text-xs font-bold">Rx</span>
      </button>

      {/* 6. All 10 Screens Drawer Button */}
      <button
        onClick={onOpenDrawer}
        className="neu-btn flex sm:flex-row flex-col items-center gap-1 sm:gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl text-slate-700 hover:text-blue-700 transition-all cursor-pointer"
        title="View All 10 Screens"
      >
        <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
        <span className="text-[10px] sm:text-xs font-bold">Index</span>
      </button>
    </div>
  );
};
