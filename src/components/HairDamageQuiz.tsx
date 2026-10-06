import React, { useState } from 'react';
import { HelpCircle, Check, ArrowRight, RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';

interface QuizProps {
  onOpenOrder: () => void;
}

export const HairDamageQuiz: React.FC<QuizProps> = ({ onOpenOrder }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [resultShown, setResultShown] = useState<boolean>(false);

  const questions = [
    {
      title: "Quando seu cabelo está molhado e você puxa suavemente uma mecha:",
      options: [
        { label: "Ele estica como um chiclete e não volta ao normal (ou quebra)", points: 3 },
        { label: "Ele quebra facilmente com estalo seco sem esticar", points: 2 },
        { label: "Ele embaraça e fica áspero, mas tem certa resistência", points: 1 },
      ],
    },
    {
      title: "Qual foi o histórico químico recente do seu cabelo?",
      options: [
        { label: "Descoloração / Luzes / Mechas platinadas recentes", points: 3 },
        { label: "Progressiva / Alisamento com formol ou ácidos", points: 2 },
        { label: "Coloração frequente ou uso diário de chapinha/secador", points: 1 },
      ],
    },
    {
      title: "Qual a sensação ao tocar no cabelo seco?",
      options: [
        { label: "Espigado, sem peso, parece palha e embaraça em nós", points: 3 },
        { label: "Sem brilho e com muitas pontas duplas quebradiças", points: 2 },
        { label: "Frizz constante e pontas ressecadas", points: 1 },
      ],
    },
  ];

  const handleSelectOption = (points: number) => {
    const updatedAnswers = { ...answers, [currentStep]: points };
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setResultShown(true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setResultShown(false);
  };

  // Calculate damage score
  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);

  const getDiagnosis = () => {
    if (totalScore >= 7) {
      return {
        level: "Nível 3: Emborrachamento Crítico (Alerta Vermelho)",
        color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
        description: "Seu cabelo perdeu a massa interna e as pontes de cisteína estão colapsadas. Risco iminente de corte químico.",
        protocol: "Aplique o S.O.S Dyusar no lavatório com fios úmidos. Enluve mecha a mecha por 3 a 5 minutos, 2x por semana até estabilização total da fibra.",
      };
    } else if (totalScore >= 5) {
      return {
        level: "Nível 2: Porosidade Severa e Quebra por Fragilidade",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
        description: "Cutículas abertas e perda acentuada de nutrientes e queratina. Fios quebradiços que necessitam de reposição imediata.",
        protocol: "Uso do S.O.S Dyusar 1x por semana como tratamento reconstrutor intensivo por 3 minutos antes da sua hidratação de rotina.",
      };
    } else {
      return {
        level: "Nível 1: Ressecamento e Desgaste Cuticular",
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        description: "Fios ressecados que necessitam de blindagem térmica e hidratação de impacto para prevenir quebra futura.",
        protocol: "Aplicação quinzenal do S.O.S Dyusar por 3 minutos para manutenção do brilho espelhado e prevenção pré-química.",
      };
    }
  };

  const diagnosis = getDiagnosis();

  return (
    <section className="py-20 lg:py-24 bg-[#0b0d11] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {!resultShown ? (
            <div>
              {/* Quiz Header */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <HelpCircle className="w-4 h-4" />
                  <span>Teste Rápido do Fio Elástico</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Etapa {currentStep + 1} de {questions.length}
                </div>
              </div>

              {/* Question */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                {questions[currentStep].title}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.points)}
                    className="w-full text-left p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-800/40 text-sm text-slate-200 hover:text-white transition-all flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-left space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Diagnóstico Capilar Concluído
                </span>
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refazer Teste</span>
                </button>
              </div>

              <div className={`p-4 rounded-2xl border ${diagnosis.color}`}>
                <div className="text-sm font-bold uppercase tracking-wider mb-1">
                  {diagnosis.level}
                </div>
                <p className="text-xs sm:text-sm text-slate-200">
                  {diagnosis.description}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Protocolo Recomendado Dyusar S.O.S</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {diagnosis.protocol}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onOpenOrder}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-lg hover:from-amber-400 hover:to-amber-300 transition-transform active:scale-95"
                >
                  Garantir Tratamento para meu Fio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
