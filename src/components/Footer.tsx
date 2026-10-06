import React from 'react';
import { ShieldCheck, Lock, Truck, Phone, Mail, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08090c] border-t border-slate-800/80 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-display font-black text-2xl tracking-wider">
                DYUSAR
              </span>
              <span className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
                Professional
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Cosméticos profissionais de alta performance desenvolvidos para salões de beleza e tratamentos intensivos de recuperação capilar pré e pós química.
            </p>
            <div className="flex items-center gap-4 text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ANVISA: Processo Nº 25351.492810/2021-12
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Navegação Rápida
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#video-demonstracao" className="hover:text-amber-400 transition-colors">
                  Vídeo no Lavatório
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-amber-400 transition-colors">
                  Efeito Teia em 3 Minutos
                </a>
              </li>
              <li>
                <a href="#antes-depois" className="hover:text-amber-400 transition-colors">
                  Antes e Depois
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-amber-400 transition-colors">
                  Avaliações de Clientes
                </a>
              </li>
              <li>
                <a href="#ofertas" className="hover:text-amber-400 transition-colors">
                  Tabela de Kits & Preços
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Suporte & Atendimento
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>WhatsApp: (11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contato@dyusar.com.br</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Envio rápido com código de rastreio</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Security & Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Dyusar Cosméticos Professional. Todos os direitos reservados. CNPJ: 28.140.231/0001-50.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Ambiente Seguro com Criptografia SSL 256 bits
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
