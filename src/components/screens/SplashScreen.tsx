import React from 'react';
import {
  ShieldCheck,
  Stethoscope,
  Globe,
  Mic,
  ArrowRight,
  Siren,
  Activity,
  Layers,
  FileText,
  User,
  Zap,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { ScreenId } from '../../types';
import { motion } from 'motion/react';
import { EcgHeartbeatLine } from '../EcgHeartbeatLine';

interface SplashScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex-1 flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-8 neu-bg relative overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-100/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />

      {/* Hero Section */}
      <div className="relative max-w-4xl mx-auto w-full text-center pt-2 sm:pt-6">
        {/* Compliance / Offline Badge in Neumorphic Inset Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-inset-sm text-blue-700 text-xs font-semibold mb-6 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Local Engine · Zero Internet Required · HIPAA/GDPR Local Data</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Instant Medical Translation for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
            Emergency Care & Clinics
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Break language barriers between patients and doctors anywhere. Designed with bidirectional
          voice-to-voice translation, visual pain mapping, clinical symptom triage, and prescription instructions.
        </p>

        {/* Primary CTA Buttons with Tactile Neumorphic Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('patient_translation')}
            className="px-6 py-3.5 rounded-2xl neu-btn-primary font-bold text-sm sm:text-base flex items-center gap-2.5 cursor-pointer animate-pulse-glow"
          >
            <Mic className="w-5 h-5 animate-bounce" />
            <span>Open Translation Console</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('symptoms')}
            className="px-5 py-3.5 rounded-2xl neu-btn text-slate-700 font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Symptom Triage</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('emergency')}
            className="px-5 py-3.5 rounded-2xl neu-btn-sos font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer animate-pulse-glow-red"
          >
            <Siren className="w-4 h-4 text-white animate-heartbeat" />
            <span>Emergency SOS</span>
          </motion.button>
        </div>

        {/* Dynamic Mini Live Vital Waves & ECG Line in Sunken Groove */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full neu-inset-sm text-xs text-slate-600 mb-6">
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <Activity className="w-4 h-4 text-rose-500 animate-heartbeat" />
            <span>Vital Telemetry:</span>
          </span>
          <EcgHeartbeatLine color="#2563eb" height={18} speed="normal" className="w-24 sm:w-36" />
          <span className="text-[10px] font-black text-emerald-700 neu-inset-sm px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            LIVE
          </span>
        </div>
      </div>

      {/* 4 Feature Columns Grid with Neumorphic Extruded Cards */}
      <div className="relative max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-6">
        <div
          onClick={() => onNavigate('languages')}
          className="p-5 rounded-3xl neu-raised hover:scale-[1.02] transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl neu-inset-sm text-blue-600 flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">10+ Clinical Languages</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Offline speech recognition and synthesis for Hindi, Tamil, Telugu, Spanish, Arabic & more.
          </p>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Configure Models &rarr;
          </span>
        </div>

        <div
          onClick={() => onNavigate('symptoms')}
          className="p-5 rounded-3xl neu-raised hover:scale-[1.02] transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl neu-inset-sm text-indigo-600 flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6 group-hover:animate-heartbeat" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Rapid Symptom Triage</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Visual clinical icon cards for immediate communication during acute emergency conditions.
          </p>
          <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
            Assess Symptoms &rarr;
          </span>
        </div>

        <div
          onClick={() => onNavigate('body_map')}
          className="p-5 rounded-3xl neu-raised hover:scale-[1.02] transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl neu-inset-sm text-emerald-600 flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
            <User className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Anatomical Body Map</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Touch-localized pain mapping with severity slider (1-10) for non-verbal or non-fluent patients.
          </p>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
            Open Body Map &rarr;
          </span>
        </div>

        <div
          onClick={() => onNavigate('medicine')}
          className="p-5 rounded-3xl neu-raised hover:scale-[1.02] transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl neu-inset-sm text-amber-600 flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Prescription & Dosage</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Visual dosage schedules (Morning, Noon, Night, Meal instructions) with dual-language audio.
          </p>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
            Dosage Guide &rarr;
          </span>
        </div>
      </div>

      {/* Trust & Clinical Readiness Banner in Neumorphic Raised Surface */}
      <div className="relative max-w-5xl mx-auto w-full mt-6 p-4.5 rounded-3xl neu-raised flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl neu-inset-sm text-emerald-700 flex items-center justify-center font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Complete 10-Screen Clinical Architecture</h4>
            <p className="text-xs text-slate-500">All medical screens, audio synthesizers, and translation workflows active</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('patient_translation')}
            className="px-4 py-2.5 rounded-xl neu-btn-primary font-bold text-xs transition-colors cursor-pointer"
          >
            Launch Web Station
          </button>
        </div>
      </div>
    </div>
  );
};
