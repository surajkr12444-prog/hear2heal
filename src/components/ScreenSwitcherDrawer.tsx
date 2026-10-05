import React from 'react';
import { X, Layers, Check, Sparkles, Shield, Languages, MessageSquare, Stethoscope, Activity, User, Siren, Pill, Clock, ArrowRight } from 'lucide-react';
import { ScreenId } from '../types';

interface ScreenSwitcherDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

interface ScreenInfo {
  id: ScreenId;
  number: number;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ReactNode;
}

const SCREENS_CONFIG: ScreenInfo[] = [
  {
    id: 'splash',
    number: 1,
    title: 'Splash / Landing Screen',
    subtitle: 'Branding, offline capabilities & get started CTA',
    category: 'Onboarding',
    icon: <Shield className="w-4 h-4 text-blue-600" />,
  },
  {
    id: 'languages',
    number: 2,
    title: 'Language Selection',
    subtitle: 'From/To language pickers, swap & offline pack status',
    category: 'Setup',
    icon: <Languages className="w-4 h-4 text-cyan-600" />,
  },
  {
    id: 'patient_translation',
    number: 3,
    title: 'Main Translation Screen',
    subtitle: 'Patient mode with audio waves & critical symptom alert',
    category: 'Translation',
    icon: <MessageSquare className="w-4 h-4 text-blue-600" />,
  },
  {
    id: 'doctor_reply',
    number: 4,
    title: 'Doctor Reply',
    subtitle: 'Doctor question input & patient translated output',
    category: 'Translation',
    icon: <Stethoscope className="w-4 h-4 text-rose-600" />,
  },
  {
    id: 'symptoms',
    number: 5,
    title: 'Quick Symptom Selection',
    subtitle: '2-column pastel cards with audio pronunciation',
    category: 'Clinical',
    icon: <Activity className="w-4 h-4 text-orange-500" />,
  },
  {
    id: 'body_map',
    number: 6,
    title: 'Body Map Screen',
    subtitle: 'Interactive front/back silhouette & pain severity dial',
    category: 'Clinical',
    icon: <User className="w-4 h-4 text-indigo-600" />,
  },
  {
    id: 'emergency',
    number: 7,
    title: 'Emergency / SOS Mode',
    subtitle: 'High-contrast red triage tiles & doctor audio broadcast',
    category: 'Urgent Care',
    icon: <Siren className="w-4 h-4 text-red-600" />,
  },
  {
    id: 'medicine',
    number: 8,
    title: 'Medicine Instructions',
    subtitle: 'Dosage translator for tablet, syrup, injection, inhaler',
    category: 'Pharmacy',
    icon: <Pill className="w-4 h-4 text-emerald-600" />,
  },
  {
    id: 'history',
    number: 9,
    title: 'Conversation History',
    subtitle: 'Chronological transcript with audio replay and timestamps',
    category: 'Records',
    icon: <Clock className="w-4 h-4 text-slate-600" />,
  },
  {
    id: 'profile',
    number: 10,
    title: 'Patient Profile (Optional)',
    subtitle: 'Encrypted offline records: blood group, allergies, meds',
    category: 'Records',
    icon: <User className="w-4 h-4 text-blue-600" />,
  },
];

export const ScreenSwitcherDrawer: React.FC<ScreenSwitcherDrawerProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onSelectScreen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-lg neu-bg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-slide-up border border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 px-5 neu-raised rounded-t-3xl sm:rounded-3xl flex items-center justify-between m-2.5 mb-1.5">
          <div className="flex items-center gap-3">
            <div className="neu-inset-sm w-9 h-9 rounded-xl text-blue-600 flex items-center justify-center">
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">Hear2Heal Screen Index</h3>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fast Navigation (10 Clinical Views)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="neu-btn w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list of 10 screens */}
        <div className="p-3.5 space-y-2.5 overflow-y-auto flex-1">
          {SCREENS_CONFIG.map((scr) => {
            const isActive = currentScreen === scr.id;
            return (
              <button
                key={scr.id}
                onClick={() => {
                  onSelectScreen(scr.id);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                  isActive
                    ? 'neu-inset ring-2 ring-blue-500/50 bg-[#dee5ee] scale-[0.99]'
                    : 'neu-raised hover:scale-[1.01] active:scale-[0.98]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Screen Number Badge */}
                  <span
                    className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'neu-btn-primary text-white shadow-xs'
                        : 'neu-inset-deep text-slate-700'
                    }`}
                  >
                    {scr.number}
                  </span>

                  <div className="neu-inset-sm w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                    {scr.icon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-black ${isActive ? 'text-blue-900' : 'text-slate-900'}`}>
                        {scr.title}
                      </span>
                      <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded-md neu-inset-deep text-slate-500">
                        {scr.category}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 line-clamp-1">{scr.subtitle}</p>
                  </div>
                </div>

                <div className="pl-2">
                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-blue-700 neu-inset-sm px-2.5 py-1 rounded-xl">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Active
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 mx-3 mb-3 neu-inset-deep rounded-2xl text-center">
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
            Offline Clinical Engine · Tactical Neumorphic UI v3.0
          </p>
        </div>
      </div>
    </div>
  );
};
