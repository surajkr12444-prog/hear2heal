import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Mic,
  MicOff,
  Keyboard,
  Activity,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Bot,
  ShieldAlert,
  Stethoscope,
  Radio,
  CheckCircle2,
  Globe2,
  Zap
} from 'lucide-react';
import { ScreenId, Language } from '../../types';
import { playTextToSpeech, stopTextToSpeech } from '../../utils/audio';
import { startMedicalSpeechRecognition } from '../../utils/offlineSpeech';
import { appendConversationMessage } from '../../utils/offlineStorage';
import {
  processPatientSpeech,
  EMERGENCY_PRESETS,
  PatientAnalysisResult,
  EmergencyPreset
} from '../../utils/aiTranslator';
import { LANGUAGES } from '../../data/mockData';

interface PatientTranslationScreenProps {
  onNavigate: (screen: ScreenId) => void;
  patientLang: Language;
  doctorLang: Language;
  onSelectPatientLang?: (lang: Language) => void;
  onSelectDoctorLang?: (lang: Language) => void;
}

export const PatientTranslationScreen: React.FC<PatientTranslationScreenProps> = ({
  onNavigate,
  patientLang,
  doctorLang,
  onSelectPatientLang,
  onSelectDoctorLang
}) => {
  // AI Auto-Detection Mode (default ON for emergency readiness)
  const [isAutoDetectMode, setIsAutoDetectMode] = useState<boolean>(true);

  // Doctor preferred output language: 'en' (English) or 'hi' (Hindi)
  const [doctorOutputLangId, setDoctorOutputLangId] = useState<'en' | 'hi'>('en');

  // Input & analysis state
  const [inputText, setInputText] = useState<string>(EMERGENCY_PRESETS[0].patientText);
  const [analysis, setAnalysis] = useState<PatientAnalysisResult>(() =>
    processPatientSpeech(EMERGENCY_PRESETS[0].patientText, 'en')
  );

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isTypingMode, setIsTypingMode] = useState<boolean>(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  // Active emergency preset selected (if any)
  const [activePresetId, setActivePresetId] = useState<string>('hindi-chest-pain');

  // Speech Recognition ref
  const recognitionRef = useRef<any>(null);

  // Re-run analysis whenever input text or doctor's output language changes
  useEffect(() => {
    const result = processPatientSpeech(inputText, doctorOutputLangId);
    setAnalysis(result);

    // If auto-detect is on, sync detected language with app-wide state
    if (isAutoDetectMode && onSelectPatientLang) {
      if (result.detectedLanguage.id !== patientLang.id) {
        onSelectPatientLang(result.detectedLanguage);
      }
    }
  }, [inputText, doctorOutputLangId, isAutoDetectMode]);

  // Sync doctorLang from parent if changed
  useEffect(() => {
    if (doctorLang.id === 'hi' || doctorLang.id === 'en') {
      setDoctorOutputLangId(doctorLang.id as 'en' | 'hi');
    }
  }, [doctorLang]);

  // Handle switching doctor's output language
  const handleToggleDoctorLang = (targetId: 'en' | 'hi') => {
    setDoctorOutputLangId(targetId);
    if (onSelectDoctorLang) {
      const match = LANGUAGES.find((l) => l.id === targetId);
      if (match) onSelectDoctorLang(match);
    }
  };

  // Play audio in doctor's chosen language (English or Hindi)
  const handlePlayDoctorAudio = () => {
    if (isPlayingAudio) {
      stopTextToSpeech();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak =
      doctorOutputLangId === 'hi' ? analysis.hindiTranslation : analysis.englishTranslation;
    const langCode = doctorOutputLangId === 'hi' ? 'hi-IN' : 'en-US';

    playTextToSpeech(
      textToSpeak,
      langCode,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  // Handle preset pill click
  const handleSelectPreset = (preset: EmergencyPreset) => {
    setActivePresetId(preset.id);
    setInputText(preset.patientText);
    const result = processPatientSpeech(preset.patientText, doctorOutputLangId);
    appendConversationMessage({
      id: `patient-preset-${Date.now()}`,
      sender: 'patient',
      text: preset.patientText,
      translatedText: doctorOutputLangId === 'hi' ? result.hindiTranslation : result.englishTranslation,
      sourceLang: preset.langName,
      targetLang: doctorOutputLangId === 'hi' ? 'Hindi' : 'English',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  // Microphone: prefers browser on-device speech recognition when an offline language pack exists.
  // Offline voice recognition needs a selected language pack, so the currently selected patient language is used.
  const handleToggleRecord = async () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore stop errors
        }
      }
      setIsRecording(false);
      return;
    }

    setRecognitionError(null);

    const recognition = await startMedicalSpeechRecognition(patientLang.id, {
      onStart: () => setIsRecording(true),
      onTranscript: (transcript, isFinal) => {
        setInputText(transcript);
        setActivePresetId('');
        if (isFinal) {
          const result = processPatientSpeech(transcript, doctorOutputLangId);
          appendConversationMessage({
            id: `patient-${Date.now()}`,
            sender: 'patient',
            text: transcript,
            translatedText: doctorOutputLangId === 'hi' ? result.hindiTranslation : result.englishTranslation,
            sourceLang: result.detectedLanguage.name,
            targetLang: doctorOutputLangId === 'hi' ? 'Hindi' : 'English',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }
      },
      onError: (message) => {
        setRecognitionError(message);
        setIsRecording(false);
      },
      onEnd: () => setIsRecording(false)
    });

    recognitionRef.current = recognition;
    if (!recognition) setIsRecording(false);
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[680px] p-4 sm:p-5 bg-slate-50 relative overflow-y-auto">
      <div>
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Patient Speech Translation
              </h2>
              {/* AI Auto-Detect Active Badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs">
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                <span>AI Auto-Detect Active</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Emergency Mode: core offline translation is optimized for <span className="font-semibold text-slate-700">English, Hindi & Bengali</span>; additional local emergency presets are available for other supported languages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('doctor_reply')}
              className="px-3.5 py-2 rounded-2xl neu-btn text-blue-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Doctor Reply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Emergency Triage Notice & Auto-Detect Banner */}
        <div className="p-3.5 neu-raised rounded-3xl mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl neu-convex text-blue-600 flex items-center justify-center shrink-0 border border-white/60">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    Emergency Zero-Click AI Detection
                  </span>
                  <span className="text-[10px] neu-inset-sm text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    No Manual Selection Needed
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Doctor or patient doesn't need to waste time searching language dropdowns in critical moments.
                </p>
              </div>
            </div>

            {/* Auto-detect toggle switch */}
            <div className="flex items-center gap-1.5 self-end sm:self-center neu-inset-sm p-1 rounded-2xl">
              <button
                onClick={() => setIsAutoDetectMode(true)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  isAutoDetectMode
                    ? 'neu-btn-primary'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>Auto-Detect</span>
              </button>
              <button
                onClick={() => onNavigate('languages')}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  !isAutoDetectMode
                    ? 'neu-btn-primary'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Change manually in languages menu"
              >
                <Globe2 className="w-3 h-3" />
                <span>Manual</span>
              </button>
            </div>
          </div>
        </div>

        {/* PATIENT VOICE INPUT CARD */}
        <div className="p-5 neu-raised rounded-3xl mb-4 relative">
          <div className="flex flex-wrap items-center justify-between text-xs mb-3 gap-2 pb-2.5 border-b border-white/60">
            {/* Auto-Detected Language Pill */}
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{analysis.detectedLanguage.flag}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">
                    {analysis.detectedLanguage.name} ({analysis.detectedLanguage.nativeName})
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold neu-inset-sm text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{analysis.confidence}% Match</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Script: {analysis.sourceScript} • Patient Voice Input
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold neu-inset-sm px-2.5 py-1 rounded-xl">
                <Activity className={`w-3.5 h-3.5 ${isRecording ? 'animate-bounce text-red-600' : ''}`} />
                <span>{isRecording ? 'Listening live...' : 'Voice input active'}</span>
              </div>

              {/* Type Mode Toggle */}
              <button
                onClick={() => setIsTypingMode(!isTypingMode)}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  isTypingMode
                    ? 'neu-btn-primary'
                    : 'neu-btn text-slate-600'
                }`}
                title="Toggle manual text edit"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isTypingMode ? 'Voice Mode' : 'Type'}</span>
              </button>
            </div>
          </div>

          {/* Text input area in Sunken Neumorphic Well */}
          {isTypingMode ? (
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setActivePresetId('');
              }}
              rows={3}
              className="w-full text-base font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 rounded-2xl p-3 neu-inset resize-none leading-relaxed"
              placeholder="Speak or type symptoms. Core offline: English, Hindi, Bengali."
            />
          ) : (
            <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed min-h-[64px] flex items-center p-3.5 neu-inset rounded-2xl">
              "{inputText}"
            </div>
          )}

          {/* Waveform Graphic with Animated Equalizer Bars inside Inset Well */}
          <div className="flex items-center justify-between p-2.5 neu-inset-sm rounded-2xl mt-3">
            <div className="flex items-center gap-1 h-5">
              {[30, 60, 95, 45, 80, 25, 90, 50, 75, 35, 85, 40].map((h, i) => (
                <span
                  key={i}
                  style={{
                    height: isRecording
                      ? `${Math.max(12, (h + (i % 3) * 15) % 24)}px`
                      : '6px'
                  }}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isRecording
                      ? 'bg-gradient-to-t from-red-500 to-rose-600 soundwave-bar'
                      : 'bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                {isRecording ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                    <span className="text-red-600 font-bold">LIVE REC</span>
                  </>
                ) : (
                  'Ready to Speak'
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Central Tactile Neumorphic Microphone Button */}
        <div className="flex items-center justify-center my-4">
          <div className="flex flex-col items-center">
            {/* Concentric Dual-Ring Tactile Neumorphic Dial */}
            <div className="relative flex items-center justify-center p-3 rounded-full neu-inset">
              {isRecording ? (
                <>
                  <div className="absolute w-28 h-28 rounded-full bg-red-500/20 animate-ripple-radar pointer-events-none" />
                  <div className="absolute w-24 h-24 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
                </>
              ) : (
                <div className="absolute -inset-1 rounded-full bg-blue-400/20 blur-md pointer-events-none" />
              )}

              <button
                onClick={handleToggleRecord}
                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all cursor-pointer z-10 ${
                  isRecording
                    ? 'neu-mic-dial-recording bg-red-600 text-white animate-pulse-glow-red scale-95'
                    : 'neu-mic-dial text-blue-600 hover:scale-105 active:scale-95'
                }`}
                title={isRecording ? 'Click to stop listening' : `Tap to speak (${patientLang.name})`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8 animate-pulse text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-blue-600 group-hover:animate-bounce" />
                )}
              </button>
            </div>

            <span className="text-xs font-bold text-slate-800 mt-2.5 text-center">
              {isRecording
                ? `🎙️ Listening in ${patientLang.name}...`
                : `Tap Mic to Speak (${patientLang.name})`}
            </span>
            <span className="text-[10px] text-slate-500 text-center max-w-md">
              Offline voice uses the selected language pack ({patientLang.name}); text/script detection still verifies the transcript after recognition.
            </span>
            {recognitionError && (
              <span className="mt-1.5 max-w-md text-center text-[10px] font-semibold text-amber-800 neu-inset-sm px-3 py-1 rounded-xl">
                {recognitionError}
              </span>
            )}
          </div>
        </div>

        {/* EMERGENCY SCENARIO PRESETS: Quick One-Tap Testing with Neumorphic Chips */}
        <div className="my-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
              <span>Simulate Emergency Patient Speech (1-Tap Test):</span>
            </span>
            <span className="text-[11px] text-slate-500">Local demo presets</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-2.5 scrollbar-thin">
            {EMERGENCY_PRESETS.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'neu-btn-primary'
                      : 'neu-btn text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <span className="text-sm">{preset.flag}</span>
                  <span>{preset.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DOCTOR TRANSLATION DISPLAY CARD */}
        <div className="p-5 neu-raised rounded-3xl mt-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-blue-900 font-bold mb-3 pb-2 border-b border-white/60">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-blue-600 animate-heartbeat" />
              <span>
                Translated Output ({doctorOutputLangId === 'hi' ? 'हिन्दी - Hindi' : 'English'})
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Compact Doctor language switch inside the output card */}
              <div className="inline-flex p-1 neu-inset-sm rounded-xl">
                <button
                  onClick={() => handleToggleDoctorLang('en')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    doctorOutputLangId === 'en'
                      ? 'neu-btn-primary'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Show in English"
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => handleToggleDoctorLang('hi')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    doctorOutputLangId === 'hi'
                      ? 'neu-btn-primary'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Show in Hindi"
                >
                  🇮🇳 हिन्दी
                </button>
              </div>

              {/* Play Speech button with live soundwave equalizer bars */}
              <button
                onClick={handlePlayDoctorAudio}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'neu-btn-primary animate-pulse-glow'
                    : 'neu-btn text-blue-700'
                }`}
                title="Play Audio in Doctor's Language"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                <span>{isPlayingAudio ? 'Speaking...' : 'Listen Audio'}</span>
                {isPlayingAudio && (
                  <span className="flex items-center gap-0.5 h-3 ml-1">
                    <span className="w-0.5 h-full bg-white rounded-full soundwave-bar" />
                    <span className="w-0.5 h-full bg-white rounded-full soundwave-bar" />
                    <span className="w-0.5 h-full bg-white rounded-full soundwave-bar" />
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Primary Translated Output Text in Neumorphic Inset Display Well */}
          <div className="neu-inset p-4 rounded-2xl mb-2.5">
            <p className="text-slate-950 font-bold text-base sm:text-lg leading-snug">
              {analysis.doctorTranslation}
            </p>
          </div>

          {/* Secondary Translation Subtext */}
          <div className="mt-2 pt-2 border-t border-white/60 flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-600 font-medium">
            <span>
              {doctorOutputLangId === 'en'
                ? `हिन्दी अनुवाद: ${analysis.hindiTranslation}`
                : `English Ref: ${analysis.englishTranslation}`}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px]">
            <span className={`px-2.5 py-1 rounded-full font-bold neu-inset-sm ${
              analysis.translationCoverage === 'limited'
                ? 'text-amber-800'
                : 'text-emerald-800'
            }`}>
              Offline engine: {analysis.translationCoverage === 'preset' ? 'Verified preset' : analysis.translationCoverage === 'exact' ? 'Exact core phrase' : analysis.translationCoverage === 'medical-phrase' ? 'Medical phrase match' : 'Limited free-text coverage'}
            </span>
            <span className="text-slate-500 font-semibold">Translation confidence: {analysis.translationConfidence}%</span>
          </div>
        </div>

        {/* EMERGENCY TRIAGE & CRITICAL SYMPTOMS ALERT */}
        {analysis.triageLevel === 'red' ? (
          <div className="mt-4 p-5 neu-raised rounded-3xl border border-red-300 animate-scale-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/30">
                <AlertTriangle className="w-6 h-6 animate-heartbeat" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wide bg-red-600 text-white uppercase animate-pulse">
                      CRITICAL RED TRIAGE
                    </span>
                    <h4 className="text-sm font-bold text-red-950 tracking-tight">
                      Immediate Cardiopulmonary Emergency
                    </h4>
                  </div>
                  <button
                    onClick={() => onNavigate('emergency')}
                    className="px-3.5 py-1.5 rounded-xl neu-btn-sos text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 animate-pulse-glow-red"
                  >
                    <span>Launch SOS Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-red-900 mt-2 font-semibold">
                  {analysis.clinicalSummary}
                </p>

                <div className="mt-2.5 flex flex-wrap gap-2">
                  {analysis.criticalSymptoms.map((symptom, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs font-bold neu-inset-sm text-red-900 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                      <span>{symptom}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : analysis.triageLevel === 'yellow' ? (
          <div className="mt-4 p-4 neu-raised rounded-3xl border border-amber-300 animate-scale-in">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldAlert className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold neu-inset-sm text-amber-900 uppercase">
                    YELLOW TRIAGE (URGENT)
                  </span>
                  <button
                    onClick={() => onNavigate('symptoms')}
                    className="text-xs font-bold text-amber-800 underline hover:text-amber-950 cursor-pointer"
                  >
                    Check Triage Symptoms &rarr;
                  </button>
                </div>
                <p className="text-xs text-amber-950 font-medium mt-1">
                  {analysis.clinicalSummary}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {analysis.criticalSymptoms.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-bold neu-inset-sm text-amber-900"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Navigation & Action Bar at Bottom with Neumorphic Buttons */}
      <div className="pt-4 mt-5 border-t border-white/60 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('symptoms')}
          className="flex-1 py-3 px-4 neu-btn rounded-2xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <span>Select Symptoms</span>
        </button>

        <button
          onClick={() => onNavigate('doctor_reply')}
          className="flex-1 py-3 px-4 neu-btn-primary rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <span>Doctor Reply ({analysis.detectedLanguage.name})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onNavigate('history')}
          className="py-3 px-4 neu-btn rounded-2xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <span>History</span>
        </button>
      </div>
    </div>
  );
};
