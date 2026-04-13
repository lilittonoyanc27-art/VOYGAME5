import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Zap,
  Flame,
  Dumbbell
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  hySentence: string;
  correctWords: string[];
  scrambledWords: string[];
}

// --- Data ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    hySentence: "Ես բացում եմ դուռը",
    correctWords: ["Yo", "abro", "la", "puerta"],
    scrambledWords: ["abro", "Yo", "la", "puerta", "el"]
  },
  {
    id: 2,
    hySentence: "Դու ուտում ես խնձորը",
    correctWords: ["Tú", "comes", "la", "manzana"],
    scrambledWords: ["comes", "Tú", "la", "manzana", "una"]
  },
  {
    id: 3,
    hySentence: "Նա կարդում է գիրքը",
    correctWords: ["Él", "lee", "el", "libro"],
    scrambledWords: ["lee", "Él", "el", "libro", "la"]
  },
  {
    id: 4,
    hySentence: "Մենք խմում ենք ջուրը",
    correctWords: ["Nosotros", "bebemos", "el", "agua"],
    scrambledWords: ["bebemos", "Nosotros", "el", "agua", "la"]
  },
  {
    id: 5,
    hySentence: "Նրանք փակում են պատուհանը",
    correctWords: ["Ellos", "cierran", "la", "ventana"],
    scrambledWords: ["cierran", "Ellos", "la", "ventana", "el"]
  },
  {
    id: 6,
    hySentence: "Ես գրում եմ նամակը",
    correctWords: ["Yo", "escribo", "la", "carta"],
    scrambledWords: ["escribo", "Yo", "la", "carta", "el"]
  },
  {
    id: 7,
    hySentence: "Դուք նայում եք հեռուստացույցը",
    correctWords: ["Vosotros", "miráis", "la", "tele"],
    scrambledWords: ["miráis", "Vosotros", "la", "tele", "el"]
  },
  {
    id: 8,
    hySentence: "Նրանք ուտում են հացը",
    correctWords: ["Ellas", "comen", "el", "pan"],
    scrambledWords: ["comen", "Ellas", "el", "pan", "la"]
  }
];

export default function GorBoxingQuest() {
  const [step, setStep] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'punch' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUESTIONS[step];

  const toggleWord = (word: string) => {
    if (gameState !== 'idle') return;
    
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  useEffect(() => {
    if (selectedWords.length === currentQuestion.correctWords.length) {
      const isCorrect = selectedWords.every((word, index) => word === currentQuestion.correctWords[index]);
      
      if (isCorrect) {
        setGameState('punch');
        setScore(s => s + 1);
        setTimeout(() => {
          if (step < QUESTIONS.length - 1) {
            setStep(s => s + 1);
            setSelectedWords([]);
            setGameState('idle');
          } else {
            setIsFinished(true);
          }
        }, 1500);
      } else {
        setGameState('wrong');
        setTimeout(() => {
          setSelectedWords([]);
          setGameState('idle');
        }, 1000);
      }
    }
  }, [selectedWords, currentQuestion, step]);

  const restart = () => {
    setStep(0);
    setSelectedWords([]);
    setGameState('idle');
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-yellow-400 text-zinc-900 font-sans p-4 md:p-8 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Boxing Ring Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 w-full h-1/2 bg-red-600/10" />
        {/* Ropes */}
        <div className="absolute bottom-40 w-full h-2 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
        <div className="absolute bottom-60 w-full h-2 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
      </div>

      <div className="max-w-4xl w-full relative z-10 py-4">
        {!isFinished ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="bg-red-600 border-b-4 border-yellow-500 p-6 rounded-t-[2rem] flex justify-between items-center shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl p-1 border-2 border-yellow-400 overflow-hidden shadow-lg">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gor&backgroundColor=b6e3f4" alt="Gor" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase">ԳՈՌԻ ԲՈՔՍԻ ՔՎԵՍԹ</h1>
                  <p className="text-yellow-200 text-[10px] font-black uppercase tracking-[0.3em]">Boxing Sentence Builder</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-yellow-200 mb-1">ՀԱՐՎԱԾՆԵՐ</p>
                  <p className="text-4xl font-black text-white">{score}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-yellow-200 mb-1">ՌԱՈՒՆԴ</p>
                  <p className="text-4xl font-black text-white">{step + 1}/{QUESTIONS.length}</p>
                </div>
              </div>
            </div>

            {/* Armenian Translation (Top) */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-zinc-900 text-center relative overflow-hidden border-b-8 border-zinc-100">
              <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />
              <p className="text-sm font-black text-red-600 uppercase tracking-widest mb-2">ԹԱՐԳՄԱՆԻՐ</p>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tight">
                {currentQuestion.hySentence}
              </h2>
            </div>

            {/* Sentence Construction Area */}
            <div className="min-h-[120px] bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-dashed border-red-200 p-6 flex flex-wrap justify-center gap-4 items-center shadow-inner">
              {selectedWords.length === 0 && (
                <p className="text-zinc-400 font-bold italic">Ընտրիր բառերը ստորև...</p>
              )}
              {selectedWords.map((word, i) => (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={`${word}-${i}`}
                  className="bg-red-600 text-white px-8 py-4 rounded-xl font-black text-3xl shadow-lg border-b-4 border-red-800"
                >
                  {word}
                </motion.div>
              ))}
            </div>

            {/* Boxing Arena (Visual Feedback) */}
            <div className="relative h-48 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {gameState === 'punch' && (
                  <motion.div
                    key="punch-effect"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: [1, 1.5, 1], rotate: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute z-50 pointer-events-none"
                  >
                    <div className="bg-red-600 text-white px-12 py-6 rounded-full font-black text-6xl shadow-[0_0_50px_rgba(220,38,38,0.5)] border-8 border-white italic uppercase tracking-tighter">
                      BOOM! 🥊
                    </div>
                  </motion.div>
                )}
                {gameState === 'wrong' && (
                  <motion.div
                    key="wrong-effect"
                    initial={{ x: -20 }}
                    animate={{ x: [20, -20, 20, -20, 0] }}
                    className="text-red-600 font-black text-4xl italic"
                  >
                    MISS! ❌
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Gong */}
              <motion.div 
                animate={gameState === 'punch' ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                className={`w-32 h-32 rounded-full border-8 flex items-center justify-center transition-colors ${
                  gameState === 'punch' ? 'bg-red-600 border-white shadow-[0_0_30px_rgba(220,38,38,0.5)]' : 'bg-white border-red-100'
                }`}
              >
                <Zap className={`w-16 h-16 ${gameState === 'punch' ? 'text-white' : 'text-red-600'}`} />
              </motion.div>
            </div>

            {/* Word Options (Bottom) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentQuestion.scrambledWords.map((word, i) => (
                <button
                  key={i}
                  onClick={() => toggleWord(word)}
                  className={`py-8 px-4 rounded-2xl border-4 transition-all text-3xl font-black shadow-xl uppercase italic tracking-tighter ${
                    selectedWords.includes(word)
                      ? 'bg-red-100 border-red-600 text-red-600 scale-95 opacity-50'
                      : 'bg-white border-zinc-100 text-zinc-900 hover:border-red-500 hover:text-red-600 active:scale-95'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-600 p-12 rounded-[3rem] border-8 border-yellow-400 text-center shadow-[0_0_100px_rgba(220,38,38,0.3)] text-white"
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4 text-white">ՉԵՄՊԻՈՆ</h2>
            <p className="text-2xl font-bold text-yellow-100 mb-10">Գոռ, դու հաղթեցիր բոլոր ռաունդներում:</p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white/10 p-6 rounded-3xl border-2 border-white/20">
                <Flame className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                <p className="text-3xl font-black text-white">{score}</p>
                <p className="text-[10px] font-black uppercase text-yellow-200">Ճիշտ հարվածներ</p>
              </div>
              <div className="bg-white/10 p-6 rounded-3xl border-2 border-white/20">
                <Dumbbell className="w-10 h-10 text-white mx-auto mb-2" />
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-[10px] font-black uppercase text-yellow-200">Ուժ</p>
              </div>
            </div>

            <button 
              onClick={restart}
              className="w-full py-8 bg-yellow-400 text-red-600 rounded-full font-black text-3xl uppercase tracking-widest hover:bg-white transition-all shadow-[0_10px_0_rgb(202,138,4)] active:translate-y-2 active:shadow-none flex items-center justify-center gap-4"
            >
              <RotateCcw className="w-8 h-8" />
              ՆՈՐԻՑ
            </button>
          </motion.div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #facc15;
          margin: 0;
        }
      `}} />
    </div>
  );
}
