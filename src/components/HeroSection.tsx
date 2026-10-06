import React from 'react';
import { ShieldCheck, Zap, Sparkles, CheckCircle2, Play, ArrowRight, Truck } from 'lucide-react';
import { DyusarBottleGraphic } from './DyusarBottleGraphic.tsx';

interface HeroSectionProps {
  onOpenOrder: (planId?: string) => void;
  onScrollToVideo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenOrder, onScrollToVideo }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-500/10 via-rose-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Context kicker: clean unboxed metadata with dot separator */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400/90 mb-4 bg-amber-950/40 border border-amber-500/20 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>Tecnologia Efeito Teia</span>
              <span aria-hidden="true" className="text-amber-500/50">·</span>
              <span>Ação Imediata em 3 Minutos</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.12] mb-6 [text-wrap:balance]">
              Recupere cabelos <span className="text-gold-gradient">elásticos e danificados</span> em apenas 3 minutos.
            </h1>

            {/* Sub-headline description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              A <strong className="text-white font-semibold">Máscara S.O.S Capilar Antiemborrachamento Dyusar Professional</strong> age como um freio químico instantâneo no lavatório. Devolve a resistência, sela as cutículas e reconstrói fios sensibilizados por descoloração ou químicas severas.
            </p>

            {/* Quick Proof Bullets */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full max-w-xl text-sm text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Interrompe o efeito elástico na 1ª aplicação</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Hidratação de impacto com aminoácidos</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Proteção essencial pré e pós-descoloração</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Rendimento de 15 a 25 aplicações profissionais</span>
              </li>
            </ul>

            {/* Action Buttons & Video Trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={() => onOpenOrder('plan-duo')}
                className="group flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 rounded-xl shadow-xl shadow-amber-500/25 active:scale-98 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <span>Garantir S.O.S com Desconto</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>

              <button
                onClick={onScrollToVideo}
                className="flex items-center justify-center gap-3 px-6 py-4 text-base font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 rounded-xl hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" aria-hidden="true" />
                </div>
                <span>Assistir Aplicação Real (03 min)</span>
              </button>
            </div>

            {/* Trust and Social Proof Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Homologado na ANVISA</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Envio Imediato para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-400">4.9/5★</span>
                <span>Mais de 1.840 avaliações</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Showcase Halo Card */}
            <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-amber-500/20 shadow-2xl flex flex-col items-center">
              {/* Top pill badge */}
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Produto Original
                </span>
                <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  Fórmula Concentrada 250ml
                </span>
              </div>

              {/* Central Bottle Graphic */}
              <div className="my-2 transform hover:scale-105 transition-transform duration-300">
                <DyusarBottleGraphic size="lg" />
              </div>

              {/* Floating Stat Badges around product */}
              <div className="w-full grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800 text-center">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <div className="text-base sm:text-lg font-extrabold text-amber-400 font-mono">03 min</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Ação Rápida</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <div className="text-base sm:text-lg font-extrabold text-emerald-400 font-mono">99.4%</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Menos Quebra</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <div className="text-base sm:text-lg font-extrabold text-amber-400 font-mono">100%</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Sem Amônia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
