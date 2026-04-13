import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Star,
  Zap,
  ChevronRight,
  ChevronLeft,
  GraduationCap
} from 'lucide-react';

// --- Types ---
interface ConjugationRule {
  type: '-ar' | '-er' | '-ir';
  endings: {
    yo: string;
    tu: string;
    el: string;
    nosotros: string;
    vosotros: string;
    ellos: string;
  };
  example: string;
  exampleMeaning: string;
}

interface Exercise {
  id: number;
  verb: string;
  meaning: string;
  subject: string;
  hySubject: string;
  correct: string;
  options: string[];
}

// --- Data ---
const RULES: ConjugationRule[] = [
  {
    type: '-ar',
    endings: { yo: '-o', tu: '-as', el: '-a', nosotros: '-amos', vosotros: '-áis', ellos: '-an' },
    example: 'Hablar',
    exampleMeaning: 'Խոսել'
  },
  {
    type: '-er',
    endings: { yo: '-o', tu: '-es', el: '-e', nosotros: '-emos', vosotros: '-éis', ellos: '-en' },
    example: 'Comer',
    exampleMeaning: 'Ուտել'
  },
  {
    type: '-ir',
    endings: { yo: '-o', tu: '-es', el: '-e', nosotros: '-imos', vosotros: '-ís', ellos: '-en' },
    example: 'Vivir',
    exampleMeaning: 'Ապրել'
  }
];

const EXERCISES: Exercise[] = [
  {
    id: 1,
    verb: "Hablar",
    meaning: "Խոսել",
    subject: "Yo",
    hySubject: "Ես",
    correct: "hablo",
    options: ["hablo", "hablas", "habla"]
  },
  {
    id: 2,
    verb: "Comer",
    meaning: "Ուտել",
    subject: "Tú",
    hySubject: "Դու",
    correct: "comes",
    options: ["como", "comes", "comen"]
  },
  {
    id: 3,
    verb: "Vivir",
    meaning: "Ապրել",
    subject: "Nosotros",
    hySubject: "Մենք",
    correct: "vivimos",
    options: ["vivo", "vivimos", "vivís"]
  },
  {
    id: 4,
    verb: "Cantar",
    meaning: "Երգել",
    subject: "Ella",
    hySubject: "Նա (աղջիկ)",
    correct: "canta",
    options: ["canto", "cantas", "canta"]
  },
  {
    id: 5,
    verb: "Beber",
    meaning: "Խմել",
    subject: "Ellos",
    hySubject: "Նրանք",
    correct: "beben",
    options: ["bebe", "bebemos", "beben"]
  },
  {
    id: 6,
    verb: "Escribir",
    meaning: "Գրել",
    subject: "Tú",
    hySubject: "Դու",
    correct: "escribes",
    options: ["escribo", "escribes", "escribe"]
  },
  {
    id: 7,
    verb: "Bailar",
    meaning: "Պարել",
    subject: "Vosotros",
    hySubject: "Դուք",
    correct: "bailáis",
    options: ["bailamos", "bailáis", "bailan"]
  },
  {
    id: 8,
    verb: "Abrir",
    meaning: "Բացել",
    subject: "Yo",
    hySubject: "Ես",
    correct: "abro",
    options: ["abro", "abres", "abre"]
  },
  {
    id: 9,
    verb: "Correr",
    meaning: "Վազել",
    subject: "Él",
    hySubject: "Նա",
    correct: "corre",
    options: ["corro", "corres", "corre"]
  },
  {
    id: 10,
    verb: "Leer",
    meaning: "Կարդալ",
    subject: "Nosotros",
    hySubject: "Մենք",
    correct: "leemos",
    options: ["leo", "leemos", "leen"]
  },
  {
    id: 11,
    verb: "Subir",
    meaning: "Բարձրանալ",
    subject: "Ellas",
    hySubject: "Նրանք (աղջիկներ)",
    correct: "suben",
    options: ["subo", "subimos", "suben"]
  },
  {
    id: 12,
    verb: "Caminar",
    meaning: "Քայլել",
    subject: "Yo",
    hySubject: "Ես",
    correct: "camino",
    options: ["camino", "caminas", "camina"]
  },
  {
    id: 13,
    verb: "Aprender",
    meaning: "Սովորել",
    subject: "Tú",
    hySubject: "Դու",
    correct: "aprendes",
    options: ["aprendo", "aprendes", "aprende"]
  },
  {
    id: 14,
    verb: "Partir",
    meaning: "Մեկնել / Կիսել",
    subject: "Nosotros",
    hySubject: "Մենք",
    correct: "partimos",
    options: ["parto", "partimos", "partís"]
  },
  {
    id: 15,
    verb: "Escuchar",
    meaning: "Լսել",
    subject: "Usted",
    hySubject: "Դուք (հարգալից)",
    correct: "escucha",
    options: ["escucho", "escuchas", "escucha"]
  },
  {
    id: 16,
    verb: "Vender",
    meaning: "Վաճառել",
    subject: "Vosotros",
    hySubject: "Դուք",
    correct: "vendéis",
    options: ["vendemos", "vendéis", "venden"]
  },
  {
    id: 17,
    verb: "Recibir",
    meaning: "Ստանալ",
    subject: "Yo",
    hySubject: "Ես",
    correct: "recibo",
    options: ["recibo", "recibes", "recibe"]
  },
  {
    id: 18,
    verb: "Mirar",
    meaning: "Նայել",
    subject: "Ellos",
    hySubject: "Նրանք",
    correct: "miran",
    options: ["miro", "miramos", "miran"]
  },
  {
    id: 19,
    verb: "Creer",
    meaning: "Հավատալ",
    subject: "Tú",
    hySubject: "Դու",
    correct: "crees",
    options: ["creo", "crees", "cree"]
  },
  {
    id: 20,
    verb: "Asistir",
    meaning: "Մասնակցել",
    subject: "Nosotros",
    hySubject: "Մենք",
    correct: "asistimos",
    options: ["asisto", "asistimos", "asistís"]
  }
];

export default function VerbMasterQuest() {
  const [mode, setMode] = useState<'learn' | 'practice'>('learn');
  const [ruleIndex, setRuleIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentRule = RULES[ruleIndex];
  const currentExercise = EXERCISES[exerciseIndex];

  const handleAnswer = (option: string) => {
    if (feedback || isFinished) return;
    setSelectedOption(option);
    
    if (option === currentExercise.correct) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      if (exerciseIndex < EXERCISES.length - 1) {
        setExerciseIndex(e => e + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const restart = () => {
    setExerciseIndex(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
    setSelectedOption(null);
    setMode('learn');
  };

  return (
    <div className="min-h-screen bg-blue-50 text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-300 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl w-full relative z-10 py-4">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border-4 border-blue-100 shadow-xl flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black italic tracking-tighter text-blue-600 uppercase">ԲԱՅԵՐԻ ՎԱՐՊԵՏ</h1>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Verb Conjugation Master</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setMode('learn')}
              className={`px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all ${mode === 'learn' ? 'bg-blue-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
            >
              ՍՈՎՈՐԵԼ
            </button>
            <button 
              onClick={() => setMode('practice')}
              className={`px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all ${mode === 'practice' ? 'bg-blue-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
            >
              ՎԱՐԺՈՒԹՅՈՒՆ
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'learn' ? (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-blue-50 relative overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <button 
                    onClick={() => setRuleIndex(prev => (prev > 0 ? prev - 1 : RULES.length - 1))}
                    className="p-4 bg-slate-50 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="text-center">
                    <h2 className="text-5xl font-black text-blue-600 italic tracking-tighter mb-2">{currentRule.type}</h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">ՎԵՐՋԱՎՈՐՈՒԹՅՈՒՆՆԵՐ</p>
                  </div>
                  <button 
                    onClick={() => setRuleIndex(prev => (prev < RULES.length - 1 ? prev + 1 : 0))}
                    className="p-4 bg-slate-50 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {Object.entries(currentRule.endings).map(([subject, ending]) => (
                    <div key={subject} className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 text-center group hover:border-blue-200 transition-all">
                      <p className="text-blue-400 font-black uppercase text-xs mb-2 tracking-widest">{subject}</p>
                      <p className="text-3xl font-black text-slate-800 group-hover:scale-110 transition-transform">{ending}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-blue-500 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-2">ՕՐԻՆԱԿ</p>
                    <h3 className="text-4xl font-black italic tracking-tighter">{currentRule.example}</h3>
                    <p className="text-blue-200 font-bold italic">{currentRule.exampleMeaning}</p>
                  </div>
                  <BookOpen className="w-16 h-16 opacity-20" />
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 flex items-center gap-4">
                <Zap className="w-8 h-8 text-blue-500" />
                <p className="text-sm font-bold text-blue-700 italic">
                  Հիշի՛ր. Իսպաներենում բայերը փոխում են իրենց վերջավորությունները կախված նրանից, թե ով է կատարում գործողությունը:
                </p>
              </div>
            </motion.div>
          ) : !isFinished ? (
            <motion.div
              key="practice"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-blue-50 relative">
                <div className="absolute top-8 right-8 flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border-2 border-blue-100">
                  <Star className="w-4 h-4 text-blue-500 fill-current" />
                  <span className="font-black text-blue-600">{score}</span>
                </div>

                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                    ՎԱՐԺՈՒԹՅՈՒՆ {exerciseIndex + 1} / {EXERCISES.length}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-2xl font-black text-blue-400 uppercase tracking-widest">{currentExercise.subject}</span>
                      <span className="text-slate-300 font-light text-4xl">|</span>
                      <span className="text-4xl font-black text-slate-800 italic tracking-tighter">{currentExercise.verb}</span>
                    </div>
                    <p className="text-lg font-bold text-slate-400 italic">
                      ({currentExercise.hySubject} | {currentExercise.meaning})
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentExercise.options.map((option, i) => (
                    <button
                      key={i}
                      disabled={!!feedback}
                      onClick={() => handleAnswer(option)}
                      className={`py-8 px-4 rounded-2xl border-4 transition-all text-2xl font-black shadow-lg relative overflow-hidden ${
                        selectedOption === option
                          ? feedback === 'correct'
                            ? 'bg-emerald-500 border-white text-white scale-105'
                            : 'bg-red-500 border-white text-white scale-105'
                          : feedback && option === currentExercise.correct
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                          : 'bg-slate-50 border-slate-100 text-slate-800 hover:border-blue-400 hover:text-blue-600 hover:bg-white'
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
                      className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-20 rounded-[3rem]"
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
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 md:p-20 rounded-[4rem] border-8 border-blue-100 text-center shadow-2xl relative overflow-hidden"
            >
              <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-8 drop-shadow-lg" />
              <h2 className="text-5xl md:text-6xl font-black text-slate-800 italic uppercase tracking-tighter mb-4">ՀՐԱՇԱԼԻ Է!</h2>
              <p className="text-2xl font-bold text-blue-400 italic mb-12">Դուք հաջողությամբ ավարտեցիք բայերի խոնարհման թեստը:</p>
              
              <div className="bg-blue-50 p-10 rounded-[3rem] border-4 border-white mb-12">
                <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.3em] mb-4">ՔՈ ԱՐԴՅՈՒՆՔԸ</p>
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-9xl font-black text-blue-500 drop-shadow-lg">{score}</span>
                  <span className="text-4xl font-black text-slate-300">/ {EXERCISES.length}</span>
                </div>
              </div>

              <button 
                onClick={restart}
                className="w-full py-8 bg-blue-500 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl border-b-8 border-blue-900 active:translate-y-2 active:border-b-0 flex items-center justify-center gap-6 group"
              >
                <RotateCcw className="w-10 h-10 group-hover:rotate-180 transition-transform duration-700" />
                ՆՈՐԻՑ ԽԱՂԱԼ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #eff6ff;
          margin: 0;
        }
      `}} />
    </div>
  );
}
