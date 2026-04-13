import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Swords,
  User,
  Zap,
  Star,
  MessageCircle
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  phrase: string;
  hyMeaning: string;
  options: string[];
  correct: string;
  explanation: string;
}

// --- Data ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    phrase: "¿Cómo estás?",
    hyMeaning: "Ինչպե՞ս ես",
    options: ["Bien, gracias", "Mucho gusto", "De nada"],
    correct: "Bien, gracias",
    explanation: "Սա ամենատարածված պատասխանն է 'Ինչպե՞ս ես' հարցին:"
  },
  {
    id: 2,
    phrase: "¡Mucho gusto!",
    hyMeaning: "Շատ հաճելի է (ծանոթանալիս)",
    options: ["Igualmente", "Hola", "Adiós"],
    correct: "Igualmente",
    explanation: "'Igualmente' նշանակում է 'նմանապես' կամ 'ինձ նույնպես':"
  },
  {
    id: 3,
    phrase: "¿Qué tal?",
    hyMeaning: "Ի՞նչ կա չկա / Ո՞նց ես",
    options: ["Todo bien", "Por favor", "Lo siento"],
    correct: "Todo bien",
    explanation: "'Todo bien' նշանակում է 'ամեն ինչ լավ է':"
  },
  {
    id: 4,
    phrase: "¡Muchas gracias!",
    hyMeaning: "Շատ շնորհակալություն",
    options: ["De nada", "Perdón", "Hasta luego"],
    correct: "De nada",
    explanation: "'De nada' նշանակում է 'խնդրեմ' կամ 'չարժե':"
  },
  {
    id: 5,
    phrase: "¿Cómo te llamas?",
    hyMeaning: "Ի՞նչ է քո անունը",
    options: ["Me llamo...", "Soy de...", "Tengo..."],
    correct: "Me llamo...",
    explanation: "'Me llamo' նշանակում է 'իմ անունն է':"
  },
  {
    id: 6,
    phrase: "¡Lo siento!",
    hyMeaning: "Ցավում եմ / Կներեք",
    options: ["No pasa nada", "Gracias", "Hola"],
    correct: "No pasa nada",
    explanation: "'No pasa nada' նշանակում է 'ոչինչ' կամ 'խնդիր չկա':"
  },
  {
    id: 7,
    phrase: "¿De dónde eres?",
    hyMeaning: "Որտեղի՞ց ես",
    options: ["Soy de Armenia", "Estoy bien", "Tengo hambre"],
    correct: "Soy de Armenia",
    explanation: "'Soy de...' օգտագործվում է ծագումը նշելու համար:"
  },
  {
    id: 8,
    phrase: "¡Hasta mañana!",
    hyMeaning: "Մինչ վաղը",
    options: ["Nos vemos", "Buenos días", "Encantado"],
    correct: "Nos vemos",
    explanation: "'Nos vemos' նշանակում է 'կհանդիպենք':"
  },
  {
    id: 9,
    phrase: "¿Qué hora es?",
    hyMeaning: "Ժամը քանի՞սն է",
    options: ["Son las tres", "Tengo tiempo", "Es tarde"],
    correct: "Son las tres",
    explanation: "'Son las...' օգտագործվում է ժամը նշելու համար:"
  },
  {
    id: 10,
    phrase: "¡Buen provecho!",
    hyMeaning: "Բարի ախորժակ",
    options: ["Gracias", "Hola", "Adiós"],
    correct: "Gracias",
    explanation: "Երբ ինչ-որ մեկը ախորժակ է մաղթում, պատասխանում ենք 'Շնորհակալություն':"
  },
  {
    id: 11,
    phrase: "¿Dónde está el baño?",
    hyMeaning: "Որտե՞ղ է զուգարանը",
    options: ["A la derecha", "Está cerrado", "No sé"],
    correct: "A la derecha",
    explanation: "'A la derecha' նշանակում է 'աջ կողմում':"
  },
  {
    id: 12,
    phrase: "¿Me puedes ayudar?",
    hyMeaning: "Կարո՞ղ ես ինձ օգնել",
    options: ["Sí, claro", "No gracias", "Hola"],
    correct: "Sí, claro",
    explanation: "'Sí, claro' նշանակում է 'այո, իհարկե':"
  },
  {
    id: 13,
    phrase: "¡Salud!",
    hyMeaning: "Կենացդ / Առողջություն (փռշտալիս)",
    options: ["Gracias", "De nada", "Perdón"],
    correct: "Gracias",
    explanation: "Սա ստանդարտ պատասխանն է 'Salud' մաղթանքին:"
  },
  {
    id: 14,
    phrase: "¿Cuánto cuesta?",
    hyMeaning: "Ինչքա՞ն արժե",
    options: ["Diez euros", "Es grande", "Me gusta"],
    correct: "Diez euros",
    explanation: "Պատասխանը պետք է լինի գինը:"
  },
  {
    id: 15,
    phrase: "¡Perdón!",
    hyMeaning: "Կներեք (ուշադրություն գրավելու համար)",
    options: ["Dígame", "Hola", "Adiós"],
    correct: "Dígame",
    explanation: "'Dígame' նշանակում է 'ասեք' կամ 'լսում եմ':"
  },
  {
    id: 16,
    phrase: "¿Qué haces?",
    hyMeaning: "Ի՞նչ ես անում",
    options: ["Nada especial", "Estoy bien", "Soy Gor"],
    correct: "Nada especial",
    explanation: "'Nada especial' նշանակում է 'ոչ մի առանձնահատուկ բան':"
  },
  {
    id: 17,
    phrase: "¡Me gusta mucho!",
    hyMeaning: "Ինձ շատ է դուր գալիս",
    options: ["A mí también", "A mí no", "Qué bien"],
    correct: "A mí también",
    explanation: "'A mí también' նշանակում է 'ինձ նույնպես':"
  },
  {
    id: 18,
    phrase: "¿Entiendes?",
    hyMeaning: "Հասկանո՞ւմ ես",
    options: ["Sí, entiendo", "No hablo", "Hola"],
    correct: "Sí, entiendo",
    explanation: "'Sí, entiendo' նշանակում է 'այո, հասկանում եմ':"
  },
  {
    id: 19,
    phrase: "¡Cuidado!",
    hyMeaning: "Զգո՛ւյշ",
    options: ["Gracias", "Perդón", "Hola"],
    correct: "Gracias",
    explanation: "Երբ զգուշացնում են վտանգի մասին, շնորհակալություն ենք հայտնում:"
  },
  {
    id: 20,
    phrase: "¿Quieres algo?",
    hyMeaning: "Ինչ-որ բան ուզո՞ւմ ես",
    options: ["Un agua, por favor", "No sé", "Adiós"],
    correct: "Un agua, por favor",
    explanation: "Սա պատասխան է առաջարկին:"
  }
];

export default function GorGayaneBattle() {
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
    }, 2000);
  };

  const restart = () => {
    setStep(0);
    setScores({ gor: 0, gayane: 0 });
    setTurn('gor');
    setFeedback(null);
    setIsFinished(false);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-4 md:p-8 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-1000 ${turn === 'gor' ? 'bg-blue-900/20' : 'bg-pink-900/20'}`} />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
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
              <div className={`p-4 rounded-3xl border-4 transition-all ${turn === 'gor' ? 'bg-blue-600 border-blue-400 scale-105 shadow-[0_0_30px_rgba(37,99,235,0.5)]' : 'bg-zinc-900 border-zinc-800 opacity-50'}`}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-white rounded-2xl p-1 overflow-hidden border-2 border-blue-300">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gor&backgroundColor=b6e3f4" alt="Gor" referrerPolicy="no-referrer" />
                  </div>
                  <p className="font-black italic text-xs uppercase tracking-widest">ԳՈՌ</p>
                  <p className="text-4xl font-black">{scores.gor}</p>
                </div>
              </div>

              {/* VS Center */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse">
                  <Swords className="w-8 h-8 text-white" />
                </div>
                <p className="mt-2 font-black text-zinc-500 uppercase tracking-[0.3em]">ՄԱՐՏ</p>
              </div>

              {/* Gayane Side */}
              <div className={`p-4 rounded-3xl border-4 transition-all ${turn === 'gayane' ? 'bg-pink-600 border-pink-400 scale-105 shadow-[0_0_30_rgba(219,39,119,0.5)]' : 'bg-zinc-900 border-zinc-800 opacity-50'}`}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-white rounded-2xl p-1 overflow-hidden border-2 border-pink-300">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gayane&backgroundColor=ffdfbf" alt="Gayane" referrerPolicy="no-referrer" />
                  </div>
                  <p className="font-black italic text-xs uppercase tracking-widest text-white">ԳԱՅԱՆԵ</p>
                  <p className="text-4xl font-black">{scores.gayane}</p>
                </div>
              </div>
            </div>

            {/* Current Turn Indicator */}
            <div className="text-center">
              <motion.div
                key={turn}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`inline-block px-8 py-2 rounded-full font-black uppercase tracking-[0.2em] text-sm ${turn === 'gor' ? 'bg-blue-500' : 'bg-pink-500'}`}
              >
                ՀԵՐԹԸ {turn === 'gor' ? 'ԳՈՌԻՆՆ' : 'ԳԱՅԱՆԵԻՆՆ'} Է
              </motion.div>
            </div>

            {/* Question Card */}
            <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-12 border-4 border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <MessageCircle className="w-48 h-48" />
              </div>

              <div className="text-center relative z-10">
                <p className="text-zinc-500 font-black uppercase tracking-widest text-xs mb-4">ԻՍՊԱՆԱՑԻՆԵՐՆ ԱՍՈՒՄ ԵՆ.</p>
                <motion.h2 
                  key={step}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-4"
                >
                  {currentQuestion.phrase}
                </motion.h2>
                <p className="text-xl font-bold text-zinc-400 italic mb-12">
                  ({currentQuestion.hyMeaning})
                </p>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      disabled={!!feedback}
                      onClick={() => handleAnswer(option)}
                      className={`py-8 px-4 rounded-2xl border-4 transition-all text-2xl font-black shadow-xl relative overflow-hidden group ${
                        selectedOption === option
                          ? feedback === 'correct'
                            ? 'bg-emerald-600 border-white text-white scale-105'
                            : 'bg-red-600 border-white text-white scale-105'
                          : feedback && option === currentQuestion.correct
                          ? 'bg-emerald-900/50 border-emerald-500 text-emerald-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white'
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
                    className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md z-20 p-8 text-center"
                  >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      {feedback === 'correct' ? <CheckCircle2 className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
                    </div>
                    <h3 className={`text-4xl font-black mb-4 ${feedback === 'correct' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {feedback === 'correct' ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է!'}
                    </h3>
                    <p className="text-xl text-zinc-300 max-w-md">
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 p-12 rounded-[4rem] border-8 border-zinc-800 text-center shadow-2xl relative overflow-hidden"
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4">ԱՎԱՐՏ!</h2>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-600/20 p-8 rounded-3xl border-4 border-blue-500/30">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gor&backgroundColor=b6e3f4" className="w-20 h-20 mx-auto mb-4 rounded-xl" alt="Gor" />
                <p className="text-5xl font-black text-blue-400">{scores.gor}</p>
                <p className="text-xs font-black uppercase tracking-widest text-blue-300">ԳՈՌ</p>
              </div>
              <div className="bg-pink-600/20 p-8 rounded-3xl border-4 border-pink-500/30">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gayane&backgroundColor=ffdfbf" className="w-20 h-20 mx-auto mb-4 rounded-xl" alt="Gayane" />
                <p className="text-5xl font-black text-pink-400">{scores.gayane}</p>
                <p className="text-xs font-black uppercase tracking-widest text-pink-300">ԳԱՅԱՆԵ</p>
              </div>
            </div>

            <div className="bg-zinc-800 p-8 rounded-3xl mb-12">
              <h3 className="text-3xl font-black italic text-yellow-400 mb-2">
                {scores.gor > scores.gayane ? 'ԳՈՌԸ ՀԱՂԹԵՑ!' : scores.gayane > scores.gor ? 'ԳԱՅԱՆԵՆ ՀԱՂԹԵՑ!' : 'ՈՉ-ՈՔԻ!'}
              </h3>
              <p className="text-zinc-400 font-bold">Դուք երկուսդ էլ հիանալի սովորեցիք իսպաներենի առօրյա ֆրազները:</p>
            </div>

            <button 
              onClick={restart}
              className="w-full py-8 bg-white text-zinc-950 rounded-full font-black text-3xl uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-6"
            >
              <RotateCcw className="w-10 h-10" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
          </motion.div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #020617;
          margin: 0;
        }
      `}} />
    </div>
  );
}
