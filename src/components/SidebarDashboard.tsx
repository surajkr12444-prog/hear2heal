import React from 'react';
import {
  Mic,
  Sparkles,
  Activity,
  User,
  Siren,
  Pill,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Zap,
  Lock,
  HeartPulse,
  PanelLeftClose,
  LayoutDashboard,
  FileText
} from 'lucide-react';
import { ScreenId, Language } from '../types';

interface SidebarDashboardProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  patientLang: Language;
  doctorLang: Language;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const SidebarDashboard: React.FC<SidebarDashboardProps> = ({
  currentScreen,
  onNavigate,
  patientLang,
  doctorLang,
  isOpen = true,
  onToggle,
  className = ''
}) => {
  if (!isOpen) {
    return null;
  }

  const clinicalTools = [
    {
      id: 'splash' as ScreenId,
      label: 'Overview',
      sublabel: 'Clinical System Overview',
      icon: LayoutDashboard,
      badge: 'Start',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 'patient_translation' as ScreenId,
      label: 'Patient Translation',
      sublabel: 'AI Speech & Auto-Detect',
      icon: Mic,
      badge: 'AI Active',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'doctor_reply' as ScreenId,
      label: 'Doctor Reply',
      sublabel: 'Clinician Voice & Questions',
      icon: Sparkles,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'symptoms' as ScreenId,
      label: 'Symptoms Triage',
      sublabel: 'Clinical Checklist & Triage',
      icon: Activity,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'body_map' as ScreenId,
      label: 'Body Map',
      sublabel: 'Pain Point & Anatomy Locator',
      icon: User,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'history' as ScreenId,
      label: 'Conversation History',
      sublabel: 'Transcripts & Voice Logs',
      icon: FileText,
      badge: 'Logs',
      badgeColor: 'bg-slate-100 text-slate-700'
    }
  ];

  const emergencyTools = [
    {
      id: 'emergency' as ScreenId,
      label: 'Emergency SOS',
      sublabel: 'Immediate Resuscitation Protocol',
      icon: Siren,
      isEmergency: true,
      badge: 'CRITICAL',
      badgeColor: 'bg-red-600 text-white animate-pulse'
    },
    {
      id: 'medicine' as ScreenId,
      label: 'Prescriptions',
      sublabel: 'Dosage & Rx Translator',
      icon: Pill,
      isEmergency: false,
      badge: 'Rx',
      badgeColor: 'bg-blue-100 text-blue-800'
    }
  ];

  return (
    <aside
      className={`w-72 neu-bg border-r border-white/70 flex flex-col shrink-0 select-none neu-raised-sm transition-all duration-300 ease-in-out ${className}`}
    >
      {/* Sidebar Header / Hospital Ward Telemetry + Close/OFF Toggle */}
      <div className="p-3.5 border-b border-white/50 neu-bg flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl neu-convex text-blue-600 flex items-center justify-center border border-white/60">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-wider text-slate-800 uppercase">
              Dashboard
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">Hospital Triage Suite</p>
          </div>
        </div>

        {/* Dashboard Close / Collapse Button inside the sidebar */}
        {onToggle && (
          <button
            onClick={onToggle}
            className="w-7 h-7 rounded-lg neu-btn text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center justify-center group"
            title="Collapse Dashboard"
            aria-label="Collapse Dashboard"
          >
            <PanelLeftClose className="w-4 h-4 text-slate-500 group-hover:text-slate-800" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        {/* Group 1: Core Clinical Tools (With Overview 1st) */}
        <div>
          <div className="px-2.5 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-black tracking-wider text-slate-400 uppercase">
              Clinical Tools
            </span>
            <span className="text-[10px] font-bold text-slate-400">6 Tools</span>
          </div>

          <div className="space-y-1.5">
            {clinicalTools.map((item) => {
              const isActive = currentScreen === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'neu-btn-primary font-bold'
                      : 'neu-btn text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'neu-inset-sm text-slate-600 group-hover:text-blue-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold truncate">{item.label}</span>
                      </div>
                      <p
                        className={`text-[10px] truncate leading-tight mt-0.5 ${
                          isActive ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        {item.sublabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {item.badge && !isActive && (
                      <span
                        className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold neu-inset-sm ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Group 2: Emergency & Prescriptions */}
        <div>
          <div className="px-2.5 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-black tracking-wider text-slate-400 uppercase">
              Emergency & Care
            </span>
            <span className="text-[10px] font-bold text-red-500">Priority</span>
          </div>

          <div className="space-y-2">
            {emergencyTools.map((item) => {
              const isActive = currentScreen === item.id;
              const Icon = item.icon;

              if (item.isEmergency) {
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'neu-btn-sos ring-2 ring-red-300'
                        : 'neu-btn text-red-900 border border-red-200/80 hover:text-red-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive ? 'bg-white/20 text-white' : 'bg-red-600 text-white shadow-xs'
                        }`}
                      >
                        <Icon className="w-4 h-4 stroke-[2.4] animate-pulse" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black truncate">{item.label}</span>
                        </div>
                        <p
                          className={`text-[10px] truncate leading-tight mt-0.5 ${
                            isActive ? 'text-red-100' : 'text-red-700/80'
                          }`}
                        >
                          {item.sublabel}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[9px] font-black tracking-wider ${
                          isActive ? 'bg-white text-red-600' : 'bg-red-600 text-white animate-pulse'
                        }`}
                      >
                        SOS
                      </span>
                    </div>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'neu-btn-primary font-bold'
                      : 'neu-btn text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'neu-inset-sm text-slate-600 group-hover:text-blue-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold truncate">{item.label}</span>
                      </div>
                      <p
                        className={`text-[10px] truncate leading-tight mt-0.5 ${
                          isActive ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        {item.sublabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {item.badge && !isActive && (
                      <span
                        className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold neu-inset-sm ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Footer / Active Telemetry Card */}
      <div className="p-3 border-t border-white/50 neu-bg text-xs">
        <div className="p-3 neu-inset-sm rounded-2xl">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Active Pair</span>
            </span>
            <span className="text-[10px] text-emerald-600 font-extrabold">READY</span>
          </div>

          <div className="text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px]">Patient:</span>
              <span className="font-semibold text-slate-800">
                {patientLang.flag} {patientLang.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px]">Doctor:</span>
              <span className="font-semibold text-slate-800">
                {doctorLang.flag} {doctorLang.name}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 px-1 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Zero Cloud Leak</span>
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>HIPAA Safe</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
