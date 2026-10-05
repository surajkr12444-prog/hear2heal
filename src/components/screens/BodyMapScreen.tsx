import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldAlert } from 'lucide-react';
import { ScreenId, PainSeverity } from '../../types';

interface BodyMapScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedLocation: string;
  onSelectLocation: (loc: string) => void;
  painSeverity: PainSeverity;
  onChangeSeverity: (severity: PainSeverity) => void;
}

interface BodyRegion {
  id: string;
  name: string;
  hindiName: string;
  cx: number;
  cy: number;
  r: number;
  view: 'front' | 'back' | 'both';
}

const BODY_REGIONS: BodyRegion[] = [
  { id: 'head', name: 'Head', hindiName: 'सिर', cx: 100, cy: 35, r: 12, view: 'both' },
  { id: 'chest', name: 'Chest', hindiName: 'सीना', cx: 100, cy: 80, r: 16, view: 'front' },
  { id: 'upper_back', name: 'Upper Back', hindiName: 'पीठ का ऊपरी हिस्सा', cx: 100, cy: 80, r: 16, view: 'back' },
  { id: 'stomach', name: 'Stomach', hindiName: 'पेट', cx: 100, cy: 118, r: 14, view: 'front' },
  { id: 'lower_back', name: 'Lower Back', hindiName: 'कमर का निचला हिस्सा', cx: 100, cy: 118, r: 14, view: 'back' },
  { id: 'right_shoulder', name: 'Right Shoulder', hindiName: 'दायां कंधा', cx: 65, cy: 68, r: 10, view: 'both' },
  { id: 'left_shoulder', name: 'Left Shoulder', hindiName: 'बायां कंधा', cx: 135, cy: 68, r: 10, view: 'both' },
  { id: 'knees', name: 'Knees / Joints', hindiName: 'घुटने और जोड़', cx: 100, cy: 220, r: 13, view: 'both' },
];

export const BodyMapScreen: React.FC<BodyMapScreenProps> = ({
  onNavigate,
  selectedLocation,
  onSelectLocation,
  painSeverity,
  onChangeSeverity,
}) => {
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [confirmed, setConfirmed] = useState(false);

  const activeRegion = BODY_REGIONS.find((r) => r.id === selectedLocation) || BODY_REGIONS[1];

  const handleSelectRegion = (regionId: string) => {
    onSelectLocation(regionId);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      onNavigate('emergency');
    }, 400);
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[640px] p-5 neu-bg relative overflow-y-auto">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => onNavigate('symptoms')}
            className="w-10 h-10 rounded-2xl neu-btn flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Select Pain Location</h2>
            <p className="text-xs text-slate-500">Tap on the body part to pinpoint pain</p>
          </div>
        </div>

        {/* Main Canvas Area: Silhouette on Left, Pain Level Card on Right */}
        <div className="relative mt-2 grid grid-cols-12 gap-3.5 items-center min-h-[360px]">
          {/* Silhouette Left Column (Cols 1-7) */}
          <div className="col-span-7 relative flex items-center justify-center py-3 neu-raised rounded-3xl">
            <svg
              viewBox="0 0 200 320"
              className="w-full max-h-[350px] filter drop-shadow-sm select-none"
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#bfdbfe" />
                  <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Anatomical Human Body Silhouette Path */}
              {currentView === 'front' ? (
                <g fill="url(#bodyGrad)" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round">
                  {/* Head */}
                  <ellipse cx="100" cy="35" rx="16" ry="21" />
                  {/* Neck */}
                  <path d="M93 54 L93 64 L107 64 L107 54 Z" />
                  {/* Torso & Arms */}
                  <path d="M93 64 C80 64 68 68 55 78 C50 82 46 95 44 115 C42 135 38 160 35 175 C34 180 38 184 43 182 C48 180 54 150 58 135 L62 132 L66 175 C68 190 74 198 84 200 L84 240 C84 270 82 290 80 305 C79 312 86 316 91 315 C96 314 98 290 98 250 L102 250 C102 290 104 314 109 315 C114 316 121 312 120 305 C118 290 116 270 116 240 L116 200 C126 198 132 190 134 175 L138 132 L142 135 C146 150 152 180 157 182 C162 184 166 180 165 175 C162 160 158 135 156 115 C154 95 150 82 145 78 C132 68 120 64 107 64 Z" />
                  {/* Pectoral line hint */}
                  <path d="M85 85 Q100 90 115 85" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.6" />
                  {/* Abdominal center line */}
                  <line x1="100" y1="95" x2="100" y2="135" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                </g>
              ) : (
                <g fill="url(#bodyGrad)" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round">
                  {/* Back Head */}
                  <ellipse cx="100" cy="35" rx="16" ry="21" />
                  {/* Neck */}
                  <path d="M93 54 L93 64 L107 64 L107 54 Z" />
                  {/* Back Torso */}
                  <path d="M93 64 C80 64 68 68 55 78 C50 82 46 95 44 115 C42 135 38 160 35 175 C34 180 38 184 43 182 C48 180 54 150 58 135 L62 132 L66 175 C68 190 74 198 84 200 L84 240 C84 270 82 290 80 305 C79 312 86 316 91 315 C96 314 98 290 98 250 L102 250 C102 290 104 314 109 315 C114 316 121 312 120 305 C118 290 116 270 116 240 L116 200 C126 198 132 190 134 175 L138 132 L142 135 C146 150 152 180 157 182 C162 184 166 180 165 175 C162 160 158 135 156 115 C154 95 150 82 145 78 C132 68 120 64 107 64 Z" />
                  {/* Spine line */}
                  <line x1="100" y1="65" x2="100" y2="165" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
                  {/* Scapula curves */}
                  <path d="M80 85 C75 92 78 105 84 108" stroke="#2563eb" strokeWidth="1.2" fill="none" opacity="0.6" />
                  <path d="M120 85 C125 92 122 105 116 108" stroke="#2563eb" strokeWidth="1.2" fill="none" opacity="0.6" />
                </g>
              )}

              {/* Interactive Pain Pins & Glowing Target Rings */}
              {BODY_REGIONS.filter(
                (r) => r.view === 'both' || r.view === currentView
              ).map((region) => {
                const isSelected = selectedLocation === region.id;
                return (
                  <g
                    key={region.id}
                    onClick={() => handleSelectRegion(region.id)}
                    className="cursor-pointer"
                  >
                    {isSelected && (
                      <>
                        <circle
                          cx={region.cx}
                          cy={region.cy}
                          r={region.r + 14}
                          fill="#ef4444"
                          fillOpacity="0.2"
                          className="animate-ping"
                        />
                        <circle
                          cx={region.cx}
                          cy={region.cy}
                          r={region.r + 8}
                          fill="#ef4444"
                          fillOpacity="0.35"
                          filter="url(#glow)"
                        />
                      </>
                    )}

                    <circle
                      cx={region.cx}
                      cy={region.cy}
                      r={region.r}
                      fill={isSelected ? '#ef4444' : '#3b82f6'}
                      fillOpacity={isSelected ? 0.85 : 0.4}
                      stroke={isSelected ? '#b91c1c' : '#1d4ed8'}
                      strokeWidth="2"
                      className="transition-all hover:fill-opacity-90"
                    />

                    <circle
                      cx={region.cx}
                      cy={region.cy}
                      r="3.5"
                      fill="#ffffff"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Pain Level Controls Right Column (Cols 8-12) */}
          <div className="col-span-5 flex flex-col justify-center space-y-3">
            <div className="p-4 neu-raised rounded-3xl">
              <div className="text-center pb-2.5 border-b border-white/60">
                <span className="text-base font-bold text-slate-900 block">
                  {activeRegion.name}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeRegion.hindiName}
                </span>
              </div>

              <div className="mt-2.5">
                <span className="block text-[11px] font-semibold text-slate-500 mb-2 text-center">
                  Select Pain Level
                </span>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => onChangeSeverity('mild')}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      painSeverity === 'mild'
                        ? 'neu-inset text-amber-900 border-2 border-amber-500/60 font-bold'
                        : 'neu-btn text-slate-700'
                    }`}
                  >
                    <span>Mild</span>
                    <span className="text-[10px] opacity-80">1-3</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangeSeverity('moderate')}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      painSeverity === 'moderate'
                        ? 'neu-inset text-orange-900 border-2 border-orange-500/60 font-bold'
                        : 'neu-btn text-slate-700'
                    }`}
                  >
                    <span>Moderate</span>
                    <span className="text-[10px] opacity-80">4-6</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangeSeverity('severe')}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      painSeverity === 'severe'
                        ? 'neu-inset text-red-900 border-2 border-red-500/60 font-bold'
                        : 'neu-btn text-slate-700'
                    }`}
                  >
                    <span>Severe</span>
                    <span className="text-[10px] opacity-90">7-10</span>
                  </button>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="button"
                onClick={handleConfirm}
                className="mt-4 w-full py-2.5 px-3 rounded-xl neu-btn-primary font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {confirmed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Confirm Location</span>
                )}
              </button>
            </div>

            {/* Quick alert reminder */}
            {painSeverity === 'severe' && (
              <div className="p-2.5 neu-raised rounded-2xl border border-red-300 text-[10px] text-red-700 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>Requires immediate triage</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Front / Back Silhouette View Toggle */}
      <div className="pt-4 border-t border-white/60 mt-3">
        <div className="p-1 neu-inset-sm rounded-2xl flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentView('front')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              currentView === 'front'
                ? 'neu-btn-primary'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Front View
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('back')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              currentView === 'back'
                ? 'neu-btn-primary'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Back View
          </button>
        </div>
      </div>
    </div>
  );
};
