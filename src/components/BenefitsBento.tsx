import React from 'react';
import { Layers, Activity, ShieldCheck, Sparkles, Feather, Clock } from 'lucide-react';

export const BenefitsBento: React.FC = () => {
  return (
    <section id="beneficios" className="py-20 lg:py-28 bg-[#0e1117] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Fórmula de Engenharia Capilar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Por que o <span className="text-gold-gradient">S.O.S Dyusar</span> funciona onde outros falham?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Diferente de máscaras comuns que apenas encapam o fio com silicone, a Dyusar age na intimidade do córtex capilar repondo matéria proteica perdida.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Efeito Teia (col-span-8) */}
          <div className="md:col-span-8 rounded-3xl bg-slate-900/70 border border-slate-800 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300 shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                  01. TECNOLOGIA EXCLUSIVA
                </span>
                <Clock className="w-5 h-5 text-amber-400" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Efeito Teia com Distribuição Molecular Uniforme
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                A textura em efeito teia facilita a aderência da emulsão aos fios por atração eletrostática. Com uma pequena quantidade na palma das mãos, os ativos se multiplicam e alcançam até as microfissuras mais profundas sem pesar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-xl font-extrabold text-white font-mono">3 Minutos</div>
                <div className="text-xs text-slate-400 mt-0.5">Tempo total de pausa</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono">Zero Enrijecimento</div>
                <div className="text-xs text-slate-400 mt-0.5">Fios maleáveis e sedosos</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-amber-400 font-mono">Alta Rendição</div>
                <div className="text-xs text-slate-400 mt-0.5">Até 25 aplicações</div>
              </div>
            </div>
          </div>

          {/* Card 2: Queratina e Colágeno (col-span-4) */}
          <div className="md:col-span-4 rounded-3xl bg-slate-900/70 border border-slate-800 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                  02. BIOCOMPLEXO
                </span>
                <Layers className="w-5 h-5 text-amber-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                Queratina Hidrolisada & Colágeno
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Proteínas de baixo peso molecular que reconstroem as cadeias polipeptídicas rompidas pelo amoníaco, oxidantes e alisantes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300">
              <span className="text-amber-400 font-semibold">Reposição de Massa:</span> Devolve a espessura original a fios afinados pela descoloração.
            </div>
          </div>

          {/* Card 3: Freio Químico Pré e Pós (col-span-4) */}
          <div className="md:col-span-4 rounded-3xl bg-slate-900/70 border border-slate-800 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                  03. SEGURANÇA NO SALÃO
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                Freio Químico de Impacto Imediato
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Bloqueia a oxidação residual do pó descolorante e cessa a elasticidade no próprio lavatório, evitando o temido corte químico.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300">
              <span className="text-emerald-400 font-semibold">Uso Estratégico:</span> Perfeito antes de mechas como barreira e após o enxágue.
            </div>
          </div>

          {/* Card 4: Brilho Espelhado e Maciez (col-span-8) */}
          <div className="md:col-span-8 rounded-3xl bg-slate-900/70 border border-slate-800 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300 shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-500/10 transition-colors" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                  04. SELAGEM CUTICULAR
                </span>
                <Feather className="w-5 h-5 text-amber-400" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Brilho Espelhado com Toque de Seda
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                Muitos reconstrutores deixam o cabelo áspero ou duro. A fórmula do S.O.S Dyusar equilibra o pH e sela a cutícula perfeitamente, proporcionando maciez incomparável, desembaraço imediato e luminosidade que dura semanas.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
              <span className="px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                Livre de Parabenos
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                Não Testado em Animais (Cruelty Free)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                Fragrância Suave e Sofisticada
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
