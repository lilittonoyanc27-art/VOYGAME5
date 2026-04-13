import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  PhoneOff, 
  MessageSquare, 
  User, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy,
  Mic,
  Volume2,
  Send
} from 'lucide-react';

// --- Types ---
interface DialogueStep {
  id: number;
  speaker: 'gor' | 'gayane';
  textBefore: string;
  textAfter: string;
  hyMeaning: string;
  correct: string;
  options: string[];
}

// --- Data ---
const DIALOGUE: DialogueStep[] = [
  {
    id: 1,
    speaker: 'gor',
    textBefore: "Hola Gayane, ¿cómo ",
    textAfter: "?",
    hyMeaning: "Ողջույն Գայանե, ինչպե՞ս ես:",
    correct: "estás",
    options: ["estás", "está", "estoy"]
  },
  {
    id: 2,
    speaker: 'gayane',
    textBefore: "Hola Gor, ",
    textAfter: " bien, gracias.",
    hyMeaning: "Ողջույն Գոռ, լավ եմ, շնորհակալություն:",
    correct: "estoy",
    options: ["estoy", "estás", "está"]
  },
  {
    id: 3,
    speaker: 'gor',
    textBefore: "¿Qué ",
    textAfter: " hoy?",
    hyMeaning: "Ի՞նչ ես անում այսօր:",
    correct: "haces",
    options: ["haces", "hace", "hacen"]
  },
  {
    id: 4,
    speaker: 'gayane',
    textBefore: "Yo ",
    textAfter: " que estudiar español.",
    hyMeaning: "Ես պետք է իսպաներեն սովորեմ:",
    correct: "tengo",
    options: ["tengo", "tiene", "tenemos"]
  },
  {
    id: 5,
    speaker: 'gor',
    textBefore: "¡Qué bien! ",
    textAfter: " que practicar mucho.",
    hyMeaning: "Ինչ լավ է: Պետք է շատ պրակտիկա անել (ընդհանուր):",
    correct: "Hay",
    options: ["Hay", "Tengo", "Tiene"]
  },
  {
    id: 6,
    speaker: 'gayane',
    textBefore: "¿",
    textAfter: " tú a la fiesta mañana?",
    hyMeaning: "Դու գնո՞ւմ ես խնջույքին վաղը:",
    correct: "Vas",
    options: ["Vas", "Va", "Voy"]
  },
  {
    id: 7,
    speaker: 'gor',
    textBefore: "Sí, yo ",
    textAfter: " a ir.",
    hyMeaning: "Այո, ես պատրաստվում եմ գնալ:",
    correct: "voy",
    options: ["voy", "vas", "va"]
  },
  {
    id: 8,
    speaker: 'gayane',
    textBefore: "Perfecto. ¿",
    textAfter: " algo de comer?",
    hyMeaning: "Հիանալի է: Ուտելու բան կա՞:",
    correct: "Hay",
    options: ["Hay", "Tiene", "Tengo"]
  },
  {
    id: 9,
    speaker: 'gor',
    textBefore: "Sí, ",
    textAfter: " pizza en la cocina.",
    hyMeaning: "Այո, խոհանոցում պիցցա կա:",
    correct: "hay",
    options: ["hay", "tiene", "tengo"]
  },
  {
    id: 10,
    speaker: 'gayane',
    textBefore: "¡Genial! Nos ",
    textAfter: " mañana.",
    hyMeaning: "Հիանալի է: Կտեսնվենք վաղը:",
    correct: "vemos",
    options: ["vemos", "ve", "ven"]
  }
];

export default function GorGayanePhoneDialogue() {
  const [stepIndex, setStepIndex] = useState(0);
  const [history, setHistory] = useState<{ speaker: 'gor' | 'gayane', text: string }[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentStep = DIALOGUE[stepIndex];

  const handleAnswer = (option: string) => {
    if (feedback || isFinished) return;
    setSelectedOption(option);

    if (option === currentStep.correct) {
      setFeedback('correct');
      setScore(s => s + 1);
      
      setTimeout(() => {
        const completedText = `${currentStep.textBefore}${option}${currentStep.textAfter}`;
        setHistory(prev => [...prev, { speaker: currentStep.speaker, text: completedText }]);
        
        if (stepIndex < DIALOGUE.length - 1) {
          setStepIndex(prev => prev + 1);
          setFeedback(null);
          setSelectedOption(null);
        } else {
          setIsFinished(true);
        }
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 1000);
    }
  };

  const restart = () => {
    setStepIndex(0);
    setHistory([]);
    setScore(0);
    setFeedback(null);
    setSelectedOption(null);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-black rounded-[3rem] border-[12px] border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[700px] relative">
        
        {/* Phone Status Bar */}
        <div className="h-12 bg-slate-800 flex items-center justify-between px-8">
          <span className="text-xs font-bold">9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2 bg-white/50 rounded-sm" />
            <div className="w-4 h-2 bg-white rounded-sm" />
          </div>
        </div>

        {/* Call Header */}
        <div className="p-6 bg-slate-800/50 backdrop-blur-md border-b border-white/10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-2 shadow-lg">
            <Phone className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-lg font-black uppercase tracking-widest">Իսպաներեն Զանգ</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Գոռ & Գայանե</p>
        </div>

        {/* Chat/Dialogue Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 custom-scrollbar">
          {history.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.speaker === 'gor' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.speaker === 'gor' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium shadow-md ${
                msg.speaker === 'gor' 
                  ? 'bg-blue-600 text-white rounded-bl-none' 
                  : 'bg-purple-600 text-white rounded-br-none'
              }`}>
                <p className="text-[10px] opacity-50 font-black uppercase mb-1">
                  {msg.speaker === 'gor' ? 'Գոռ' : 'Գայանե'}
                </p>
                {msg.text}
              </div>
            </motion.div>
          ))}
          
          {!isFinished && (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${currentStep.speaker === 'gor' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-bold shadow-xl border-2 animate-pulse ${
                currentStep.speaker === 'gor' 
                  ? 'bg-blue-900/50 border-blue-500 text-blue-100 rounded-bl-none' 
                  : 'bg-purple-900/50 border-purple-500 text-purple-100 rounded-br-none'
              }`}>
                <p className="text-[10px] opacity-50 font-black uppercase mb-2">
                  {currentStep.speaker === 'gor' ? 'Գոռը գրում է...' : 'Գայանեն գրում է...'}
                </p>
                <div className="flex flex-wrap items-center gap-1">
                  {currentStep.textBefore}
                  <span className="px-3 py-1 bg-white/10 rounded-md border border-dashed border-white/30 min-w-[60px] text-center">
                    {selectedOption || "???"}
                  </span>
                  {currentStep.textAfter}
                </div>
                <p className="mt-3 text-[10px] italic text-white/40 border-t border-white/10 pt-2">
                  {currentStep.hyMeaning}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input/Options Area */}
        <div className="p-6 bg-slate-800 border-t border-white/10">
          {!isFinished ? (
            <div className="grid grid-cols-3 gap-2">
              {currentStep.options.map((option, i) => (
                <button
                  key={i}
                  disabled={!!feedback}
                  onClick={() => handleAnswer(option)}
                  className={`py-3 rounded-xl font-black text-xs uppercase transition-all shadow-lg border-2 ${
                    selectedOption === option
                      ? feedback === 'correct'
                        ? 'bg-emerald-500 border-white text-white scale-105'
                        : 'bg-red-500 border-white text-white shake'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white active:scale-95'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-2 mb-2">
                <Trophy className="w-10 h-10 text-yellow-400" />
              </div>
              <h3 className="font-black text-xl italic tracking-tighter">ԶԱՆԳԻ ԱՎԱՐՏ</h3>
              <p className="text-xs font-bold text-slate-400">Դուք հիանալի երկխոսություն կազմեցիք:</p>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black uppercase text-slate-500 mb-1">ՄԻԱՎՈՐՆԵՐ</p>
                <p className="text-2xl font-black text-blue-400">{score} / {DIALOGUE.length}</p>
              </div>
              <button 
                onClick={restart}
                className="w-full py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                ՆՈՐԻՑ ԶԱՆԳԵԼ
              </button>
            </div>
          )}
        </div>

        {/* Call Controls (Visual only) */}
        <div className="h-20 bg-slate-900 flex items-center justify-around px-8 border-t border-white/5">
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-500"><Mic className="w-5 h-5" /></div>
          <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/40"><PhoneOff className="w-6 h-6 text-white" /></div>
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-500"><Volume2 className="w-5 h-5" /></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}} />
    </div>
  );
}
