import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageSquare, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenOrder: (planId?: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0d11]/95 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#0b0d11]/90 to-transparent py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Zone 1: Single text element Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
            aria-label="Dyusar Professional Cosméticos - Início"
          >
            <span className="text-amber-400 font-display font-black text-xl tracking-wider group-hover:text-amber-300 transition-colors">
              DYUSAR
            </span>
            <span className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase hidden sm:inline">
              Professional
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links (Single line) */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
            aria-label="Navegação principal"
          >
            <a
              href="#video-demonstracao"
              className="hover:text-amber-400 transition-colors whitespace-nowrap py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
            >
              Vídeo Demonstração
            </a>
            <a
              href="#beneficios"
              className="hover:text-amber-400 transition-colors whitespace-nowrap py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
            >
              Como Funciona
            </a>
            <a
              href="#antes-depois"
              className="hover:text-amber-400 transition-colors whitespace-nowrap py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
            >
              Resultados Reais
            </a>
            <a
              href="#depoimentos"
              className="hover:text-amber-400 transition-colors whitespace-nowrap py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
            >
              Depoimentos
            </a>
            <a
              href="#ofertas"
              className="hover:text-amber-400 transition-colors whitespace-nowrap py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
            >
              Kits & Preços
            </a>
            <a
              href="#suporte-whatsapp"
              className="hover:text-emerald-400 text-emerald-400/90 transition-colors whitespace-nowrap py-1 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Suporte WhatsApp</span>
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenOrder()}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 rounded-lg shadow-lg shadow-amber-500/20 active:scale-95 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Garantir Tratamento</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e1117] border-b border-slate-800 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-slate-200">
            <a
              href="#video-demonstracao"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-slate-800/60"
            >
              <span>Vídeo Demonstração</span>
              <span className="text-xs text-amber-400 font-mono">03 min</span>
            </a>
            <a
              href="#beneficios"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-800/60"
            >
              Como Funciona o Efeito Teia
            </a>
            <a
              href="#antes-depois"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-800/60"
            >
              Antes e Depois (Comparativo)
            </a>
            <a
              href="#depoimentos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-800/60"
            >
              Depoimentos de Salões
            </a>
            <a
              href="#ofertas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-800/60"
            >
              Kits & Promoções
            </a>
            <a
              href="#suporte-whatsapp"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-800/60 text-emerald-400 font-semibold flex items-center justify-between"
            >
              <span>Suporte Oficial no WhatsApp</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full mt-2 py-3 text-center text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-colors"
            >
              Comprar com Desconto Especial
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
