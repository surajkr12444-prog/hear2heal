/**
 * Hear2Heal - Offline Medical Translation Assistant
 * Production Web Portal
 */

import React, { useEffect, useState } from 'react';
import {
  Layers,
  Menu,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRightLeft,
  Mic,
  Activity,
  User,
  Siren,
  Pill,
  Globe,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Wifi,
  WifiOff
} from 'lucide-react';
import { ScreenId, Language, PainSeverity, PatientProfile } from './types';
import { LANGUAGES, INITIAL_PATIENT_PROFILE } from './data/mockData';
import { MobileFrame } from './components/MobileFrame';
import { ScreenSwitcherDrawer } from './components/ScreenSwitcherDrawer';
import { SidebarDashboard } from './components/SidebarDashboard';
import { AllScreensGallery } from './components/AllScreensGallery';
import { LoginScreen, AppUser } from './components/screens/LoginScreen';
import { SplashScreen } from './components/screens/SplashScreen';
import { LanguageSelectScreen } from './components/screens/LanguageSelectScreen';
import { PatientTranslationScreen } from './components/screens/PatientTranslationScreen';
import { DoctorReplyScreen } from './components/screens/DoctorReplyScreen';
import { QuickSymptomScreen } from './components/screens/QuickSymptomScreen';
import { BodyMapScreen } from './components/screens/BodyMapScreen';
import { EmergencyScreen } from './components/screens/EmergencyScreen';
import { MedicineScreen } from './components/screens/MedicineScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { AnimatedBackground } from './components/AnimatedBackground';
import { loadPatientProfile, savePatientProfile } from './utils/offlineStorage';
import { EcgHeartbeatLine } from './components/EcgHeartbeatLine';

export default function App() {
  // Authentication State (Default: false to show Login first)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

  // Current active screen (when logged in, starts in Overview 'splash')
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [viewMode, setViewMode] = useState<'device' | 'gallery'>('device');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Left Dashboard Sidebar ON / OFF state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // App-wide state shared across screens
  const [patientLang, setPatientLang] = useState<Language>(LANGUAGES[0]); // Hindi
  const [doctorLang, setDoctorLang] = useState<Language>(LANGUAGES[1]); // English
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['chest_pain', 'breathing']);
  const [selectedLocation, setSelectedLocation] = useState<string>('chest');
  const [painSeverity, setPainSeverity] = useState<PainSeverity>('severe');
  const [patientProfile, setPatientProfile] = useState<PatientProfile>(() =>
    loadPatientProfile(INITIAL_PATIENT_PROFILE)
  );
  const [isOnline, setIsOnline] = useState<boolean>(() => navigator.onLine);

  useEffect(() => {
    const syncNetwork = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', syncNetwork);
    window.addEventListener('offline', syncNetwork);
    return () => {
      window.removeEventListener('online', syncNetwork);
      window.removeEventListener('offline', syncNetwork);
    };
  }, []);

  useEffect(() => {
    savePatientProfile(patientProfile);
  }, [patientProfile]);

  // Handle successful login -> Redirects directly to Overview ('splash')
  const handleLoginSuccess = (user: AppUser) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentScreen('splash'); // 1st me hi login karke hi overview me enter karega
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Swap languages
  const handleSwapLanguages = () => {
    const temp = patientLang;
    setPatientLang(doctorLang);
    setDoctorLang(temp);
  };

  // Toggle symptoms
  const handleToggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset to initial demo state
  const handleResetDemo = () => {
    setCurrentScreen('splash');
    setPatientLang(LANGUAGES[0]);
    setDoctorLang(LANGUAGES[1]);
    setSelectedSymptoms(['chest_pain', 'breathing']);
    setSelectedLocation('chest');
    setPainSeverity('severe');
    setPatientProfile(INITIAL_PATIENT_PROFILE);
  };

  // Render current screen inside the web frame
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onNavigate={setCurrentScreen} />;
      case 'languages':
        return (
          <LanguageSelectScreen
            onNavigate={setCurrentScreen}
            patientLang={patientLang}
            doctorLang={doctorLang}
            onSelectPatientLang={setPatientLang}
            onSelectDoctorLang={setDoctorLang}
            onSwapLanguages={handleSwapLanguages}
          />
        );
      case 'patient_translation':
        return (
          <PatientTranslationScreen
            onNavigate={setCurrentScreen}
            patientLang={patientLang}
            doctorLang={doctorLang}
            onSelectPatientLang={setPatientLang}
            onSelectDoctorLang={setDoctorLang}
          />
        );
      case 'doctor_reply':
        return (
          <DoctorReplyScreen
            onNavigate={setCurrentScreen}
            patientLang={patientLang}
            doctorLang={doctorLang}
          />
        );
      case 'symptoms':
        return (
          <QuickSymptomScreen
            onNavigate={setCurrentScreen}
            selectedSymptoms={selectedSymptoms}
            onToggleSymptom={handleToggleSymptom}
          />
        );
      case 'body_map':
        return (
          <BodyMapScreen
            onNavigate={setCurrentScreen}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            painSeverity={painSeverity}
            onChangeSeverity={setPainSeverity}
          />
        );
      case 'emergency':
        return <EmergencyScreen onNavigate={setCurrentScreen} />;
      case 'medicine':
        return <MedicineScreen onNavigate={setCurrentScreen} />;
      case 'history':
        return <HistoryScreen onNavigate={setCurrentScreen} />;
      case 'profile':
        return (
          <ProfileScreen
            onNavigate={setCurrentScreen}
            profile={patientProfile}
            onSaveProfile={setPatientProfile}
          />
        );
      default:
        return <SplashScreen onNavigate={setCurrentScreen} />;
    }
  };

  // If user is not yet logged in, show the LoginScreen first
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="h-screen w-screen neu-bg flex flex-col font-sans text-slate-800 overflow-hidden relative">
      {/* Interactive Medical Canvas Background */}
      <AnimatedBackground opacity={0.2} />

      {/* Top Website Header with Soft Extruded Neumorphic Bevel */}
      <header className="sticky top-0 z-40 neu-bg border-b border-white/80 neu-raised-sm shrink-0">
        <div className="w-full px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          {/* Brand Logo & Name (Left Corner) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentScreen('splash')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-2xl neu-convex text-blue-600 flex items-center justify-center font-black text-xs border border-white/60 group-hover:scale-105 transition-transform">
                <span className="tracking-tight">H2H</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-base tracking-tight">
                    Hear2Heal
                  </span>
                  <span
                    className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold neu-inset-sm ${
                      isOnline
                        ? 'text-emerald-800'
                        : 'text-slate-900'
                    }`}
                    title={isOnline ? 'App shell is cached for offline use after first load' : 'No network detected. Local features remain available.'}
                  >
                    {isOnline ? <Wifi className="w-3 h-3 text-emerald-600" /> : <WifiOff className="w-3 h-3" />}
                    {isOnline ? 'Offline Capable' : 'Offline Active'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                  Clinical Triage & Speech Translation Suite
                </p>
              </div>
            </button>
          </div>

          {/* Active Language Pair Quick Bar (Center) - Carved Sunken Well */}
          <div className="hidden sm:flex items-center gap-1.5 neu-inset-sm rounded-2xl px-3 py-1.5 text-xs">
            <button
              onClick={() => setCurrentScreen('languages')}
              className="font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 cursor-pointer"
              title="Change Patient Language"
            >
              <span>{patientLang.flag}</span>
              <span className="font-bold">{patientLang.name}</span>
              <span className="text-[10px] text-slate-400 font-normal hidden lg:inline">
                (Patient)
              </span>
            </button>

            <button
              onClick={handleSwapLanguages}
              className="w-6 h-6 rounded-xl neu-btn flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all cursor-pointer hover:rotate-180 duration-300"
              title="Swap Languages"
            >
              <ArrowRightLeft className="w-3 h-3" />
            </button>

            <button
              onClick={() => setCurrentScreen('languages')}
              className="font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 cursor-pointer"
              title="Change Doctor Language"
            >
              <span>{doctorLang.flag}</span>
              <span className="font-bold">{doctorLang.name}</span>
              <span className="text-[10px] text-slate-400 font-normal hidden lg:inline">
                (Doctor)
              </span>
            </button>
          </div>

          {/* TOP RIGHT CORNER: Profile, Languages, SOS, Clinician Info & Logout */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* 1. Patient Profile */}
            <button
              onClick={() => setCurrentScreen('profile')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentScreen === 'profile'
                  ? 'neu-btn-primary font-bold'
                  : 'neu-btn text-slate-700'
              }`}
              title="Patient Profile & Allergies"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Profile</span>
            </button>

            {/* 3. Languages */}
            <button
              onClick={() => setCurrentScreen('languages')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentScreen === 'languages'
                  ? 'neu-btn-primary font-bold'
                  : 'neu-btn text-slate-700'
              }`}
              title="Manage Offline Language Packs"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Languages</span>
            </button>

            {/* 4. Quick Emergency SOS Button */}
            <button
              onClick={() => setCurrentScreen('emergency')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 neu-btn-sos transition-all cursor-pointer animate-pulse-glow-red"
              title="Emergency SOS Protocol"
            >
              <Siren className="w-3.5 h-3.5 animate-heartbeat" />
              <span>SOS</span>
            </button>

            {/* Logged-in User Badge */}
            {currentUser && (
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 neu-inset-sm rounded-xl text-xs text-slate-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="truncate max-w-[130px]">{currentUser.name}</span>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl neu-btn text-slate-600 hover:text-red-600 transition-all cursor-pointer ml-0.5"
              title="Lock / Sign Out of Portal"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Screens List Drawer Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-8 h-8 rounded-xl neu-btn text-slate-700 flex items-center justify-center transition-all cursor-pointer"
              title="All Screens Drawer"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Continuous ECG Vital Signs Telemetry Line beneath Header */}
        <EcgHeartbeatLine color="#2563eb" height={10} speed="normal" className="neu-inset-sm border-t border-white/50" />
      </header>

      {/* Main Layout: Left Side Dashboard + Right Workspace Content */}
      <div className="flex-1 flex flex-row w-full min-h-0 overflow-hidden relative">
        {/* LEFT SIDE DASHBOARD */}
        <SidebarDashboard
          currentScreen={currentScreen}
          onNavigate={(screenId) => {
            setCurrentScreen(screenId);
            setViewMode('device');
          }}
          patientLang={patientLang}
          doctorLang={doctorLang}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(false)}
          className="hidden md:flex"
        />

        {/* Button to Turn Dashboard Back ON when collapsed (Icon/Symbol only) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="hidden md:flex absolute top-3.5 left-3.5 z-30 w-9 h-9 rounded-2xl neu-btn text-blue-600 items-center justify-center transition-all cursor-pointer group animate-fade-in-up"
            title="Open Dashboard"
            aria-label="Open Dashboard"
          >
            <PanelLeftOpen className="w-4.5 h-4.5 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* CENTER / RIGHT WORKSPACE AREA */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto neu-bg">
          {/* Mobile Quick Action Pill Strip */}
          <div className="md:hidden neu-bg border-b border-white/80 px-3 py-2 flex items-center gap-2 overflow-x-auto text-xs font-semibold scrollbar-none shrink-0">
            <button
              onClick={() => setCurrentScreen('splash')}
              className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1 transition-all ${
                currentScreen === 'splash'
                  ? 'neu-btn-primary font-bold'
                  : 'neu-btn text-slate-700'
              }`}
            >
              <span>Overview</span>
            </button>
            <button
              onClick={() => setCurrentScreen('patient_translation')}
              className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1 transition-all ${
                currentScreen === 'patient_translation'
                  ? 'neu-btn-primary font-bold'
                  : 'neu-btn text-slate-700'
              }`}
            >
              <Mic className="w-3 h-3" />
              <span>Translate</span>
            </button>
            <button
              onClick={() => setCurrentScreen('doctor_reply')}
              className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1 transition-all ${
                currentScreen === 'doctor_reply'
                  ? 'neu-btn-primary font-bold'
                  : 'neu-btn text-slate-700'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Doctor Reply</span>
            </button>
            <button
              onClick={() => setCurrentScreen('symptoms')}
              className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1 transition-all ${
                currentScreen === 'symptoms'
                  ? 'neu-btn-primary font-bold'
                  : 'neu-btn text-slate-700'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>Symptoms</span>
            </button>
            <button
              onClick={() => setCurrentScreen('body_map')}
              className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1 transition-all ${
                currentScreen === 'body_map'
                  ? 'neu-btn-primary font-bold'
                  : 'neu-btn text-slate-700'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Body Map</span>
            </button>
            <button
              onClick={() => setCurrentScreen('emergency')}
              className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1 font-bold transition-all ${
                currentScreen === 'emergency' ? 'neu-btn-sos' : 'neu-btn text-red-700'
              }`}
            >
              <Siren className="w-3 h-3 animate-pulse" />
              <span>SOS</span>
            </button>
            <button
              onClick={() => setCurrentScreen('medicine')}
              className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1 transition-all ${
                currentScreen === 'medicine'
                  ? 'neu-btn-primary font-bold'
                  : 'neu-btn text-slate-700'
              }`}
            >
              <Pill className="w-3 h-3" />
              <span>Prescriptions</span>
            </button>
          </div>

          <main className="flex-1 flex flex-col w-full h-full min-h-0 p-0 overflow-y-auto">
            {viewMode === 'device' ? (
              <MobileFrame
                currentScreen={currentScreen}
                onNavigate={setCurrentScreen}
                onOpenDrawer={() => setIsDrawerOpen(true)}
              >
                <div key={currentScreen} className="animate-fade-in-up flex-1 flex flex-col w-full h-full">
                  {renderCurrentScreen()}
                </div>
              </MobileFrame>
            ) : (
              <AllScreensGallery
                onSelectScreenForInteractive={(screenId) => {
                  setCurrentScreen(screenId);
                  setViewMode('device');
                }}
                patientLang={patientLang}
                doctorLang={doctorLang}
                onSelectPatientLang={setPatientLang}
                onSelectDoctorLang={setDoctorLang}
                onSwapLanguages={handleSwapLanguages}
                selectedSymptoms={selectedSymptoms}
                onToggleSymptom={handleToggleSymptom}
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                painSeverity={painSeverity}
                onChangeSeverity={setPainSeverity}
                patientProfile={patientProfile}
                onSaveProfile={setPatientProfile}
              />
            )}
          </main>
        </div>
      </div>

      {/* Drawer for jumping quickly between all 10 screens */}
      <ScreenSwitcherDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentScreen={currentScreen}
        onSelectScreen={(screenId) => {
          setCurrentScreen(screenId);
          setViewMode('device');
        }}
      />
    </div>
  );
}
