import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flower, 
  Heart, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Sun,
  Cloud,
  Wind
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  word: string;
  hyWord: string;
  options: string[];
  correct: string;
}

// --- Data ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    word: "La mesa",
    hyWord: "Սեղանը",
    options: ["Աթոռը", "Սեղանը", "Դուռը"],
    correct: "Սեղանը"
  },
  {
    id: 2,
    word: "La silla",
    hyWord: "Աթոռը",
    options: ["Աթոռը", "Պատուհանը", "Գիրքը"],
    correct: "Աթոռը"
  },
  {
    id: 3,
    word: "La ventana",
    hyWord: "Պատուհանը",
    options: ["Դուռը", "Պատուհանը", "Արևը"],
    correct: "Պատուհանը"
  },
  {
    id: 4,
    word: "La puerta",
    hyWord: "Դուռը",
    options: ["Տունը", "Դուռը", "Սեղանը"],
    correct: "Դուռը"
  },
  {
    id: 5,
    word: "El sol",
    hyWord: "Արևը",
    options: ["Լուսինը", "Արևը", "Աստղը"],
    correct: "Արևը"
  },
  {
    id: 6,
    word: "La luna",
    hyWord: "Լուսինը",
    options: ["Արևը", "Լուսինը", "Գիշերը"],
    correct: "Լուսինը"
  },
  {
    id: 7,
    word: "El libro",
    hyWord: "Գիրքը",
    options: ["Գիրքը", "Տետրը", "Դպրոցը"],
    correct: "Գիրքը"
  },
  {
    id: 8,
    word: "La escuela",
    hyWord: "Դպրոցը",
    options: ["Տունը", "Դպրոցը", "Այգին"],
    correct: "Դպրոցը"
  }
];

export default function GayaneFlowerQuest() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[step];

  const handleAnswer = (option: string) => {
    if (feedback || isFinished) return;
    setSelectedOption(option);
    
    const isCorrect = option === currentQuestion.correct;
    
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      if (step < QUESTIONS.length - 1) {
        setStep(s => s + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-pink-50 text-slate-800 font-sans p-4 md:p-8 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Garden Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <Sun className="absolute top-10 right-10 w-24 h-24 text-yellow-400 animate-spin-slow" />
        <Cloud className="absolute top-20 left-20 w-32 h-32 text-white" />
        <div className="absolute bottom-0 w-full h-40 bg-emerald-100" />
        {/* Animated Flowers in background */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity }}
            className="absolute bottom-10"
            style={{ left: `${i * 10}%` }}
          >
            <Flower className="w-12 h-12 text-pink-300" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl w-full relative z-10 py-4">
        {!isFinished ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] border-4 border-pink-200 shadow-xl flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pink-100 rounded-2xl p-1 shadow-inner border-2 border-pink-200 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gayane&backgroundColor=ffdfbf" alt="Gayane" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h1 className="text-xl font-black italic tracking-tighter text-pink-500">ԳԱՅԱՆԵԻ ԾԱՂԿԱՅԻՆ ՔՎԵՍԹ</h1>
                  <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Spanish Terms of Endearment</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-pink-50 px-4 py-2 rounded-2xl border-2 border-pink-100">
                <Heart className="w-6 h-6 text-pink-500 fill-current" />
                <span className="text-2xl font-black text-pink-600">{score}</span>
              </div>
            </div>

            {/* Question Flower Card */}
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border-4 border-pink-100 relative overflow-hidden text-center">
              <div className="absolute -top-10 -left-10 opacity-10">
                <Flower className="w-40 h-40 text-pink-500" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-50 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-8">
                  ԾԱՂԻԿ {step + 1} / {QUESTIONS.length}
                </div>
                
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-black text-pink-400 uppercase tracking-[0.2em]">ԻՍՊԱՆԵՐԵՆ ԲԱՌԸ</p>
                  <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-slate-800 drop-shadow-sm">
                    {currentQuestion.word}
                  </h2>
                </motion.div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {currentQuestion.options.map((option, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => handleAnswer(option)}
                    className={`py-8 px-4 rounded-[2rem] border-4 transition-all text-2xl font-black shadow-lg flex flex-col items-center gap-3 relative overflow-hidden group ${
                      selectedOption === option
                        ? feedback === 'correct'
                          ? 'bg-emerald-500 border-white text-white scale-105'
                          : 'bg-red-500 border-white text-white scale-105'
                        : feedback && option === currentQuestion.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                        : 'bg-white border-pink-50 text-slate-700 hover:border-pink-400 hover:text-pink-600 hover:scale-105'
                    }`}
                  >
                    <Flower className={`w-8 h-8 ${selectedOption === option ? 'text-white' : 'text-pink-300 group-hover:rotate-45 transition-transform'}`} />
                    {option}
                  </button>
                ))}
              </div>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-20 rounded-[3rem]"
                  >
                    <div className={`p-10 rounded-full shadow-2xl border-8 border-white ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      {feedback === 'correct' ? (
                        <CheckCircle2 className="w-20 h-20 text-white" />
                      ) : (
                        <XCircle className="w-20 h-20 text-white" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hint Box */}
            <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100 flex items-center gap-4 shadow-sm">
              <Sparkles className="w-8 h-8 text-emerald-400" />
              <p className="text-sm font-bold text-emerald-700 italic">
                Գայանե՛, ընտրիր ճիշտ հայերեն թարգմանությունը, որպեսզի ծաղիկը բացվի:
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-12 md:p-20 rounded-[4rem] border-8 border-pink-100 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.05)_0%,transparent_70%)] pointer-events-none" />
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <div className="bg-pink-100 p-10 rounded-full border-4 border-white shadow-xl">
                <Heart className="w-24 h-24 text-pink-500 fill-current" />
              </div>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-slate-800 italic uppercase tracking-tighter mb-4">ՀՐԱՇԱԼԻ Է, ԳԱՅԱՆԵ!</h2>
            <p className="text-2xl font-bold text-pink-400 italic mb-12">Դու հավաքեցիր գեղեցիկ ծաղկեփունջ:</p>
            
            <div className="bg-pink-50 p-10 rounded-[3rem] border-4 border-white mb-12">
              <p className="text-[10px] font-black text-pink-300 uppercase tracking-[0.3em] mb-4">ՔՈ ԱՐԴՅՈՒՆՔԸ</p>
              <div className="flex justify-center items-baseline gap-2">
                <span className="text-9xl font-black text-pink-500 drop-shadow-lg">{score}</span>
                <span className="text-4xl font-black text-slate-300">/ {QUESTIONS.length}</span>
              </div>
            </div>

            <button 
              onClick={restart}
              className="w-full py-8 bg-pink-500 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-pink-600 transition-all shadow-xl border-b-8 border-pink-800 active:translate-y-2 active:border-b-0 flex items-center justify-center gap-6 group"
            >
              <RotateCcw className="w-10 h-10 group-hover:rotate-180 transition-transform duration-700" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
          </motion.div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #fdf2f8;
          margin: 0;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
    </div>
  );
}
