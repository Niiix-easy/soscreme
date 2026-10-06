import React from 'react';
import { Check, Sparkles, ShieldCheck, Truck, Gift, ShoppingCart, Lock } from 'lucide-react';
import { PRICING_PLANS } from '../data/landingData.ts';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="ofertas" className="py-20 lg:py-28 bg-[#0e1117] border-t border-slate-800 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-amber-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Condição Exclusiva de Lote</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Escolha seu <span className="text-gold-gradient">Kit de Tratamento S.O.S</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Aproveite os descontos especiais para profissionais e clientes com garantia incondicional de 7 dias e envio expresso.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400 shadow-[0_15px_40px_rgba(212,175,55,0.25)] lg:-translate-y-2'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700 shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                    ⭐ Escolha Mais Popular
                  </div>
                )}

                <div>
                  {/* Card Title & Tagline */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white font-display">
                      {plan.title}
                    </h3>
                    {plan.discountBadge && (
                      <span className="text-[11px] font-extrabold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-md">
                        {plan.discountBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mb-6">{plan.tagline}</p>

                  {/* Price Block */}
                  <div className="mb-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                    <div className="text-xs text-slate-400 line-through">
                      De R$ {plan.originalPrice.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="flex items-baseline gap-1 my-1">
                      <span className="text-sm font-semibold text-slate-300">R$</span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                        {plan.currentPrice.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-slate-400">à vista</span>
                    </div>
                    <div className="text-xs font-medium text-emerald-400">
                      ou {plan.installments}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8 text-sm text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{plan.units}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Recuperação profunda em 3 minutos</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Ação pré e pós-química de impacto</span>
                    </li>
                    {plan.freeShipping && (
                      <li className="flex items-start gap-2.5 text-amber-300 font-semibold">
                        <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>Frete Grátis para todo o Brasil</span>
                      </li>
                    )}
                    {plan.bonusGift && (
                      <li className="flex items-start gap-2.5 text-amber-200 font-semibold bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                        <Gift className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-xs">{plan.bonusGift}</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Buy Button */}
                <div>
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      isPopular
                        ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-lg shadow-amber-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{plan.ctaText}</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-3">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>Pagamento Seguro · Garantia de 7 Dias</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Warranty Banner */}
        <div className="mt-14 max-w-4xl mx-auto p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Garantia Blindada de Satisfação Dyusar</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Se você não notar a interrupção do emborrachamento já na primeira aplicação, devolvemos 100% do seu valor.
              </div>
            </div>
          </div>
          <span className="text-xs text-amber-400 font-mono font-semibold shrink-0">
            ANVISA: 25351.492810/2021-12
          </span>
        </div>
      </div>
    </section>
  );
};
