# 🩺 Hear2Heal

> **Offline-first medical communication, emergency triage and bilingual doctor translation prototype**

[![React](https://img.shields.io/badge/React-19.0.1-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Web Speech API](https://img.shields.io/badge/Web_Speech_API-Synthesizer-emerald)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![Offline Core](https://img.shields.io/badge/Offline-Core_Medical_Flow-success)](#offline-first-architecture)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 📌 Executive Summary

In high-pressure emergency departments, rural clinics, disaster relief camps, and multicultural hospitals, **language barriers can be fatal**. Critical minutes are frequently lost when distressed, illiterate, or injured patients cannot communicate their acute symptoms to attending clinicians who do not speak their mother tongue.

**Hear2Heal** is an emergency medical translation and clinical triage platform designed from the ground up for healthcare professionals. Unlike generic translation tools, Hear2Heal features:
- **Zero-Click Patient Language Detection**: The patient simply speaks or types in their mother tongue; the engine automatically identifies the language, script, and dialect without forcing a distressed patient to navigate menus.
- **Real-Time Clinical Emergency Triage**: Every translation is dynamically parsed against clinical emergency criteria, assigning an instant triage severity grade (**🔴 RED / 🟡 YELLOW / 🟢 GREEN**) with extracted critical symptoms and suggested clinical interventions.
- **Bi-Directional Doctor ⇄ Patient Audio Synthesis**: Doctors can respond using categorized clinical phrases translated into the patient's language with native audio pronunciation.
- **Visual & Non-Verbal Clinical Tools**: An interactive 2D anatomical body pain map, visual touch-based symptom triage grid, and multi-lingual prescription dispenser for non-verbal or traumatized patients.
- **Offline-First Core Flow**: The application shell, English/Hindi/Bengali medical phrase translation, triage logic, quick phrases, patient profile and conversation history can run locally after the first load. Offline microphone input additionally requires a browser/device on-device speech pack.

---

## 🌟 Key Features

### 1. 🎙️ AI Patient Translation with Zero-Click Auto-Detection
- **Script/language detection**: Core offline free-text medical phrase coverage is focused on English, Hindi and Bengali. Additional languages retain local emergency demo presets and script detection.
- **Confidence Scoring & Script Recognition**: Real-time identification of Indic and Latin Unicode scripts with confidence percentages.
- **Doctor Preferred Language**: Translates instantaneously into either **English** or **Hindi**, matching the clinician's chosen workflow.
- **Emergency Voice Preset Pills**: 1-tap clinical test scenarios (e.g. *Chest Pain in Bengali*, *Dizziness in Tamil*, *Stroke Symptoms in Hindi*, *Asthma Attack in Telugu*) for rapid testing and emergency drills.
- **Integrated Text-to-Speech**: Crystal-clear voice synthesis in both patient and doctor languages using native browser speech engines.

### 2. 🚨 Real-Time Emergency Triage Severity Classification
Automated clinical triage engine dynamically grades each interaction into international hospital emergency triage tiers:
- **🔴 RED (Resuscitation / Immediate)**: Suspected Acute Coronary Syndrome (ACS), severe respiratory distress/dyspnea, anaphylaxis, acute stroke, massive trauma. Prompts immediate SOS triggers and rapid stabilization.
- **🟡 YELLOW (Urgent / Priority 2)**: High fever with chills, severe abdominal pain (suspected appendicitis/cholecystitis), closed fractures, persistent vomiting.
- **🟢 GREEN (Non-Urgent / Routine)**: Mild upper respiratory symptoms, skin rashes, superficial abrasions, routine consultations.
- Provides clinicians with **Extracted Critical Symptoms**, a **Clinical Summary**, and **Recommended Next Actions**.

### 3. 👨‍⚕️ Clinician Response Engine (`DoctorReplyScreen`)
- Structured medical response categories:
  - **Examinations**: *"Please take a deep breath"*, *"Where does it hurt?"*, *"Open your mouth"*.
  - **Medications**: *"Take this medicine twice a day after meals"*, *"Drink plenty of water"*.
  - **Diagnostics**: *"We need to perform an ECG and draw blood samples"*.
  - **Reassurance**: *"You are in safe hands; we are taking care of you"*.
- Converts doctor's English or Hindi responses into the patient's native dialect with automatic audio playback.

### 4. 🩻 Interactive Anatomical Body Map (`BodyMapScreen`)
- High-fidelity **Front and Back** anatomical touch-mapping.
- Precision focal points: Head, Throat, Chest, Abdomen, Left/Right Arm, Pelvis, Left/Right Leg, Neck, Upper Back, Lower Back, and Spine.
- **3-Tier Pain Severity Slider**: Mild (Yellow), Moderate (Orange), and Severe (Red) with real-time visual heat indicators and pain grade labels.

### 5. ⚡ Visual Quick Symptom Triage Grid (`QuickSymptomScreen`)
- High-contrast visual symptom tiles for non-verbal, pediatric, or distressed patients:
  - Fever (बुखार), Cough (खांसी), Breathing Difficulty (सांस में दिक्कत), Chest Pain (सीने में दर्द), Headache (सिरदर्द), Stomach Pain (पेट दर्द), Vomiting (उल्टी), Dizziness (चक्कर).
- Visual priority pills, multi-selection counters, and 1-tap audio pronunciation for each symptom.

### 6. 💊 Prescription & Dosage Instructions (`MedicineScreen`)
- Translates dosage instructions into patient-friendly native languages.
- Dosage forms supported: **Tablets**, **Syrups**, **Injections**, and **Inhalers**.
- Clear schedule icons and pictograms (Before Food / After Food, Morning / Afternoon / Night).

### 7. 🚨 Instant Emergency SOS & Crash Protocol (`EmergencyScreen`)
- Single-tap Emergency SOS broadcast.
- Rapid emergency protocol cards: Airway Management, High-Flow Oxygen, IV Access, Cardiac Monitoring, and Anaphylaxis protocols.
- Integrated rapid dialing for emergency medical hotlines.

### 8. 📋 Consultation Transcripts & Audit Trail (`HistoryScreen`)
- Chronological, speaker-differentiated (Doctor / Patient) transcripts of the encounter.
- Timestamps, original text, translated text, and replayable audio snippets.
- One-click copy and export for Electronic Health Record (EHR) integration.

### 9. 📊 Collapsible Left Dashboard & Top-Right Quick Suite
- **Sidebar Dashboard**: Collapsible via an icon-only symbol (`[ ◨ ]`), featuring:
  1. **Overview** (Home clinical dashboard)
  2. **Patient Translation** (Zero-click AI translation)
  3. **Doctor Reply** (Clinical response suite)
  4. **Symptoms Triage** (Visual symptom grid)
  5. **Body Map** (Interactive 2D anatomical map)
  6. **Conversation History** (Consultation audit trail)
  7. **Emergency SOS** (Crash protocols)
  8. **Prescriptions** (Medication dispenser)
- **Top-Right Quick Suite**: Rapid access to History, Clinician Profile, Language Selector, Emergency SOS, and Staff Logout.
- **Universal Staff Sign-In**: Clean authentication portal with 1-click instant demo access (`demo@hear2heal.com`) that lands directly into the Overview dashboard.

---

## 🌐 Supported Languages & Regional Dialects

| Language | Native Name | Code | Flag | Offline Pack | Primary Region |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Hindi** | हिन्दी | `hi` | 🇮🇳 | 28 MB | North & Central India |
| **English** | English | `en` | 🇬🇧 | 32 MB | Global / Clinical Standard |
| **Bengali** | বাংলা | `bn` | 🇧🇩 | 25 MB | West Bengal, Bangladesh, Assam |
| **Marathi** | मराठी | `mr` | 🇮🇳 | 26 MB | Maharashtra |
| **Tamil** | தமிழ் | `ta` | 🇮🇳 | 27 MB | Tamil Nadu, Sri Lanka, Singapore |
| **Telugu** | తెలుగు | `te` | 🇮🇳 | 26 MB | Andhra Pradesh, Telangana |
| **Gujarati** | ગુજરાતી | `gu` | 🇮🇳 | 24 MB | Gujarat |
| **Punjabi** | ਪੰਜਾਬੀ | `pa` | 🇮🇳 | 25 MB | Punjab, Global Diaspora |
| **Urdu** | اردو | `ur` | 🇵🇰 | 27 MB | India, Pakistan, Global |
| **Spanish** | Español | `es` | 🇪🇸 | 26 MB | Global Healthcare |
| **Arabic** | العربية | `ar` | 🇸🇦 | 30 MB | Middle East, North Africa |
| **French** | Français | `fr` | 🇫🇷 | 24 MB | Francophone Regions |

*Note: The auto-detection engine also recognizes colloquial **Hinglish** (Hindi written in Latin script) and phonetic Indic variations.*

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph UI ["Client Presentation Layer (React 19 + Tailwind v4)"]
        AUTH[Login Gate / Universal Auth]
        DASH[Collapsible Left Dashboard]
        OVERVIEW[Overview & Triage Hub]
        TRANS[Zero-Click Patient Translation]
        REPLY[Doctor Reply Suite]
        SYMP[Visual Symptom Grid]
        BODY[2D Anatomical Body Map]
        MED[Prescription Translator]
        HIST[Consultation Transcripts]
        SOS[Emergency SOS Protocol]
    end

    subgraph ENGINE ["Hear2Heal Intelligence Engine (Client-Side)"]
        DETECTOR[Zero-Click Language & Script Detector]
        TRANSLATOR[Clinical Medical Translator]
        TRIAGE[Automated Triage Severity Classifier (Red/Yellow/Green)]
        SPEECH[Web Speech API Synthesizer & Speech Recognition]
    end

    subgraph OFFLINE ["Offline Resilience & Storage"]
        MOCK[Localized Clinical Vocabularies & Presets]
        LOCAL[Local State & Session Storage]
    end

    AUTH -->|1-Click Sign In| OVERVIEW
    DASH --> OVERVIEW & TRANS & REPLY & SYMP & BODY & HIST & SOS & MED
    TRANS --> DETECTOR
    DETECTOR --> TRANSLATOR
    TRANSLATOR --> TRIAGE
    TRANSLATOR --> SPEECH
    REPLY --> TRANSLATOR & SPEECH
    SYMP & BODY --> TRIAGE
    MOCK -.-> DETECTOR & TRANSLATOR
    HIST <--> LOCAL
```

---

## 💻 Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Modern concurrent UI architecture with fast rendering |
| **Language** | [TypeScript 7.0+](https://www.typescriptlang.org/) | Strictly-typed clinical models, states, and interfaces |
| **Bundler & Dev Server** | [Vite 8.3](https://vitejs.dev/) | Ultra-fast HMR and optimized production bundle |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Cutting-edge CSS styling with responsive utilities |
| **Icons** | [Lucide React](https://lucide.dev/) | Lightweight, crisp medical and clinical icon set |
| **Animation** | [Motion](https://motion.dev/) | Fluid micro-interactions and screen transitions |
| **Speech Engine** | [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Native in-browser SpeechSynthesis and SpeechRecognition |
| **Typography** | [Plus Jakarta Sans & JetBrains Mono](https://fonts.google.com/) | Clinical-grade readability for emergency medical text |

---

## 📂 Project Directory Structure

```text
meditranslate/
├── index.html                   # HTML entry point with Hear2Heal metadata & typography
├── package.json                 # Project dependencies, scripts, and configuration
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS v4 & React plugin
├── metadata.json                # App capability manifest
├── README.md                    # Project documentation (this file)
└── src/
    ├── main.tsx                 # React DOM mount point
    ├── App.tsx                  # Root component with routing, dashboard toggle & header
    ├── index.css                # Tailwind CSS imports & global design tokens
    ├── types.ts                 # Domain TypeScript interfaces (Triage, Langs, Prescriptions)
    ├── data/
    │   └── mockData.ts          # Offline language catalog, symptoms list, and emergency presets
    ├── utils/
    │   ├── aiTranslator.ts      # Zero-click language detector, clinical translator & triage engine
    │   └── audio.ts             # Web Speech API synthesis, rate/pitch control & accent mapping
    └── components/
        ├── AllScreensGallery.tsx    # 10-Screen interactive mobile mockup blueprint gallery
        ├── BottomNavBar.tsx         # Mobile bottom navigation bar
        ├── MobileFrame.tsx          # Realistic smartphone frame with Dynamic Island for demos
        ├── MobileStatusBar.tsx      # Native-style mobile status bar
        ├── ScreenSwitcherDrawer.tsx # Fast screen jumping drawer
        ├── SidebarDashboard.tsx     # Collapsible Left Clinical Dashboard ([ ◨ ] toggle)
        └── screens/
            ├── SplashScreen.tsx             # Overview Hub: clinical summary & quick actions
            ├── LoginScreen.tsx              # Universal 1-click medical staff authentication
            ├── PatientTranslationScreen.tsx # Zero-click speech translation & triage classification
            ├── DoctorReplyScreen.tsx        # Categorized clinical responses & audio playback
            ├── QuickSymptomScreen.tsx       # Touch-based visual symptom grid with priority tags
            ├── BodyMapScreen.tsx            # Interactive 2D front/back anatomical pain map
            ├── EmergencyScreen.tsx          # 1-tap SOS and hospital crash resuscitation protocols
            ├── MedicineScreen.tsx           # Multi-lingual prescription and dosage instructions
            ├── HistoryScreen.tsx            # Chronological consult transcripts with audio replay
            ├── LanguageSelectScreen.tsx     # Language pack management & download status
            └── ProfileScreen.tsx            # Patient clinical profile, blood group & allergies
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/hear2heal.git
   cd hear2heal
   ```

2. **Install dependencies:**
   *(Use `--legacy-peer-deps` to ensure compatibility with Vite 8 and React 19 plugins)*
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to:
   ```text
   http://localhost:3000/
   # (or http://localhost:3001/ if port 3000 is occupied)
   ```

5. **Sign in to test:**
   - Click the **"One-Click Demo Login"** button on the sign-in screen (or use `demo@hear2heal.com` with any password) to enter the Overview dashboard immediately.

---

## 🧪 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles TypeScript and creates an optimized production bundle in `/dist` |
| `npm run preview` | Locally serves the production build for testing |
| `npm run lint` | Runs `tsc --noEmit` to verify type safety across all files |
| `npm run clean` | Cleans build artifacts and temporary cache directories |

---

## 🩺 Clinical Workflow Walkthrough

```text
[1. Staff Login] ────────► [2. Overview Dashboard] ────────► [3. Patient Translation]
                                                                        │
                                                                 (Speaks Native Lang)
                                                                        ▼
                                                             [Auto-Language Detection]
                                                                        │
                                                                        ▼
                                                             [Emergency Triage Alert]
                                                             🔴 RED / 🟡 YELLOW / 🟢 GREEN
                                                                        │
    ┌───────────────────────┬───────────────────────────────────────────┴───────────────────────┐
    ▼                       ▼                                                                   ▼
[4. Doctor Reply]   [5. Body Pain Map]                                                  [6. Visual Symptoms]
Doctor selects      Locate pain points                                                  Tap symptom cards for
clinical phrases    on Front/Back 2D                                                    non-verbal or traumatized
with native audio   model with severity                                                 patients
    │                       │                                                                   │
    └───────────────────────┴───────────────────────────────────────────┬───────────────────────┘
                                                                        ▼
                                                             [7. Prescription & Rx]
                                                             Multi-lingual dosage schedule
                                                                        │
                                                                        ▼
                                                             [8. Transcripts & Export]
                                                             Audit-ready EHR encounter notes
```

1. **Staff Login**: Clinician accesses the portal with one click.
2. **Patient Admission**: The patient speaks in any supported language (e.g. *"मुझे सीने में बहुत तेज दर्द हो रहा है और सांस लेने में दिक्कत है"*).
3. **Instant Detection & Triage**:
   - Engine recognizes **Hindi** (Devanagari script, 98% confidence).
   - Translates into Doctor's language (English): *"I have severe chest pain and difficulty breathing."*
   - Flags **🔴 RED Triage** severity: Suspected Acute Coronary Syndrome (ACS) with Dyspnea.
4. **Clinical Examination**: Clinician uses Doctor Reply to instruct: *"Please lie down on the bed and relax"* (voiced in Hindi).
5. **Physical Mapping**: Clinician or patient marks the substernal chest region on the interactive Body Map with "Severe" severity.
6. **Prescription**: Medication instructions (e.g. Sorbitrate sublingual / Aspirin 300mg) translated into clear visual schedules.
7. **Documentation**: Entire session saved in chronological transcripts with audio replay capability.

---

## 🛡️ Offline-First Architecture

Emergency healthcare cannot depend on cloud availability:
- **Zero API Dependency for Core Medical Phrases**: English/Hindi/Bengali medical phrase translation, lexical analysis and triage evaluation execute locally in-browser.
- **Offline Speech Strategy**: Microphone recognition prefers the browser's on-device `SpeechRecognition.processLocally` mode when available and its language pack has been installed. If a browser does not support on-device recognition, typed input and quick medical phrases remain offline.
- **Local State Preservation**: Encounter histories and patient profiles are persisted in localStorage. A service worker caches the application shell and runtime assets for offline reloads.

---

## 💡 Hackathon Evaluation Highlights

| Criteria | Hear2Heal Implementation |
| :--- | :--- |
| **Real-World Impact** | Bridges critical communication gaps in emergency triage across India's 22+ official languages and global disaster scenarios. |
| **Innovation** | Eliminates the barrier of manual language selection through zero-click AI detection and pairs translation with clinical triage severity scoring. |
| **UI/UX Excellence** | Collapsible left dashboard, high-contrast visual symptom tiles, 2D anatomical touch map, and mobile blueprint gallery. |
| **Reliability & Speed** | Deterministic local medical phrase/triage logic avoids cloud dependency for the core English/Hindi/Bengali demo flow. |
| **Code Quality** | Strict TypeScript typings, zero compilation errors, modular screen components, and clean code separation. |

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it for healthcare initiatives, research, and non-profit clinical applications.

---

<div align="center">
  <sub>Built with ❤️ for accessible, barrier-free healthcare for all patients.</sub><br>
  <b>Hear2Heal · Every Voice Understood. Every Life Healed.</b>
</div>
