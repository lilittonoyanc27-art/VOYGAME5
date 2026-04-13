import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Flag,
  Zap,
  Star,
  ChevronRight,
  Timer,
  Car
} from 'lucide-react';

// --- Types ---
interface Exercise {
  id: number;
  verb: string;
  subject: string;
  hySubject: string;
  correct: string;
  options: string[];
}

// --- Data ---
const VERBS = [
  { verb: 'Escribir', meaning: 'Գրել' },
  { verb: 'Escuchar', meaning: 'Լսել' },
  { verb: 'Trabajar', meaning: 'Աշխատել' }
];

const SUBJECTS = [
  { sp: 'Yo', hy: 'Ես', ending: { 'ar': 'o', 'er': 'o', 'ir': 'o' } },
  { sp: 'Tú', hy: 'Դու', ending: { 'ar': 'as', 'er': 'es', 'ir': 'es' } },
  { sp: 'Él/Ella', hy: 'Նա', ending: { 'ar': 'a', 'er': 'e', 'ir': 'e' } },
  { sp: 'Nosotros', hy: 'Մենք', ending: { 'ar': 'amos', 'er': 'emos', 'ir': 'imos' } },
  { sp: 'Vosotros', hy: 'Դուք', ending: { 'ar': 'áis', 'er': 'éis', 'ir': 'ís' } },
  { sp: 'Ellos/Ellas', hy: 'Նրանք', ending: { 'ar': 'an', 'er': 'en', 'ir': 'en' } }
];

const generateExercises = (): Exercise[] => {
  const exercises: Exercise[] = [];
  let id = 1;
  
  VERBS.forEach(v => {
    const type = v.verb.endsWith('ar') ? 'ar' : v.verb.endsWith('er') ? 'er' : 'ir';
    const stem = v.verb.slice(0, -2);
    
    SUBJECTS.forEach(s => {
      const correct = stem + s.ending[type as keyof typeof s.ending];
      // Generate some fake options
      const options = [correct];
      while (options.length < 3) {
        const randomSub = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
        const fake = stem + randomSub.ending[type as keyof typeof randomSub.ending];
        if (!options.includes(fake)) options.push(fake);
      }
      
      exercises.push({
        id: id++,
        verb: v.verb,
        subject: s.sp,
        hySubject: s.hy,
        correct: correct,
        options: options.sort(() => Math.random() - 0.5)
      });
    });
  });
  
  return exercises.sort(() => Math.random() - 0.5).slice(0, 15);
};

export default function GorRacingQuest() {
  const [exercises] = useState(generateExercises());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [progress, setProgress] = useState(0); // 0 to 100

  const currentExercise = exercises[currentIndex];

  const handleAnswer = (option: string) => {
    if (feedback || isFinished) return;
    setSelectedOption(option);
    
    if (option === currentExercise.correct) {
      setFeedback('correct');
      setScore(s => s + 1);
      setProgress(p => Math.min(p + (100 / exercises.length), 100));
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setProgress(0);
    setFeedback(null);
    setIsFinished(false);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 md:p-8 flex flex-col items-center justify-start relative overflow-hidden">
      {/* Racing Track Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#1e293b_0%,#0f172a_100%)]" />
        {/* Road Perspective */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[60%] bg-slate-800 origin-bottom [transform:perspective(500px)_rotateX(60deg)]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_40px,#334155_40px,#334155_80px)]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-full bg-[repeating-linear-gradient(to_bottom,#fde047,#fde047_40px,transparent_40px,transparent_80px)]" />
        </div>
      </div>

      <div className="max-w-4xl w-full relative z-10 py-4">
        {/* Header */}
        <div className="bg-slate-800/80 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl border-4 border-yellow-500/30 shadow-2xl flex justify-between items-center mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-yellow-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg border-2 border-white rotate-3">
              <Flag className="w-5 h-5 md:w-8 md:h-8 text-slate-900" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-black italic tracking-tighter text-yellow-500 uppercase">ԳՈՌԻ ՄՐՑԱՐՇԱՎԸ</h1>
              <p className="text-slate-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Verb Racing Master</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <div className="text-right">
              <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase">ՄԻԱՎՈՐ</p>
              <p className="text-xl md:text-2xl font-black text-yellow-500">{score}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-600">
              <Timer className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* 3D-ish Racing Track Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-[2rem] p-4 md:p-8 mb-6 md:mb-8 border-2 border-slate-700 relative h-32 md:h-48 overflow-hidden shadow-inner">
          <div className="absolute inset-x-0 bottom-6 md:bottom-10 h-1 bg-slate-700" />
          
          {/* Finish Line */}
          <div className="absolute right-6 md:right-10 bottom-2 md:bottom-4 h-12 md:h-16 w-3 md:w-4 bg-[repeating-linear-gradient(to_bottom,#fff,#fff_8px,#000_8px,#000_16px)] border border-slate-500" />
          
          {/* Opponent Car (Static or slow) */}
          <div className="absolute left-[20%] bottom-8 md:bottom-12 transition-all duration-1000">
            <div className="relative">
              <Car className="w-8 h-8 md:w-12 md:h-12 text-red-500 drop-shadow-[0_5px_10px_rgba(239,68,68,0.5)]" />
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-500 text-[6px] md:text-[8px] font-black px-1.5 py-0.5 rounded uppercase">ՄՐՑԱԿԻՑ</div>
            </div>
          </div>

          {/* Gor's Car */}
          <motion.div 
            animate={{ left: `${10 + (progress * 0.75)}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
            className="absolute bottom-4 md:bottom-6 z-20"
          >
            <div className="relative">
              <Car className="w-12 h-12 md:w-20 md:h-20 text-yellow-400 drop-shadow-[0_10px_20px_rgba(234,179,8,0.6)]" />
              <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 text-[8px] md:text-[10px] font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase shadow-lg border-2 border-white whitespace-nowrap">ԳՈՌ</div>
              {/* Exhaust Flames */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="absolute -left-3 md:-left-4 bottom-2 md:bottom-4 w-4 md:w-6 h-2 md:h-3 bg-orange-500 rounded-full blur-sm opacity-70" 
              />
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-yellow-500/20 relative">
                <div className="text-center mb-6 md:mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 md:mb-6">
                    ՀԱՐՑ {currentIndex + 1} / {exercises.length}
                  </div>
                  
                  <div className="space-y-2 md:space-y-4">
                    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                      <span className="text-xl md:text-3xl font-black text-yellow-600 uppercase tracking-widest">{currentExercise.subject}</span>
                      <ChevronRight className="w-5 h-5 md:w-8 md:h-8 text-slate-300" />
                      <span className="text-3xl md:text-5xl font-black text-slate-800 italic tracking-tighter">{currentExercise.verb}</span>
                    </div>
                    <p className="text-sm md:text-xl font-bold text-slate-400 italic">
                      ({currentExercise.hySubject} | {VERBS.find(v => v.verb === currentExercise.verb)?.meaning})
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                  {currentExercise.options.map((option, i) => (
                    <button
                      key={i}
                      disabled={!!feedback}
                      onClick={() => handleAnswer(option)}
                      className={`py-6 md:py-10 px-4 rounded-2xl md:rounded-3xl border-4 transition-all text-xl md:text-3xl font-black shadow-xl relative overflow-hidden ${
                        selectedOption === option
                          ? feedback === 'correct'
                            ? 'bg-emerald-500 border-white text-white scale-105'
                            : 'bg-red-500 border-white text-white scale-105'
                          : feedback && option === currentExercise.correct
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                          : 'bg-slate-50 border-slate-100 text-slate-800 hover:border-yellow-400 hover:text-yellow-600 hover:bg-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {feedback && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-20 rounded-[3rem]"
                    >
                      <div className={`p-12 rounded-full shadow-2xl border-8 border-white ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                        {feedback === 'correct' ? (
                          <CheckCircle2 className="w-24 h-24 text-white" />
                        ) : (
                          <XCircle className="w-24 h-24 text-white" />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] border-8 border-yellow-500 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1)_0%,transparent_70%)]" />
              
              <Trophy className="w-24 h-24 md:w-40 md:h-40 text-yellow-400 mx-auto mb-6 md:mb-8 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]" />
              <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-4">ՀԱՂԹԱՆԱԿ!</h2>
              <p className="text-lg md:text-2xl font-bold text-yellow-500 italic mb-8 md:mb-12 uppercase tracking-widest">ԴՈՒ ՀԱՍԱՐ ՖԻՆԻՇԻՆ ԱՌԱՋԻՆԸ</p>
              
              <div className="bg-slate-900/50 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-4 border-slate-700 mb-8 md:mb-12">
                <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">ՔՈ ԱՐԴՅՈՒՆՔԸ</p>
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-6xl md:text-9xl font-black text-yellow-500 drop-shadow-lg">{score}</span>
                  <span className="text-2xl md:text-4xl font-black text-slate-600">/ {exercises.length}</span>
                </div>
              </div>

              <button 
                onClick={restart}
                className="w-full py-6 md:py-8 bg-yellow-500 text-slate-900 rounded-full font-black text-xl md:text-3xl uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl border-b-8 border-yellow-700 active:translate-y-2 active:border-b-0 flex items-center justify-center gap-4 md:gap-6 group"
              >
                <RotateCcw className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-180 transition-transform duration-700" />
                ՆՈՐ ՄՐՑԱՐՇԱՎ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #0f172a;
          margin: 0;
        }
      `}} />
    </div>
  );
}
