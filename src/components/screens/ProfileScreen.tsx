import React, { useState } from 'react';
import { ArrowLeft, User, ShieldCheck, Check, Heart, Save } from 'lucide-react';
import { ScreenId, PatientProfile } from '../../types';
import { INITIAL_PATIENT_PROFILE } from '../../data/mockData';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
  profile: PatientProfile;
  onSaveProfile: (profile: PatientProfile) => void;
}

const BLOOD_GROUPS = ['Select', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<PatientProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[640px] p-5 neu-bg relative overflow-y-auto">
      <div>
        {/* Neumorphic Header */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => onNavigate('patient_translation')}
            className="neu-btn w-11 h-11 rounded-2xl flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Patient Dossier</h2>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Local Encrypted Profile</p>
          </div>
        </div>

        {/* Profile Card / Header Avatar */}
        <div className="neu-raised p-5 rounded-3xl bg-[#e6ecf5] mb-5 flex items-center gap-4">
          <div className="neu-inset-sm w-15 h-15 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-inner shrink-0">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 leading-tight">
              {formData.name || 'Anonymous Patient'}
            </h3>
            <div className="mt-1 inline-flex items-center gap-1.5 neu-inset-deep px-2.5 py-1 rounded-xl text-[10px] font-bold text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Offline Medical Record</span>
            </div>
          </div>
        </div>

        {/* Form Inputs Container */}
        <div className="neu-raised p-5 rounded-3xl bg-[#e6ecf5]">
          <form id="profileForm" onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-[11px] font-black text-slate-600 mb-1.5 uppercase tracking-wider">
                Full Legal Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter patient full name"
                className="neu-inset w-full px-4 py-3 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all bg-[#e6ecf5]"
              />
            </div>

            {/* Age & Blood Group Row */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1.5 uppercase tracking-wider">
                  Age
                </label>
                <input
                  type="text"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="E.g. 42"
                  className="neu-inset w-full px-4 py-3 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all bg-[#e6ecf5]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1.5 uppercase tracking-wider">
                  Blood Group
                </label>
                <div className="relative">
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="neu-inset w-full px-4 py-3 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all bg-[#e6ecf5] cursor-pointer appearance-none"
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg === 'Select' ? '' : bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-600">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Known Allergies */}
            <div>
              <label className="block text-[11px] font-black text-slate-600 mb-1.5 uppercase tracking-wider">
                Critical Allergies
              </label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                placeholder="E.g. Penicillin, Sulfa, Peanuts"
                className="neu-inset w-full px-4 py-3 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all bg-[#e6ecf5]"
              />
            </div>

            {/* Current Medicines */}
            <div>
              <label className="block text-[11px] font-black text-slate-600 mb-1.5 uppercase tracking-wider">
                Active Medications
              </label>
              <input
                type="text"
                value={formData.currentMedicines}
                onChange={(e) => setFormData({ ...formData, currentMedicines: e.target.value })}
                placeholder="E.g. Metformin 500mg, Amlodipine"
                className="neu-inset w-full px-4 py-3 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all bg-[#e6ecf5]"
              />
            </div>
          </form>
        </div>

        {isSaved && (
          <div className="mt-4 p-4 neu-inset-sm rounded-2xl bg-[#e6ecf5] border border-emerald-400/40 flex items-center gap-2.5 text-emerald-800 text-xs font-bold animate-fade-in">
            <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
            <span>Profile successfully synced to offline device cache!</span>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="pt-6">
        <button
          type="submit"
          form="profileForm"
          className="neu-btn-primary w-full py-4 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2.5 cursor-pointer transition-all active:scale-[0.98]"
        >
          {isSaved ? (
            <>
              <Check className="w-5 h-5 stroke-[3]" />
              <span>Profile Saved</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Offline Profile</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
