import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Play,
  Info,
  ChevronRight,
  Star
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  subject: string;
  hySubject: string;
  correct: string;
  options: string[];
}

// --- Data ---
const CONJUGATION = [
  { sp: 'Yo', hy: 'Ես', form: 'voy' },
  { sp: 'Tú', hy: 'Դու', form: 'vas' },
  { sp: 'Él / Ella', hy: 'Նա', form: 'va' },
  { sp: 'Nosotros', hy: 'Մենք', form: 'vamos' },
  { sp: 'Vosotros', hy: 'Դուք', form: 'vais' },
  { sp: 'Ellos / Ellas', hy: 'Նրանք', form: 'van' }
];

const QUESTIONS: Question[] = [
  { id: 1, subject: 'Yo', hySubject: 'Ես', correct: 'voy', options: ['voy', 'vas', 'va'] },
  { id: 2, subject: 'Tú', hySubject: 'Դու', correct: 'vas', options: ['voy', 'vas', 'va'] },
  { id: 3, subject: 'Él', hySubject: 'Նա', correct: 'va', options: ['va', 'van', 'vamos'] },
  { id: 4, subject: 'Nosotros', hySubject: 'Մենք', correct: 'vamos', options: ['vamos', 'vais', 'van'] },
  { id: 5, subject: 'Vosotros', hySubject: 'Դուք', correct: 'vais', options: ['vais', 'vamos', 'vas'] },
  { id: 6, subject: 'Ellas', hySubject: 'Նրանք', correct: 'van', options: ['van', 'va', 'vas'] },
  { id: 7, subject: 'Ella', hySubject: 'Նա', correct: 'va', options: ['va', 'voy', 'van'] },
  { id: 8, subject: 'Nosotras', hySubject: 'Մենք (աղջիկներ)', correct: 'vamos', options: ['vamos', 'van', 'va'] },
  { id: 9, subject: 'Ellos', hySubject: 'Նրանք', correct: 'van', options: ['van', 'va', 'vais'] },
  { id: 10, subject: 'Tú', hySubject: 'Դու', correct: 'vas', options: ['vas', 'va', 'voy'] },
];

export default function IrFootballPenalty() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'goal' | 'miss' | null>(null);
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [gkPos, setGkPos] = useState(0);

  const currentQuestion = QUESTIONS[currentIndex];

  const handleShoot = (option: string) => {
    if (feedback) return;

    const isCorrect = option === currentQuestion.correct;
    
    // Animate Ball
    if (isCorrect) {
      // Random goal position (left, center, right)
      const targetX = (Math.random() - 0.5) * 200;
      setBallPos({ x: targetX, y: -300 });
      // GK dives away
      setGkPos(targetX > 0 ? -100 : 100);
      
      setTimeout(() => {
        setFeedback('goal');
        setScore(s => s + 1);
      }, 600);
    } else {
      // Ball goes to center or where GK is
      const targetX = (Math.random() - 0.5) * 100;
      setBallPos({ x: targetX, y: -250 });
      // GK saves it
      setGkPos(targetX);
      
      setTimeout(() => {
        setFeedback('miss');
      }, 600);
    }

    setTimeout(() => {
      setFeedback(null);
      setBallPos({ x: 0, y: 0 });
      setGkPos(0);
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        setGameState('result');
      }
    }, 2000);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameState('intro');
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-emerald-900 text-white font-sans p-4 md:p-8 flex flex-col items-center justify-start overflow-hidden relative">
      {/* Pitch Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,#064e3b,#064e3b_100px,#065f46_100px,#065f46_200px)]" />
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'intro' ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-2xl w-full bg-white text-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl relative z-10"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="w-10 h-10 text-emerald-600" />
              </div>
              <h1 className="text-4xl font-black italic tracking-tighter text-emerald-600 uppercase">IR ԲԱՅԻ ԽՈՆԱՐՀՈՒՄԸ</h1>
              <p className="text-slate-400 font-bold italic mt-2">Ինչպե՞ս ասել «Գնալ» իսպաներենով</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-100 mb-8">
              <p className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest">Պարզ բացատրություն</p>
              <p className="text-slate-700 leading-relaxed mb-6">
                Իսպաներենում <b>Ir</b> բայը նշանակում է «գնալ»: Այն անկանոն բայ է, ինչը նշանակում է, որ այն ամբողջությամբ փոխվում է խոնարհվելիս: Ահա թե ինչպես է այն հնչում.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONJUGATION.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <span className="font-black text-slate-400 uppercase text-xs">{item.sp} ({item.hy})</span>
                    <span className="font-black text-emerald-600 text-xl italic">{item.form}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setGameState('playing')}
              className="w-full py-6 bg-emerald-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl flex items-center justify-center gap-4 group"
            >
              <Play className="w-8 h-8 fill-current group-hover:scale-110 transition-transform" />
              ՍԿՍԵԼ ԽԱՂԸ
            </button>
          </motion.div>
        ) : gameState === 'playing' ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl w-full flex flex-col items-center relative z-10"
          >
            {/* Scoreboard */}
            <div className="bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border-2 border-white/20 mb-8 flex items-center gap-8">
              <div className="text-center">
                <p className="text-[10px] font-black text-emerald-400 uppercase">ՄԻԱՎՈՐ</p>
                <p className="text-2xl font-black">{score}</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase">ՀԱՐՑ</p>
                <p className="text-2xl font-black">{currentIndex + 1} / {QUESTIONS.length}</p>
              </div>
            </div>

            {/* Football Field Area */}
            <div className="w-full h-[400px] relative bg-emerald-800/50 rounded-[3rem] border-4 border-white/20 overflow-hidden mb-8 shadow-inner">
              {/* Goal */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 border-x-4 border-b-4 border-white/40 rounded-b-xl flex items-end justify-center">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]" />
              </div>

              {/* Goalkeeper */}
              <motion.div
                animate={{ x: gkPos }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="absolute top-20 left-1/2 -translate-x-1/2 z-20"
              >
                <div className="relative">
                  <div className="w-12 h-16 bg-blue-500 rounded-xl border-2 border-white flex flex-col items-center justify-start pt-2 shadow-lg">
                    <div className="w-6 h-6 bg-pink-200 rounded-full mb-1" />
                    <div className="w-8 h-1 bg-white/30 rounded-full" />
                  </div>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-[8px] font-black px-2 py-0.5 rounded uppercase">GK</div>
                </div>
              </motion.div>

              {/* Ball */}
              <motion.div
                animate={{ x: ballPos.x, y: ballPos.y, scale: ballPos.y < 0 ? 0.6 : 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
              >
                <div className="w-10 h-10 bg-white rounded-full border-2 border-slate-300 shadow-xl flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-[repeating-conic-gradient(#000_0_90deg,#fff_0_180deg)] opacity-20" />
                </div>
              </motion.div>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center z-40 bg-black/20 backdrop-blur-sm"
                  >
                    <div className={`text-6xl md:text-8xl font-black italic uppercase tracking-tighter drop-shadow-2xl ${feedback === 'goal' ? 'text-yellow-400' : 'text-red-500'}`}>
                      {feedback === 'goal' ? 'GOOOAL!' : 'SAVED!'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Question Card */}
            <div className="w-full bg-white text-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative">
              <div className="text-center mb-8">
                <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-2">Ընտրիր ճիշտ խոնարհումը</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl font-black text-slate-800 uppercase">{currentQuestion.subject}</span>
                  <ChevronRight className="w-8 h-8 text-slate-200" />
                  <span className="text-4xl font-black text-emerald-600 italic">Ir</span>
                </div>
                <p className="text-lg font-bold text-slate-400 italic mt-2">({currentQuestion.hySubject} ...)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentQuestion.options.map((option, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => handleShoot(option)}
                    className="py-6 rounded-2xl border-4 border-slate-100 text-2xl font-black text-slate-700 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all shadow-md active:scale-95"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full bg-white text-slate-900 rounded-[3rem] p-12 text-center shadow-2xl relative z-10"
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-8 drop-shadow-lg" />
            <h2 className="text-5xl font-black italic tracking-tighter text-emerald-600 uppercase mb-4">ՄՐՑԱՇԱՐԻ ԱՎԱՐՏ</h2>
            <p className="text-xl font-bold text-slate-400 italic mb-12">Դու հիանալի ֆուտբոլիստ ես և լավ գիտես Ir բայը:</p>
            
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border-4 border-slate-100 mb-12">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">ՔՈ ԱՐԴՅՈՒՆՔԸ</p>
              <div className="flex justify-center items-baseline gap-2">
                <span className="text-8xl font-black text-emerald-600">{score}</span>
                <span className="text-3xl font-black text-slate-300">/ {QUESTIONS.length}</span>
              </div>
            </div>

            <button 
              onClick={restart}
              className="w-full py-6 bg-emerald-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl flex items-center justify-center gap-4"
            >
              <RotateCcw className="w-8 h-8" />
              ՆՈՐ ՄՐՑԱՇԱՐ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #064e3b;
          margin: 0;
        }
      `}} />
    </div>
  );
}
