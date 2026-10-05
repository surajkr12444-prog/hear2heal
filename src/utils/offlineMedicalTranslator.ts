export interface OfflineTranslationResult {
  english: string;
  hindi: string;
  coverage: 'exact' | 'medical-phrase' | 'limited';
  confidence: number;
}

interface PhraseRow {
  en: string;
  hi: string;
  bn: string;
}

// Deliberately small, audited emergency/triage phrasebook for the hackathon prototype.
// This is local data: no API call is required.
export const CORE_MEDICAL_PHRASES: PhraseRow[] = [
  { en: 'I have severe chest pain.', hi: 'मुझे सीने में बहुत तेज दर्द हो रहा है।', bn: 'আমার বুকে খুব তীব্র ব্যথা হচ্ছে।' },
  { en: 'I have chest pain.', hi: 'मुझे सीने में दर्द हो रहा है।', bn: 'আমার বুকে ব্যথা হচ্ছে।' },
  { en: 'I am having difficulty breathing.', hi: 'मुझे सांस लेने में दिक्कत हो रही है।', bn: 'আমার শ্বাস নিতে কষ্ট হচ্ছে।' },
  { en: 'I cannot breathe properly.', hi: 'मैं ठीक से सांस नहीं ले पा रहा/रही हूं।', bn: 'আমি ঠিকমতো শ্বাস নিতে পারছি না।' },
  { en: 'I have fever.', hi: 'मुझे बुखार है।', bn: 'আমার জ্বর হয়েছে।' },
  { en: 'I have had fever for three days.', hi: 'मुझे तीन दिन से बुखार है।', bn: 'আমার তিন দিন ধরে জ্বর।' },
  { en: 'I feel dizzy.', hi: 'मुझे चक्कर आ रहा है।', bn: 'আমার মাথা ঘুরছে।' },
  { en: 'I have a headache.', hi: 'मेरे सिर में दर्द है।', bn: 'আমার মাথা ব্যথা করছে।' },
  { en: 'I have severe stomach pain.', hi: 'मेरे पेट में बहुत तेज दर्द है।', bn: 'আমার পেটে খুব ব্যথা করছে।' },
  { en: 'I am vomiting.', hi: 'मुझे उल्टी हो रही है।', bn: 'আমার বমি হচ্ছে।' },
  { en: 'I am bleeding heavily.', hi: 'मेरा बहुत ज्यादा खून बह रहा है।', bn: 'আমার প্রচুর রক্তপাত হচ্ছে।' },
  { en: 'The patient is unconscious.', hi: 'मरीज बेहोश है।', bn: 'রোগী অচেতন।' },
  { en: 'I have an allergy.', hi: 'मुझे एलर्जी है।', bn: 'আমার অ্যালার্জি আছে।' },
  { en: 'I need urgent help.', hi: 'मुझे तुरंत मदद चाहिए।', bn: 'আমার জরুরি সাহায্য দরকার।' },
  { en: 'The pain started suddenly.', hi: 'दर्द अचानक शुरू हुआ।', bn: 'ব্যথা হঠাৎ শুরু হয়েছে।' },
  { en: 'The pain is getting worse.', hi: 'दर्द बढ़ता जा रहा है।', bn: 'ব্যথা বাড়ছে।' }
];

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[“”"'!?.,।]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

function exactPhrase(text: string, languageId: string): OfflineTranslationResult | null {
  const normalized = normalize(text);
  for (const row of CORE_MEDICAL_PHRASES) {
    const candidate = languageId === 'bn' ? row.bn : languageId === 'hi' ? row.hi : row.en;
    if (normalize(candidate) === normalized) {
      return { english: row.en, hindi: row.hi, coverage: 'exact', confidence: 99 };
    }
  }
  return null;
}

const CONCEPTS = {
  chestPain: {
    en: /\b(chest pain|pain in (my )?chest|chest hurts?)\b/i,
    hi: /(सीने|छाती).{0,12}(दर्द|पीड़ा)/,
    bn: /(বুকে|বুক).{0,12}(ব্যথা|যন্ত্রণা)/
  },
  breathing: {
    en: /\b(short(ness)? of breath|difficulty breathing|trouble breathing|cannot breathe|can't breathe|breathless)\b/i,
    hi: /(सांस|श्वास).{0,18}(दिक्कत|तकलीफ|मुश्किल|नहीं|नही|फूल)/,
    bn: /(শ্বাস).{0,18}(কষ্ট|সমস্যা|পারছি না|শ্বাসকষ্ট)/
  },
  fever: {
    en: /\b(fever|high temperature)\b/i,
    hi: /(बुखार|तेज ताप)/,
    bn: /(জ্বর)/
  },
  dizziness: {
    en: /\b(dizzy|dizziness|lightheaded)\b/i,
    hi: /(चक्कर)/,
    bn: /(মাথা ঘুর|ঘোর লাগ)/
  },
  headache: {
    en: /\b(headache|head pain)\b/i,
    hi: /(सिर.{0,8}दर्द|सिरदर्द)/,
    bn: /(মাথা.{0,8}ব্যথা)/
  },
  stomach: {
    en: /\b(stomach pain|abdominal pain|abdomen pain)\b/i,
    hi: /(पेट).{0,10}(दर्द|पीड़ा)/,
    bn: /(পেট).{0,10}(ব্যথা)/
  },
  vomiting: {
    en: /\b(vomit|vomiting|throwing up)\b/i,
    hi: /(उल्टी|उलटी)/,
    bn: /(বমি)/
  },
  bleeding: {
    en: /\b(bleeding|blood loss)\b/i,
    hi: /(खून|रक्त).{0,15}(बह|निकल)/,
    bn: /(রক্তপাত|রক্ত.{0,12}(যাচ্ছে|বের))/
  },
  unconscious: {
    en: /\b(unconscious|fainted|passed out)\b/i,
    hi: /(बेहोश|बेहोशी)/,
    bn: /(অচেতন|জ্ঞান নেই)/
  }
} as const;

function isNegated(text: string, languageId: string, matchIndex: number): boolean {
  const start = Math.max(0, matchIndex - 28);
  const end = Math.min(text.length, matchIndex + 45);
  const windowText = text.slice(start, end).toLowerCase();
  if (languageId === 'hi') return /(नहीं|नही|मत)/.test(windowText);
  if (languageId === 'bn') return /(না|নেই|নয়)/.test(windowText);
  return /\b(no|not|don't|do not|doesn't|without)\b/i.test(windowText);
}

function hasConcept(text: string, languageId: 'en' | 'hi' | 'bn', key: keyof typeof CONCEPTS): boolean {
  const regex = CONCEPTS[key][languageId];
  const match = text.match(regex);
  if (!match || match.index == null) return false;
  return !isNegated(text, languageId, match.index);
}

export function translateCoreMedicalText(text: string, languageId: string): OfflineTranslationResult | null {
  if (!text.trim() || !['en', 'hi', 'bn'].includes(languageId)) return null;

  const exact = exactPhrase(text, languageId);
  if (exact) return exact;

  const lang = languageId as 'en' | 'hi' | 'bn';
  const detected: (keyof typeof CONCEPTS)[] = [];
  (Object.keys(CONCEPTS) as (keyof typeof CONCEPTS)[]).forEach((key) => {
    if (hasConcept(text, lang, key)) detected.push(key);
  });

  if (!detected.length) {
    if (lang === 'en') {
      return {
        english: text.trim(),
        hindi: 'ऑफलाइन शब्दावली में इस वाक्य का पूर्ण अनुवाद उपलब्ध नहीं है। डॉक्टर मूल अंग्रेज़ी वाक्य देखें।',
        coverage: 'limited',
        confidence: 55
      };
    }
    if (lang === 'hi') {
      return {
        english: 'Full offline translation is not available for this free-text sentence. Please use the medical quick phrases or confirm manually.',
        hindi: text.trim(),
        coverage: 'limited',
        confidence: 55
      };
    }
    return {
      english: 'Full offline translation is not available for this Bengali free-text sentence. Please use the medical quick phrases or confirm manually.',
      hindi: 'इस बंगाली वाक्य का पूर्ण ऑफलाइन अनुवाद उपलब्ध नहीं है। मेडिकल क्विक-फ्रेज़ का उपयोग करें या मैन्युअली पुष्टि करें।',
      coverage: 'limited',
      confidence: 50
    };
  }

  const englishParts: string[] = [];
  const hindiParts: string[] = [];
  const phraseMap: Record<keyof typeof CONCEPTS, [string, string]> = {
    chestPain: ['The patient reports chest pain', 'मरीज सीने में दर्द बता रहा/रही है'],
    breathing: ['difficulty breathing', 'सांस लेने में दिक्कत'],
    fever: ['fever', 'बुखार'],
    dizziness: ['dizziness', 'चक्कर'],
    headache: ['headache', 'सिरदर्द'],
    stomach: ['stomach pain', 'पेट दर्द'],
    vomiting: ['vomiting', 'उल्टी'],
    bleeding: ['active bleeding', 'खून बहना'],
    unconscious: ['loss of consciousness', 'बेहोशी']
  };

  detected.forEach((key, index) => {
    const [en, hi] = phraseMap[key];
    if (index === 0) {
      englishParts.push(en);
      hindiParts.push(hi);
    } else {
      englishParts.push(en.replace(/^The patient reports /, ''));
      hindiParts.push(hi.replace(/^मरीज /, ''));
    }
  });

  return {
    english: `${englishParts.join(', ')}.`,
    hindi: `${hindiParts.join(', ')}।`,
    coverage: 'medical-phrase',
    confidence: Math.min(94, 78 + detected.length * 4)
  };
}

const DOCTOR_PHRASES: Array<{ en: string; hi: string; bn: string }> = [
  { en: 'Have you taken any medicine today?', hi: 'क्या आपने आज कोई दवा ली है?', bn: 'আপনি কি আজ কোনো ওষুধ খেয়েছেন?' },
  { en: 'Where exactly does it hurt the most?', hi: 'आपको ठीक कहां सबसे ज्यादा दर्द हो रहा है?', bn: 'আপনার ঠিক কোথায় সবচেয়ে বেশি ব্যথা করছে?' },
  { en: 'Please take deep breaths. We are starting oxygen support now.', hi: 'कृपया गहरी सांस लें। हम अभी ऑक्सीजन सपोर्ट शुरू कर रहे हैं।', bn: 'দয়া করে গভীর শ্বাস নিন। আমরা এখনই অক্সিজেন সাপোর্ট শুরু করছি।' },
  { en: 'When did the pain start?', hi: 'दर्द कब शुरू हुआ?', bn: 'ব্যথা কখন শুরু হয়েছে?' },
  { en: 'Do you have any allergies?', hi: 'क्या आपको किसी चीज से एलर्जी है?', bn: 'আপনার কি কোনো অ্যালার্জি আছে?' },
  { en: 'Please stay calm. We are checking you now.', hi: 'कृपया शांत रहें। हम अभी आपकी जांच कर रहे हैं।', bn: 'দয়া করে শান্ত থাকুন। আমরা এখন আপনাকে পরীক্ষা করছি।' },
  { en: 'Are you having difficulty breathing?', hi: 'क्या आपको सांस लेने में दिक्कत हो रही है?', bn: 'আপনার কি শ্বাস নিতে কষ্ট হচ্ছে?' }
];

export function translateDoctorCorePhrase(text: string, sourceLanguageId: string, targetLanguageId: string): string | null {
  if (!['en', 'hi'].includes(sourceLanguageId) || !['en', 'hi', 'bn'].includes(targetLanguageId)) return null;
  const normalized = normalize(text);
  const row = DOCTOR_PHRASES.find((item) => normalize(sourceLanguageId === 'hi' ? item.hi : item.en) === normalized);
  if (!row) return null;
  if (targetLanguageId === 'bn') return row.bn;
  if (targetLanguageId === 'hi') return row.hi;
  return row.en;
}
