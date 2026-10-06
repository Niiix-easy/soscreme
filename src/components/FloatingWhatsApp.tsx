import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const defaultMessage = encodeURIComponent(
    'Olá! Estava na página do S.O.S Capilar Dyusar e gostaria de tirar dúvidas sobre o tratamento.'
  );

  return (
    <aside
      aria-label="Atendimento rápido por WhatsApp"
      className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 group"
    >
      {/* Tooltip on hover/focus */}
      <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-lg border border-slate-700/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale conosco no WhatsApp
      </span>

      {/* Floating Button */}
      <a
        href={`https://wa.me/5511999999999?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
        aria-label="Iniciar conversa com suporte Dyusar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        {/* Pulsing online badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950 animate-pulse" />
      </a>
    </aside>
  );
};
