import React from 'react';
import { ScreenId } from '../types';
import { ShieldCheck, HeartPulse, Lock, Globe } from 'lucide-react';

interface MobileFrameProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenDrawer: () => void;
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  currentScreen,
  onNavigate,
  onOpenDrawer,
  children,
}) => {
  return (
    <div className="relative w-full flex-1 flex flex-col h-full min-h-0 neu-bg">
      {/* Website Main Workspace */}
      <div className="flex-1 w-full overflow-y-auto relative flex flex-col">
        <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col p-3 sm:p-6 lg:p-8">
          {children}
        </div>

        {/* Website Clinical Footer - Neumorphic Soft Bevel */}
        <footer className="mt-auto border-t border-white/60 neu-bg py-4 px-6 text-xs text-slate-500 neu-raised-sm">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span className="font-bold text-slate-800">Hear2Heal Medical Web Portal</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">Offline Speech & Triage Suite</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-600">
              <span className="inline-flex items-center gap-1.5 neu-inset-sm px-2.5 py-1 rounded-xl">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Zero Cloud Upload</span>
              </span>
              <span className="inline-flex items-center gap-1.5 neu-inset-sm px-2.5 py-1 rounded-xl">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>HIPAA / Clinical Offline Spec</span>
              </span>
              <button
                onClick={onOpenDrawer}
                className="neu-btn px-3 py-1 rounded-xl text-blue-600 font-bold hover:text-blue-700 cursor-pointer"
              >
                10-Screen Switcher
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
