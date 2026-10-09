import React from 'react';
import { ShieldCheck, Truck, Award, RefreshCw } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    { icon: Award, label: 'Produto Original' },
    { icon: ShieldCheck, label: 'Compra Segura (SSL)' },
    { icon: Truck, label: 'Entrega Garantida' },
    { icon: RefreshCw, label: 'Devolução Facilitada' },
  ];

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 pt-4">
      {badges.map((badge, idx) => (
        <div key={idx} className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-slate-400">
          <badge.icon className="w-4 h-4 text-amber-400" />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
};
