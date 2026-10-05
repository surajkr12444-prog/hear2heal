import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, Zap, Activity, Globe, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedBackground } from '../AnimatedBackground';
import { EcgHeartbeatLine } from '../EcgHeartbeatLine';

export interface AppUser {
  name: string;
  email: string;
}

interface LoginScreenProps {
  onLoginSuccess: (user: AppUser) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('demo@hear2heal.com');
  const [password, setPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: email.split('@')[0] || 'Clinician',
        email: email || 'demo@hear2heal.com'
      });
    }, 450);
  };

  const handleQuickDemoLogin = () => {
    setEmail('demo@hear2heal.com');
    setPassword('password123');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Emergency Doctor',
        email: 'demo@hear2heal.com'
      });
    }, 350);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-4 relative font-sans text-slate-100 overflow-hidden select-none">
      {/* Interactive Canvas Particles Background */}
      <AnimatedBackground opacity={0.7} />

      {/* Futuristic Aurora Gradient Lighting Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[130px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute top-10 right-1/3 w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none animate-float-slow" />

      {/* Ambient Floating Telemetry Badges (Desktop View) */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden xl:flex absolute top-28 left-20 items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl text-xs font-bold text-sky-200"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <Globe className="w-4 h-4 text-cyan-400" />
        <span>12+ Scripts / Presets Recognized</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden xl:flex absolute bottom-28 left-24 items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl text-xs font-bold text-emerald-200"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span>Core Offline Medical Engine</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="hidden xl:flex absolute top-36 right-20 items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl text-xs font-bold text-rose-200"
      >
        <Activity className="w-4 h-4 text-rose-400 animate-heartbeat" />
        <span>Instant Clinical Triage</span>
      </motion.div>

      {/* Main Login Station Container */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Logo & Name */}
        <div className="text-center mb-6">
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-blue-500/30 mb-3 cursor-pointer"
          >
            <span className="font-black text-2xl tracking-tight">H2H</span>
          </motion.div>

          <h1 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <span>Hear2Heal</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/20 border border-blue-400/30 text-cyan-300">
              Station
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
            Clinical Speech Translation & Emergency Triage Portal
          </p>
        </div>

        {/* High-Tech Glowing Card */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-900/85 backdrop-blur-xl border border-slate-700/80 shadow-2xl overflow-hidden ring-1 ring-white/10">
          {/* Subtle Ambient Border Light Sweep */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Real-time Glowing ECG Ticker at top of card */}
          <div className="mb-4 -mx-6 -mt-4 px-6 pt-3 pb-1 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <HeartPulse className="w-3.5 h-3.5 animate-heartbeat" />
                <span>Telemetry Monitor</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">BPM 72 · OK</span>
            </div>
            <EcgHeartbeatLine color="#06b6d4" height={28} speed="normal" />
          </div>

          <div className="mb-5 pb-3 border-b border-slate-800/80 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Staff Sign In</h2>
              <p className="text-[11px] text-slate-400">Authenticate to enter medical console</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Offline Capable</span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Username */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Staff ID / Work Email
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter staff ID or email"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-sm font-semibold rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-slate-800/90 text-white placeholder-slate-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">Authorization Code</label>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-9 pr-10 py-2.5 text-sm font-semibold rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-slate-800/90 text-white placeholder-slate-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-0.5 text-xs">
              <label className="flex items-center gap-2 text-slate-400 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/30"
                />
                <span>Keep session active</span>
              </label>
            </div>

            {/* Submit Button with motion spring */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Entering Portal...</span>
                </>
              ) : (
                <>
                  <span>Sign In & Enter Overview</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Quick 1-Click Demo Login */}
          <div className="mt-4 pt-4 border-t border-slate-800 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 hover:from-cyan-900/60 hover:to-blue-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>1-Click Instant Demo Login (Instant Overview) &rarr;</span>
            </motion.button>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-4 text-center text-xs text-slate-500 font-medium">
          Hear2Heal · Zero-Click AI Medical Translation Assistant
        </p>
      </motion.div>
    </div>
  );
};
