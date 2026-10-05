import React, { useState } from 'react';
import { ArrowLeft, ArrowUpDown, ShieldCheck, Check, ChevronDown, DownloadCloud } from 'lucide-react';
import { ScreenId, Language } from '../../types';
import { LANGUAGES } from '../../data/mockData';

const DOCTOR_LANGUAGES = LANGUAGES.filter((lang) => ['en', 'hi'].includes(lang.id));

interface LanguageSelectScreenProps {
  onNavigate: (screen: ScreenId) => void;
  patientLang: Language;
  doctorLang: Language;
  onSelectPatientLang: (lang: Language) => void;
  onSelectDoctorLang: (lang: Language) => void;
  onSwapLanguages: () => void;
}

export const LanguageSelectScreen: React.FC<LanguageSelectScreenProps> = ({
  onNavigate,
  patientLang,
  doctorLang,
  onSelectPatientLang,
  onSelectDoctorLang,
  onSwapLanguages,
}) => {
  const [openFromDropdown, setOpenFromDropdown] = useState(false);
  const [openToDropdown, setOpenToDropdown] = useState(false);
  const bothCoreOffline = patientLang.isDownloaded && doctorLang.isDownloaded;

  return (
    <div className="flex flex-col justify-between h-full min-h-[640px] p-6 neu-bg relative">
      {/* Top Header & Pagination */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => onNavigate('splash')}
            className="neu-btn w-11 h-11 rounded-2xl flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Neumorphic Stepper Dots */}
          <div className="flex items-center gap-2 neu-inset-sm px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span className="w-6 h-2.5 rounded-full bg-blue-600 shadow-sm"></span>
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          </div>

          <div className="w-11"></div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Language Matrix</h2>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Configure Dual-Channel Audio & Text</p>
        </div>

        {/* Language Selection Card Section */}
        <div className="space-y-4 mb-4">
          {/* Patient Language Box */}
          <div className="relative neu-raised p-4 rounded-3xl bg-[#e6ecf5]">
            <label className="block text-[11px] font-black text-slate-600 mb-2 uppercase tracking-wider">
              Patient Language (Input Channel)
            </label>
            <button
              type="button"
              onClick={() => {
                setOpenFromDropdown(!openFromDropdown);
                setOpenToDropdown(false);
              }}
              className="w-full flex items-center justify-between p-3.5 neu-inset rounded-2xl transition-all text-left cursor-pointer bg-[#e6ecf5]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{patientLang.flag}</span>
                <div>
                  <div className="font-black text-slate-900 text-base">{patientLang.name}</div>
                  <div className="text-xs font-bold text-blue-700">{patientLang.nativeName}</div>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${openFromDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {openFromDropdown && (
              <div className="absolute z-20 top-full mt-2 left-0 right-0 neu-raised bg-[#e6ecf5] rounded-3xl shadow-2xl max-h-56 overflow-y-auto p-2 border border-white/50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={`from-${lang.id}`}
                    onClick={() => {
                      onSelectPatientLang(lang);
                      setOpenFromDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer mb-1 ${
                      patientLang.id === lang.id ? 'neu-inset text-blue-700 font-black' : 'neu-btn hover:text-slate-900 text-slate-700 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                      <span className="text-xs text-slate-500">({lang.nativeName})</span>
                    </div>
                    {lang.isDownloaded && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 flex items-center gap-1 shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" /> Offline
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tactile Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              type="button"
              onClick={onSwapLanguages}
              className="neu-btn px-4 py-2.5 rounded-2xl text-blue-700 flex items-center gap-2 transition-all cursor-pointer font-black text-xs active:scale-95"
              title="Swap Languages"
            >
              <ArrowUpDown className="w-4 h-4 stroke-[2.5]" />
              <span>Swap Direction</span>
            </button>
          </div>

          {/* Doctor Language Box */}
          <div className="relative neu-raised p-4 rounded-3xl bg-[#e6ecf5]">
            <label className="block text-[11px] font-black text-slate-600 mb-2 uppercase tracking-wider">
              Doctor Language (Output Channel)
            </label>
            <button
              type="button"
              onClick={() => {
                setOpenToDropdown(!openToDropdown);
                setOpenFromDropdown(false);
              }}
              className="w-full flex items-center justify-between p-3.5 neu-inset rounded-2xl transition-all text-left cursor-pointer bg-[#e6ecf5]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{doctorLang.flag}</span>
                <div>
                  <div className="font-black text-slate-900 text-base">{doctorLang.name}</div>
                  <div className="text-xs font-bold text-blue-700">{doctorLang.nativeName}</div>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${openToDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {openToDropdown && (
              <div className="absolute z-20 top-full mt-2 left-0 right-0 neu-raised bg-[#e6ecf5] rounded-3xl shadow-2xl max-h-56 overflow-y-auto p-2 border border-white/50">
                {DOCTOR_LANGUAGES.map((lang) => (
                  <button
                    key={`to-${lang.id}`}
                    onClick={() => {
                      onSelectDoctorLang(lang);
                      setOpenToDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer mb-1 ${
                      doctorLang.id === lang.id ? 'neu-inset text-blue-700 font-black' : 'neu-btn hover:text-slate-900 text-slate-700 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                      <span className="text-xs text-slate-500">({lang.nativeName})</span>
                    </div>
                    {lang.isDownloaded && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 flex items-center gap-1 shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" /> Offline
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Offline Engine Telemetry Pill */}
        <div className={`mt-5 p-4 rounded-3xl neu-raised bg-[#e6ecf5] flex items-center justify-between border-t-2 ${
          bothCoreOffline ? 'border-emerald-400/60' : 'border-amber-400/60'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
              bothCoreOffline ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white' : 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white'
            }`}>
              <DownloadCloud className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className={`text-xs font-black flex items-center gap-1.5 ${
                bothCoreOffline ? 'text-emerald-950' : 'text-amber-950'
              }`}>
                <span>{bothCoreOffline ? 'Core Offline Pack Active' : 'Limited Offline Coverage'}</span>
                <span className={`w-2 h-2 rounded-full animate-pulse ${bothCoreOffline ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </div>
              <div className="text-[11px] font-medium text-slate-600 mt-0.5">
                Local on-device phrase engines are active without internet connectivity.
              </div>
            </div>
          </div>
          {bothCoreOffline && (
            <div className="neu-inset-sm w-7 h-7 rounded-xl text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <button
          onClick={() => onNavigate('patient_translation')}
          className="neu-btn-primary w-full py-4 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-[0.98]"
        >
          <span>Launch Consult Channel</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
};
