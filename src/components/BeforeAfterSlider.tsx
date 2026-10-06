import React, { useState, useRef } from 'react';
import { Sparkles, MoveHorizontal, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="antes-depois" className="py-20 lg:py-28 bg-[#0b0d11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Evidência Clínica e Visual</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Arraste para comparar: <span className="text-gold-gradient">Antes vs. Depois</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Veja a transformação estrutural do fio capilar elástico e danificado pós-descoloração após 3 minutos de ação da Máscara S.O.S Dyusar.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={(e) => handleMove(e.clientX)}
            className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl cursor-ew-resize select-none bg-slate-950"
            role="slider"
            aria-label="Controle de comparação antes e depois do tratamento S.O.S Dyusar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSliderPosition((prev) => Math.max(5, prev - 5));
              if (e.key === 'ArrowRight') setSliderPosition((prev) => Math.min(95, prev + 5));
            }}
          >
            {/* "DEPOIS" (Layer underneath - full width, revealed as slider moves) */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-slate-900 via-amber-950/30 to-stone-900 flex items-center justify-center p-8">
              {/* Simulated Healthy Hair Graphic Rendering */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-end p-6 sm:p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-slate-900 to-black">
                {/* Hair strands shine simulation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent opacity-80 animate-pulse pointer-events-none" />

                <div className="relative z-10 max-w-sm text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Depois (3 Minutos S.O.S)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Fios Alinhados, Firmes e Brilhantes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Cutículas 100% seladas, massa corticosa reposta e resistência mecânica recuperada. O fio não estica e não quebra.
                  </p>
                </div>
              </div>
            </div>

            {/* "ANTES" (Layer on top - clipped by sliderPosition) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-tr from-zinc-950 via-rose-950/40 to-slate-900 flex items-center justify-center"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="w-[1000px] h-full flex flex-col justify-end p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/30 via-slate-950 to-black">
                <div className="relative z-10 max-w-sm text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Antes (Fio Emborrachado)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-rose-100 mb-2">
                    Porosidade Extrema e Sem Resistência
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Fio elastificado que estica como borracha ao ser molhado, pontas duplas espigadas e perda grave de proteínas.
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.8)] z-30"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Circular Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950 border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-xl">
                <MoveHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          {/* Quick Caption Under Slider */}
          <div className="flex items-center justify-between text-xs text-slate-400 mt-4 px-2">
            <span>← Deslize para a esquerda para ver o Antes</span>
            <span className="font-semibold text-amber-400">Tecnologia Pré & Pós Química Dyusar</span>
            <span>Deslize para a direita para ver o Depois →</span>
          </div>
        </div>
      </div>
    </section>
  );
};
