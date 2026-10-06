import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, X, ShieldCheck } from 'lucide-react';

interface PurchaseEvent {
  name: string;
  city: string;
  state: string;
  item: string;
  timeAgo: string;
}

const RECENT_PURCHASES: PurchaseEvent[] = [
  {
    name: 'Juliana Mendes',
    city: 'Curitiba',
    state: 'PR',
    item: 'Kit Duplo Salão (Mais Vendido)',
    timeAgo: 'há 2 minutos',
  },
  {
    name: 'Studio Bella Hair',
    city: 'Belo Horizonte',
    state: 'MG',
    item: '3x Kit Master Profissional',
    timeAgo: 'há 4 minutos',
  },
  {
    name: 'Carla Silveira',
    city: 'São Paulo',
    state: 'SP',
    item: 'Máscara S.O.S 250ml',
    timeAgo: 'há 6 minutos',
  },
  {
    name: 'Espaço VIP Cabeleireiros',
    city: 'Rio de Janeiro',
    state: 'RJ',
    item: 'Kit Duplo Salão + Frete Grátis',
    timeAgo: 'há 1 minuto',
  },
  {
    name: 'Patrícia Rocha',
    city: 'Goiânia',
    state: 'GO',
    item: 'Kit Master Profissional + Brinde',
    timeAgo: 'há 8 minutos',
  },
  {
    name: 'Renata Albuquerque',
    city: 'Campinas',
    state: 'SP',
    item: 'Kit Duplo Salão',
    timeAgo: 'há 3 minutos',
  },
  {
    name: 'Salão Glamour Hair',
    city: 'Florianópolis',
    state: 'SC',
    item: '3x Kit Master Profissional',
    timeAgo: 'há 5 minutos',
  },
];

export const SocialProofToast: React.FC<{ onOpenOrder: () => void }> = ({ onOpenOrder }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show first toast after 3.5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    // Interval to cycle through purchases
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true);
      }, 800);
    }, 9500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  // Hide toast after 5 seconds on screen
  useEffect(() => {
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5500);
      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  if (isDismissed) return null;

  const currentPurchase = RECENT_PURCHASES[currentIndex];

  return (
    <aside
      aria-live="polite"
      aria-label="Notificação de compra recente"
      className={`fixed z-40 transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      } left-4 sm:left-6 bottom-24 sm:bottom-6 max-w-[340px] sm:max-w-sm`}
    >
      <div className="bg-[#12161f]/95 backdrop-blur-md border border-amber-500/30 rounded-2xl p-3.5 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-start gap-3 relative overflow-hidden group">
        {/* Subtle accent sheen */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400 animate-pulse" />

        {/* Product / Bag Icon Avatar */}
        <div
          onClick={onOpenOrder}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/30 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform shadow-inner"
        >
          <ShoppingBag className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs font-bold text-white truncate">
              {currentPurchase.name}
            </span>
            <span className="text-[10px] text-slate-400">
              ({currentPurchase.city} - {currentPurchase.state})
            </span>
            <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0 ml-auto" aria-hidden="true" />
          </div>

          <p className="text-xs font-semibold text-amber-300 leading-snug line-clamp-1">
            Comprou {currentPurchase.item}
          </p>

          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
            <span>{currentPurchase.timeAgo}</span>
            <span className="text-emerald-400 font-medium flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" /> Compra Verificada
            </span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setIsDismissed(true);
          }}
          className="text-slate-500 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Fechar notificação de compras"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
