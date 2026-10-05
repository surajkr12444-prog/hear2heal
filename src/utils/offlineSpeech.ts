export type OfflineSpeechStatus =
  | 'ready'
  | 'downloadable'
  | 'downloading'
  | 'unavailable'
  | 'unsupported'
  | 'online-fallback';

const SPEECH_LOCALES: Record<string, string> = {
  en: 'en-US',
  hi: 'hi-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  gu: 'gu-IN',
  pa: 'pa-IN',
  ur: 'ur-IN',
  ar: 'ar-SA',
  es: 'es-ES',
  fr: 'fr-FR'
};

export function getSpeechLocale(languageId: string): string {
  return SPEECH_LOCALES[languageId] || languageId || 'en-US';
}

export function getSpeechRecognitionConstructor(): any | null {
  if (typeof window === 'undefined') return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

/**
 * Checks whether the browser supports the experimental on-device Web Speech mode.
 * If a language pack can be downloaded and the device is online, this function
 * attempts installation. Once installed, recognition can continue without network.
 */
export async function prepareOfflineSpeech(languageId: string): Promise<OfflineSpeechStatus> {
  const SpeechRecognition = getSpeechRecognitionConstructor();
  if (!SpeechRecognition) return 'unsupported';

  const locale = getSpeechLocale(languageId);
  if (typeof SpeechRecognition.available !== 'function') {
    return navigator.onLine ? 'online-fallback' : 'unavailable';
  }

  try {
    const availability = await SpeechRecognition.available({
      langs: [locale],
      processLocally: true
    });

    if (availability === 'available') return 'ready';
    if (availability === 'downloading') return 'downloading';

    if (availability === 'downloadable') {
      if (!navigator.onLine || typeof SpeechRecognition.install !== 'function') {
        return 'downloadable';
      }
      const installed = await SpeechRecognition.install({ langs: [locale] });
      return installed ? 'ready' : 'downloadable';
    }

    return 'unavailable';
  } catch {
    return navigator.onLine ? 'online-fallback' : 'unavailable';
  }
}

export interface RecognitionCallbacks {
  onTranscript: (text: string, isFinal: boolean) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (message: string) => void;
}

export async function startMedicalSpeechRecognition(
  languageId: string,
  callbacks: RecognitionCallbacks
): Promise<any | null> {
  const SpeechRecognition = getSpeechRecognitionConstructor();
  if (!SpeechRecognition) {
    callbacks.onError?.('Speech recognition is not supported in this browser. Use typed input or Chrome with on-device speech support.');
    return null;
  }

  const status = await prepareOfflineSpeech(languageId);
  if (!navigator.onLine && status !== 'ready') {
    callbacks.onError?.(
      status === 'downloadable'
        ? 'Offline speech pack is not installed for this language. Connect once, install the pack, then retry offline.'
        : 'Offline speech recognition is not available in this browser. Typed input and quick medical phrases still work fully offline.'
    );
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = getSpeechLocale(languageId);

    if ('processLocally' in recognition && status === 'ready') {
      recognition.processLocally = true;
    }

    recognition.onstart = () => callbacks.onStart?.();
    recognition.onresult = (event: any) => {
      let transcript = '';
      let final = false;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        final = final || Boolean(event.results[i].isFinal);
      }
      if (transcript.trim()) callbacks.onTranscript(transcript.trim(), final);
    };
    recognition.onerror = (event: any) => {
      callbacks.onError?.(`Voice input error: ${event?.error || 'unknown error'}`);
    };
    recognition.onend = () => callbacks.onEnd?.();
    recognition.start();
    return recognition;
  } catch {
    callbacks.onError?.('Could not start microphone recognition. Please use typed input.');
    return null;
  }
}
