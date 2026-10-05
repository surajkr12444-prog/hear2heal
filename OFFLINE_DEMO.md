# Hear2Heal Offline Hackathon Demo

## What is genuinely local in this build

- React/Vite application shell after the first successful load (service worker cache).
- English, Hindi and Bengali core medical phrase translation.
- Script/language detection for typed/transcribed text.
- Emergency symptom extraction and RED / YELLOW / GREEN triage heuristics.
- Quick emergency presets and doctor quick clinical commands.
- Patient profile and conversation history in localStorage.
- Text-to-speech when the device has a local voice for the selected language.

## Offline microphone requirement

The project prefers the experimental on-device Web Speech mode (`processLocally`) when the browser supports it. The browser may need to download a language pack once while connected. After that, supported recognition can work offline.

If the browser does not support on-device SpeechRecognition, the UI shows a clear warning and the user can still use typed input, medical quick phrases, visual symptoms and emergency presets fully offline.

For a production-grade, browser-independent offline microphone, bundle a local STT model such as Whisper/Vosk with the application. That model is NOT bundled in this hackathon ZIP because of model size and deployment/runtime requirements.

## Best judge demo

1. Start the app while online once so the service worker caches the application.
2. Choose **Bengali** as Patient Language and **English** or **Hindi** as Doctor Language.
3. While online, tap the microphone once. On browsers that support on-device speech, this can trigger installation of the Bengali local speech pack.
4. Reload once and confirm the app works.
5. Turn Wi-Fi/mobile data OFF.
6. Refresh the app. The header should show **Offline Active**.
7. Use one of these Bengali inputs:
   - `আমার বুকে ব্যথা হচ্ছে।`
   - `আমার শ্বাস নিতে কষ্ট হচ্ছে।`
   - `আমার মাথা ঘুরছে।`
8. Show the English output, Hindi reference, translation confidence and triage result.
9. Open Doctor Reply and use the verified clinical commands, then play the patient-language audio if a local OS voice exists.
10. Open History and show that data is preserved locally.

## Core scope for the hackathon

Do not claim arbitrary free-text translation for every language. Say:

> "Our core offline prototype supports English, Hindi and Bengali medical communication. Other languages have local emergency presets, and the architecture can add more offline language/model packs later."

This is a stronger and more defensible demo than claiming 12+ full offline languages without bundled models.
