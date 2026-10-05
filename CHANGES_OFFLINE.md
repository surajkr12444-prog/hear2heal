# Offline Upgrade Changes

This hackathon build adds the following to the original Hear2Heal project:

- PWA manifest and service worker (`public/sw.js`) for offline app-shell/runtime caching.
- Removed runtime Google Fonts dependency so the UI does not need that external request.
- Honest online/offline status badge in the main header.
- Core local medical phrase translation for English, Hindi and Bengali.
- Translation coverage + confidence indicator instead of pretending every free-text sentence is fully translated.
- On-device Web Speech preference using `processLocally` where the browser supports it.
- Correct speech locale mapping (`hi-IN`, `bn-IN`, `en-US`, etc.) instead of blank `recognition.lang`.
- Clear offline microphone fallback message when a local speech pack/browser capability is unavailable.
- Real doctor microphone recognition instead of the old timer-only animation.
- Local conversation history persistence and patient-profile persistence.
- Local OS voice preference for text-to-speech.
- Blank-input preset bug fixed.
- Basic negation safety for critical chest-pain/breathing statements.
- Doctor output kept centered on English/Hindi; core patient offline languages are English/Hindi/Bengali.
- `OFFLINE_DEMO.md` with a judge-demo procedure and truthful scope statement.

## Important limitation

This ZIP does not bundle Whisper/Vosk model files. Therefore browser-independent offline speech-to-text is not guaranteed on every browser/device. On-device microphone recognition works only where the browser provides local SpeechRecognition and the required language pack is installed. Typed medical translation, presets, triage, PWA cache, history and profile do not need a cloud API.
