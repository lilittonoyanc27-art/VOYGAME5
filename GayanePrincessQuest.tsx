import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Crown, 
  Gem, 
  ShoppingBag,
  ArrowRight,
  Star
} from 'lucide-react';

// --- Types ---
interface WardrobeItem {
  id: string;
  type: 'dress' | 'crown' | 'necklace' | 'accessory';
  name: string;
  color: string;
  icon: React.ElementType;
}

interface Question {
  id: number;
  positive: string;
  hyMeaning: string;
  correctNegative: string;
  options: string[];
}

// --- Data ---
const WARDROBE: WardrobeItem[] = [
  { id: 'd1', type: 'dress', name: 'Royal Pink', color: '#f472b6', icon: ShoppingBag },
  { id: 'd2', type: 'dress', name: 'Ocean Blue', color: '#60a5fa', icon: ShoppingBag },
  { id: 'd3', type: 'dress', name: 'Golden Sun', color: '#fbbf24', icon: ShoppingBag },
  { id: 'c1', type: 'crown', name: 'Silver Tiara', color: '#e2e8f0', icon: Crown },
  { id: 'c2', type: 'crown', name: 'Gold Crown', color: '#f59e0b', icon: Crown },
  { id: 'n1', type: 'necklace', name: 'Pearl String', color: '#ffffff', icon: Gem },
  { id: 'n2', type: 'necklace', name: 'Ruby Heart', color: '#ef4444', icon: Gem },
  { id: 'a1', type: 'accessory', name: 'Magic Wand', color: '#a855f7', icon: Sparkles },
];

const QUESTIONS: Question[] = [
  {
    id: 1,
    positive: "Hay un libro",
    hyMeaning: "Կա մի գիրք",
    correctNegative: "No hay un libro",
    options: ["No hay un libro", "Hay no un libro", "No hay libro un"]
  },
  {
    id: 2,
    positive: "Hay mucha agua",
    hyMeaning: "Կա շատ ջուր",
    correctNegative: "No hay mucha agua",
    options: ["Hay no mucha agua", "No hay mucha agua", "No mucha agua hay"]
  },
  {
    id: 3,
    positive: "Hay una mesa",
    hyMeaning: "Կա մի սեղան",
    correctNegative: "No hay una mesa",
    options: ["No hay una mesa", "No hay mesa una", "Hay no una mesa"]
  },
  {
    id: 4,
    positive: "Hay tres manzanas",
    hyMeaning: "Կան երեք խնձորներ",
    correctNegative: "No hay tres manzanas",
    options: ["No hay tres manzanas", "Hay no tres manzanas", "No hay manzanas tres"]
  },
  {
    id: 5,
    positive: "Hay un gato",
    hyMeaning: "Կա մի կատու",
    correctNegative: "No hay un gato",
    options: ["No hay un gato", "Hay no un gato", "No gato hay"]
  },
  {
    id: 6,
    positive: "Hay sol",
    hyMeaning: "Արև կա",
    correctNegative: "No hay sol",
    options: ["No hay sol", "Hay no sol", "No sol hay"]
  },
  {
    id: 7,
    positive: "Hay comida",
    hyMeaning: "Ուտելիք կա",
    correctNegative: "No hay comida",
    options: ["No hay comida", "Hay no comida", "No comida hay"]
  },
  {
    id: 8,
    positive: "Hay flores",
    hyMeaning: "Ծաղիկներ կան",
    correctNegative: "No hay flores",
    options: ["No hay flores", "Hay no flores", "No flores hay"]
  }
];

export default function GayanePrincessQuest() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'question' | 'wardrobe' | 'finished'>('question');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Princess Appearance
  const [appearance, setAppearance] = useState<{
    dress: WardrobeItem | null;
    crown: WardrobeItem | null;
    necklace: WardrobeItem | null;
    accessory: WardrobeItem | null;
  }>({
    dress: null,
    crown: null,
    necklace: null,
    accessory: null,
  });

  const currentQuestion = QUESTIONS[step];

  const handleAnswer = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    
    if (option === currentQuestion.correctNegative) {
      setFeedback('correct');
      setScore(s => s + 1);
      setTimeout(() => {
        setGameState('wardrobe');
        setFeedback(null);
        setSelectedOption(null);
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  const selectItem = (item: WardrobeItem) => {
    setAppearance(prev => ({ ...prev, [item.type]: item }));
  };

  const nextStep = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(s => s + 1);
      setGameState('question');
    } else {
      setGameState('finished');
    }
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setGameState('question');
    setAppearance({ dress: null, crown: null, necklace: null, accessory: null });
  };

  return (
    <div className="min-h-screen bg-pink-50 text-slate-800 font-sans p-4 md:p-8 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Magical Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-200 rounded-full blur-3xl animate-pulse" />
        <Star className="absolute top-20 right-20 text-yellow-400 w-8 h-8 animate-bounce" />
        <Star className="absolute bottom-40 left-20 text-pink-400 w-6 h-6 animate-pulse" />
      </div>

      <div className="max-w-6xl w-full relative z-10 py-4 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Princess Display (The "3D" Character) */}
        <div className="w-full lg:w-1/3 flex flex-col items-center sticky top-0 lg:top-8 z-30 lg:z-10 bg-pink-50/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none py-2 lg:py-0">
          <div className="relative w-48 h-[300px] md:w-64 md:h-[450px] bg-white/60 backdrop-blur-md rounded-[3rem] md:rounded-[4rem] border-4 md:border-8 border-white shadow-2xl flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
            
            {/* The Princess Base */}
            <div className="relative z-10 flex flex-col items-center">
               <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gayane&backgroundColor=ffdfbf&mouth=smile" 
                alt="Princess" 
                className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-pink-200 shadow-inner"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center">
                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-pink-500">ԱՐՔԱՅԱԴՈՒՍՏՐ ԳԱՅԱՆԵ</p>
              </div>
            </div>

            {/* Selected Items Display (Simple list) */}
            <div className="absolute bottom-6 left-0 w-full px-4 flex justify-center gap-2">
              {Object.entries(appearance).map(([type, item]) => item && (
                <motion.div
                  key={type}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg border-2 border-white"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <div className="bg-white px-3 py-1 md:px-4 md:py-2 rounded-full shadow-lg border-2 border-pink-100 flex items-center gap-2">
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-pink-500 fill-current" />
              <span className="font-black text-sm md:text-base text-pink-600">{score}</span>
            </div>
            <div className="bg-white px-3 py-1 md:px-4 md:py-2 rounded-full shadow-lg border-2 border-pink-100 font-black text-sm md:text-base text-pink-600">
              {step + 1} / {QUESTIONS.length}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full lg:w-2/3">
          <AnimatePresence mode="wait">
            {gameState === 'question' ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-pink-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-purple-400" />
                  
                  <div className="text-center mb-10">
                    <p className="text-sm font-black text-pink-400 uppercase tracking-[0.2em] mb-2">ԴԱՐՁՐՈՒ ԺԽՏԱԿԱՆ (NO HAY)</p>
                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-slate-800 mb-4 leading-tight">
                      {currentQuestion.positive}
                    </h2>
                    <p className="text-xl font-bold text-slate-400 italic">
                      ({currentQuestion.hyMeaning})
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.options.map((option, i) => (
                      <button
                        key={i}
                        disabled={!!feedback}
                        onClick={() => handleAnswer(option)}
                        className={`py-6 px-8 rounded-3xl border-4 transition-all text-2xl font-black shadow-lg text-left flex items-center justify-between group ${
                          selectedOption === option
                            ? feedback === 'correct'
                              ? 'bg-emerald-500 border-white text-white scale-102'
                              : 'bg-red-500 border-white text-white scale-102'
                            : feedback && option === currentQuestion.correctNegative
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                            : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50'
                        }`}
                      >
                        {option}
                        {selectedOption === option && feedback === 'correct' && <CheckCircle2 className="w-8 h-8" />}
                        {selectedOption === option && feedback === 'wrong' && <XCircle className="w-8 h-8" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border-2 border-white flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-pink-500" />
                  </div>
                  <p className="text-sm font-bold text-slate-600 italic">
                    Գայանե՛, ճիշտ պատասխանիր, որպեսզի ընտրես քո նոր զգեստը կամ զարդը:
                  </p>
                </div>
              </motion.div>
            ) : gameState === 'wardrobe' ? (
              <motion.div
                key="wardrobe"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-purple-100 relative overflow-hidden">
                  <div className="text-center mb-10">
                    <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-spin-slow" />
                    <h2 className="text-4xl font-black italic tracking-tighter text-purple-600 uppercase mb-2">ԳԱՌԴԵՐՈԲ</h2>
                    <p className="text-lg font-bold text-slate-400 italic">Ընտրիր մի բան Գայանեի համար</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {WARDROBE.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => selectItem(item)}
                        className={`group relative p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-4 transition-all flex flex-col items-center gap-2 md:gap-4 shadow-md hover:shadow-xl hover:-translate-y-1 ${
                          appearance[item.type]?.id === item.id
                            ? 'bg-purple-100 border-purple-500'
                            : 'bg-slate-50 border-slate-100 hover:border-purple-400 hover:bg-purple-50'
                        }`}
                      >
                        <div 
                          className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner"
                          style={{ backgroundColor: item.color }}
                        >
                          <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <p className="font-black text-[8px] md:text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-purple-600">{item.name}</p>
                        {appearance[item.type]?.id === item.id && (
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={nextStep}
                      className="px-12 py-4 bg-purple-600 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-purple-700 transition-all shadow-xl flex items-center gap-4 group"
                    >
                      ՇԱՐՈՒՆԱԿԵԼ
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 md:p-20 rounded-[4rem] border-8 border-pink-100 text-center shadow-2xl relative overflow-hidden"
              >
                <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-8 drop-shadow-lg" />
                <h2 className="text-5xl md:text-6xl font-black text-slate-800 italic uppercase tracking-tighter mb-4">ՀՐԱՇԱԼԻ Է, ԳԱՅԱՆԵ!</h2>
                <p className="text-2xl font-bold text-pink-400 italic mb-12">Դու հիանալի տեսք ունես և գիտես բոլոր կանոնները:</p>
                
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
          </AnimatePresence>
        </div>

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
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
}
