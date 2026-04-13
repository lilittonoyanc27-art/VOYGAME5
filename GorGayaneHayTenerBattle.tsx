import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Swords,
  Zap,
  Star,
  Car,
  ShoppingBag,
  Info
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  sentence: string;
  hyMeaning: string;
  options: string[];
  correct: string;
  explanation: string;
}

// --- Data ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    sentence: "___ estudiar mucho para aprender español.",
    hyMeaning: "Պետք է շատ սովորել իսպաներեն սովորելու համար (ընդհանուր):",
    options: ["Hay que", "Tengo que", "Tiene que"],
    correct: "Hay que",
    explanation: "'Hay que'-ն օգտագործվում է ընդհանուր անդեմ պարտավորությունների համար:"
  },
  {
    id: 2,
    sentence: "Yo ___ ir al médico mañana.",
    hyMeaning: "Ես վաղը պետք է գնամ բժշկի (անձնական):",
    options: ["Hay que", "Tengo que", "Tiene que"],
    correct: "Tengo que",
    explanation: "'Tengo que'-ն օգտագործվում է 'Yo' (Ես) դեմքի համար:"
  },
  {
    id: 3,
    sentence: "___ comer frutas y verduras.",
    hyMeaning: "Պետք է ուտել մրգեր և բանջարեղեն (ընդհանուր խորհուրդ):",
    options: ["Hay que", "Tengo que", "Tienes que"],
    correct: "Hay que",
    explanation: "Սա ընդհանուր կանոն է, ուստի օգտագործում ենք 'Hay que':"
  },
  {
    id: 4,
    sentence: "Tú ___ hacer la tarea ahora.",
    hyMeaning: "Դու պետք է հիմա անես տնային աշխատանքը:",
    options: ["Hay que", "Tengo que", "Tienes que"],
    correct: "Tienes que",
    explanation: "'Tienes que'-ն օգտագործվում է 'Tú' (Դու) դեմքի համար:"
  },
  {
    id: 5,
    sentence: "___ dormir ocho horas cada noche.",
    hyMeaning: "Պետք է քնել ութ ժամ ամեն գիշեր (ընդհանուր):",
    options: ["Hay que", "Tiene que", "Tenemos que"],
    correct: "Hay que",
    explanation: "Անդեմ պարտավորությունների համար միշտ 'Hay que':"
  },
  {
    id: 6,
    sentence: "Nosotros ___ limpiar la casa hoy.",
    hyMeaning: "Մենք այսօր պետք է մաքրենք տունը:",
    options: ["Hay que", "Tenemos que", "Tienen que"],
    correct: "Tenemos que",
    explanation: "'Tenemos que'-ն օգտագործվում է 'Nosotros' (Մենք) դեմքի համար:"
  },
  {
    id: 7,
    sentence: "___ beber mucha agua en verano.",
    hyMeaning: "Ամռանը պետք է շատ ջուր խմել (ընդհանուր):",
    options: ["Hay que", "Tengo que", "Tiene que"],
    correct: "Hay que",
    explanation: "Ընդհանուր խորհուրդ բոլորի համար:"
  },
  {
    id: 8,
    sentence: "Ellos ___ trabajar el sábado.",
    hyMeaning: "Նրանք պետք է աշխատեն շաբաթ օրը:",
    options: ["Hay que", "Tenemos que", "Tienen que"],
    correct: "Tienen que",
    explanation: "'Tienen que'-ն օգտագործվում է 'Ellos' (Նրանք) դեմքի համար:"
  },
  {
    id: 9,
    sentence: "___ ser amable con los demás.",
    hyMeaning: "Պետք է բարի լինել ուրիշների հանդեպ (ընդհանուր):",
    options: ["Hay que", "Tengo que", "Tienes que"],
    correct: "Hay que",
    explanation: "Բարոյական ընդհանուր կանոն:"
  },
  {
    id: 10,
    sentence: "Ella ___ comprar pan para la cena.",
    hyMeaning: "Նա պետք է հաց գնի ընթրիքի համար:",
    options: ["Hay que", "Tiene que", "Tengo que"],
    correct: "Tiene que",
    explanation: "'Tiene que'-ն օգտագործվում է 'Ella' (Նա) դեմքի համար:"
  }
];

export default function GorGayaneHayTenerBattle() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ gor: 0, gayane: 0 });
  const [turn, setTurn] = useState<'gor' | 'gayane'>('gor');
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
      setScores(prev => ({ ...prev, [turn]: prev[turn] + 1 }));
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      
      if (step < QUESTIONS.length - 1) {
        setStep(s => s + 1);
        setTurn(turn === 'gor' ? 'gayane' : 'gor');
      } else {
        setIsFinished(true);
      }
    }, 2500);
  };

  const restart = () => {
    setStep(0);
    setScores({ gor: 0, gayane: 0 });
    setTurn('gor');
    setFeedback(null);
    setIsFinished(false);
    setSelectedOption(null);
  };

  const winner = scores.gor > scores.gayane ? 'gor' : scores.gayane > scores.gor ? 'gayane' : 'draw';

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans p-4 md:p-8 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-1000 ${turn === 'gor' ? 'bg-blue-900/20' : 'bg-purple-900/20'}`} />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="max-w-5xl w-full relative z-10 py-4">
        {!isFinished ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Battle Scoreboard */}
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Gor Side */}
              <div className={`p-6 rounded-3xl border-4 transition-all ${turn === 'gor' ? 'bg-blue-600 border-blue-400 scale-105 shadow-[0_0_40px_rgba(37,99,235,0.6)]' : 'bg-zinc-900 border-zinc-800 opacity-40'}`}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white rounded-2xl p-1 overflow-hidden border-2 border-blue-300 shadow-xl">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gor&backgroundColor=b6e3f4" alt="Gor" referrerPolicy="no-referrer" />
                  </div>
                  <p className="font-black italic text-sm uppercase tracking-widest">ԳՈՌ</p>
                  <p className="text-5xl font-black">{scores.gor}</p>
                </div>
              </div>

              {/* VS Center */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-pulse">
                  <Swords className="w-10 h-10 text-white" />
                </div>
                <p className="mt-4 font-black text-zinc-500 uppercase tracking-[0.4em] text-xs">ՄԱՐՏ</p>
              </div>

              {/* Gayane Side */}
              <div className={`p-6 rounded-3xl border-4 transition-all ${turn === 'gayane' ? 'bg-purple-600 border-purple-400 scale-105 shadow-[0_0_40px_rgba(147,51,234,0.6)]' : 'bg-zinc-900 border-zinc-800 opacity-40'}`}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white rounded-2xl p-1 overflow-hidden border-2 border-purple-300 shadow-xl">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gayane&backgroundColor=ffdfbf" alt="Gayane" referrerPolicy="no-referrer" />
                  </div>
                  <p className="font-black italic text-sm uppercase tracking-widest text-white">ԳԱՅԱՆԵ</p>
                  <p className="text-5xl font-black">{scores.gayane}</p>
                </div>
              </div>
            </div>

            {/* Turn Indicator */}
            <div className="text-center">
              <motion.div
                key={turn}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`inline-block px-10 py-3 rounded-full font-black uppercase tracking-[0.3em] text-xs shadow-lg ${turn === 'gor' ? 'bg-blue-500' : 'bg-purple-500'}`}
              >
                ՀԵՐԹԸ {turn === 'gor' ? 'ԳՈՌԻՆՆ' : 'ԳԱՅԱՆԵԻՆՆ'} Է
              </motion.div>
            </div>

            {/* Question Card */}
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-[3.5rem] p-10 md:p-16 border-4 border-zinc-800 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Zap className="w-64 h-64" />
              </div>

              <div className="text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-8">
                  ՌԱՈՒՆԴ {step + 1} / {QUESTIONS.length}
                </div>
                
                <motion.h2 
                  key={step}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-6 leading-tight"
                >
                  {currentQuestion.sentence}
                </motion.h2>
                <p className="text-xl font-bold text-zinc-400 italic mb-16 max-w-2xl mx-auto">
                  ({currentQuestion.hyMeaning})
                </p>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      disabled={!!feedback}
                      onClick={() => handleAnswer(option)}
                      className={`py-10 px-6 rounded-3xl border-4 transition-all text-3xl font-black shadow-2xl relative overflow-hidden group ${
                        selectedOption === option
                          ? feedback === 'correct'
                            ? 'bg-emerald-600 border-white text-white scale-105'
                            : 'bg-red-600 border-white text-white scale-105'
                          : feedback && option === currentQuestion.correct
                          ? 'bg-emerald-900/50 border-emerald-500 text-emerald-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white hover:bg-zinc-800/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-xl z-20 p-10 text-center"
                  >
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-2xl border-8 border-white/20 ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      {feedback === 'correct' ? <CheckCircle2 className="w-16 h-16" /> : <XCircle className="w-16 h-16" />}
                    </div>
                    <h3 className={`text-5xl font-black mb-6 italic tracking-tighter ${feedback === 'correct' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {feedback === 'correct' ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է!'}
                    </h3>
                    <div className="bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-800 max-w-lg shadow-inner">
                      <div className="flex items-center gap-3 mb-2 text-zinc-500">
                        <Info className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">ԲԱՑԱՏՐՈՒԹՅՈՒՆ</span>
                      </div>
                      <p className="text-lg text-zinc-300 font-medium">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 p-12 md:p-20 rounded-[5rem] border-8 border-zinc-800 text-center shadow-[0_50px_150px_rgba(0,0,0,0.9)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
            
            <Trophy className="w-40 h-40 text-yellow-400 mx-auto mb-10 drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]" />
            <h2 className="text-7xl font-black italic uppercase tracking-tighter mb-6">ՄԱՐՏԻ ԱՎԱՐՏ!</h2>
            
            <div className="grid grid-cols-2 gap-10 mb-16">
              <div className={`p-10 rounded-[3rem] border-4 transition-all ${winner === 'gor' ? 'bg-blue-600 border-blue-400 scale-105 shadow-2xl' : 'bg-zinc-800 border-zinc-700 opacity-60'}`}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gor&backgroundColor=b6e3f4" className="w-24 h-24 mx-auto mb-6 rounded-2xl shadow-lg" alt="Gor" />
                <p className="text-6xl font-black mb-2">{scores.gor}</p>
                <p className="text-xs font-black uppercase tracking-widest text-blue-200">ԳՈՌ</p>
                {winner === 'gor' && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-6 p-4 bg-white/20 rounded-2xl border-2 border-white/30"
                  >
                    <Car className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-[10px] font-black uppercase">ՔՈ ՄԵՔԵՆԱՆ! 🚗</p>
                  </motion.div>
                )}
              </div>
              <div className={`p-10 rounded-[3rem] border-4 transition-all ${winner === 'gayane' ? 'bg-purple-600 border-purple-400 scale-105 shadow-2xl' : 'bg-zinc-800 border-zinc-700 opacity-60'}`}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gayane&backgroundColor=ffdfbf" className="w-24 h-24 mx-auto mb-6 rounded-2xl shadow-lg" alt="Gayane" />
                <p className="text-6xl font-black mb-2">{scores.gayane}</p>
                <p className="text-xs font-black uppercase tracking-widest text-purple-200">ԳԱՅԱՆԵ</p>
                {winner === 'gayane' && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-6 p-4 bg-white/20 rounded-2xl border-2 border-white/30"
                  >
                    <ShoppingBag className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-[10px] font-black uppercase">ՔՈ ԶԳԵՍՏԸ! 👗</p>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="bg-zinc-800/50 p-10 rounded-[3rem] mb-16 border-2 border-zinc-700">
              <h3 className="text-4xl font-black italic text-yellow-400 mb-4 uppercase tracking-tighter">
                {winner === 'gor' ? 'ԳՈՌԸ ՀԱՂԹԵՑ!' : winner === 'gayane' ? 'ԳԱՅԱՆԵՆ ՀԱՂԹԵՑ!' : 'ՈՉ-ՈՔԻ!'}
              </h3>
              <p className="text-xl text-zinc-400 font-bold italic">
                {winner === 'draw' 
                  ? 'Դուք երկուսդ էլ հավասարապես լավ գիտեք Hay que և Tener que կանոնները:' 
                  : winner === 'gor' 
                    ? 'Գոռ, դու ստանում ես քո երազանքի մեքենան:' 
                    : 'Գայանե, դու ստանում ես քո գեղեցիկ զգեստը:'}
              </p>
            </div>

            <button 
              onClick={restart}
              className="w-full py-10 bg-white text-zinc-950 rounded-full font-black text-4xl uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl border-b-8 border-zinc-300 active:translate-y-2 active:border-b-0 flex items-center justify-center gap-8 group"
            >
              <RotateCcw className="w-12 h-12 group-hover:rotate-180 transition-transform duration-700" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
          </motion.div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #09090b;
          margin: 0;
        }
      `}} />
    </div>
  );
}
