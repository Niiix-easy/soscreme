import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

export const ScarcityCounter: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [units, setUnits] = useState<number>(0);

  useEffect(() => {
    // Generate a random number between 3 and 12
    setUnits(Math.floor(Math.random() * (12 - 3 + 1)) + 3);
  }, []);

  return (
    <div className={`flex items-center gap-2 text-rose-400 font-bold ${className}`}>
      <Flame className="w-4 h-4 fill-rose-500 animate-pulse" />
      <span className="text-xs sm:text-sm uppercase tracking-wider">
        Atenção: Apenas <span className="text-white bg-rose-500 px-1.5 py-0.5 rounded">{units} unidades</span> em estoque!
      </span>
    </div>
  );
};
