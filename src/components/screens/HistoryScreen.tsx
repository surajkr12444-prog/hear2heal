import React, { useState } from 'react';
import { ArrowLeft, User, UserCheck, Volume2, Trash2, RotateCcw } from 'lucide-react';
import { ScreenId, ChatMessage } from '../../types';
import { INITIAL_CONVERSATION } from '../../data/mockData';
import { playTextToSpeech, stopTextToSpeech } from '../../utils/audio';
import { clearConversationHistory, loadConversationHistory, saveConversationHistory } from '../../utils/offlineStorage';

interface HistoryScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadConversationHistory(INITIAL_CONVERSATION));
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const handlePlayAudio = (msg: ChatMessage) => {
    if (activePlayingId === msg.id) {
      stopTextToSpeech();
      setActivePlayingId(null);
      return;
    }

    const langCode = msg.sourceLang === 'Hindi' ? 'hi-IN' : 'en-US';
    setActivePlayingId(msg.id);
    
    playTextToSpeech(
      msg.text,
      langCode,
      undefined,
      () => setActivePlayingId(null)
    );
  };

  const handleClearHistory = () => {
    clearConversationHistory();
    setMessages([]);
  };

  const handleRestoreHistory = () => {
    saveConversationHistory(INITIAL_CONVERSATION);
    setMessages(INITIAL_CONVERSATION);
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[640px] p-5 neu-bg relative">
      <div className="flex-1 flex flex-col">
        {/* Neumorphic Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('patient_translation')}
              className="neu-btn w-11 h-11 rounded-2xl flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Audio Transcripts</h2>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Clinical Consult Log</p>
            </div>
          </div>

          {messages.length === 0 && (
            <button
              onClick={handleRestoreHistory}
              className="neu-btn px-3 py-2 rounded-xl text-xs font-black text-blue-700 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Message List */}
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 neu-inset rounded-3xl bg-[#e6ecf5] my-4">
            <div className="neu-inset-deep w-14 h-14 rounded-2xl text-slate-400 flex items-center justify-center mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <p className="text-sm font-black text-slate-700">Transcript Log Empty</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">Tap reset above to reload clinical consult sample</p>
          </div>
        ) : (
          <div className="space-y-4 flex-1 overflow-y-auto pr-0.5">
            {messages.map((msg) => {
              const isPatient = msg.sender === 'patient';
              const isPlaying = activePlayingId === msg.id;

              return (
                <div
                  key={msg.id}
                  className="neu-raised p-4 rounded-3xl bg-[#e6ecf5] transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                          isPatient ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white' : 'bg-gradient-to-br from-indigo-500 to-indigo-700 text-white'
                        }`}
                      >
                        {isPatient ? <User className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-800 tracking-tight">
                          {isPatient ? `Patient (${msg.sourceLang})` : `Doctor (${msg.sourceLang})`}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">{msg.timestamp}</span>
                  </div>

                  <div className="neu-inset-sm p-3.5 rounded-2xl bg-[#e6ecf5] flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 leading-snug">
                        "{msg.text}"
                      </p>
                      <p className="text-xs text-blue-700 font-medium mt-1">
                        &rarr; {msg.translatedText}
                      </p>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(msg)}
                      className={`neu-btn w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isPlaying
                          ? 'neu-inset text-blue-600 scale-95'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                      title="Replay Audio"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Clear History Button */}
      {messages.length > 0 && (
        <div className="pt-4">
          <button
            onClick={handleClearHistory}
            className="neu-btn w-full py-3.5 px-4 rounded-2xl text-red-600 hover:text-red-700 text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Consult History</span>
          </button>
        </div>
      )}
    </div>
  );
};
