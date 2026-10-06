import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenOrder: (planId?: string) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenOrder }) => {
  return (
    <aside
      aria-label="Barra de compra rápida mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e1117]/95 backdrop-blur-md border-t border-amber-500/30 px-4 py-2.5 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-400">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Frete Grátis</span>
          </div>
          <div className="text-xs text-slate-400">A partir de</div>
          <div className="text-sm font-extrabold text-white font-mono leading-none">
            R$ 87,90 <span className="text-[10px] font-normal text-slate-400">à vista</span>
          </div>
        </div>

        <button
          onClick={() => onOpenOrder('plan-duo')}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wide shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4 shrink-0" />
          <span>COMPRAR AGORA</span>
        </button>
      </div>
    </aside>
  );
};
