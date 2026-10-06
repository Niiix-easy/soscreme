import React, { useState } from 'react';
import { Phone, MessageCircle, Clock, ShieldCheck, Sparkles, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';
import { buildTrackedWhatsAppUrl, trackWhatsAppLead } from '../utils/analytics.ts';

export const WhatsAppSupport: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('duvidas');
  const [clientName, setClientName] = useState<string>('');

  const topics = [
    {
      id: 'duvidas',
      label: 'Dúvidas sobre o produto',
      text: 'Olá! Gostaria de tirar dúvidas sobre o uso do S.O.S Antiemborrachamento Dyusar no meu cabelo.',
    },
    {
      id: 'salao',
      label: 'Sou Cabeleireiro(a) / Salão',
      text: 'Olá! Sou profissional da beleza e quero saber mais sobre condições para salão e uso no lavatório.',
    },
    {
      id: 'rastreio',
      label: 'Ajuda com Pedido / Rastreio',
      text: 'Olá! Gostaria de consultar o status do meu pedido da Dyusar.',
    },
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];
  const greeting = clientName.trim() ? `Meu nome é ${clientName.trim()}. ` : '';
  const rawBaseText = `${currentTopic.text} ${greeting}`.trim();
  const trackedWhatsAppUrl = buildTrackedWhatsAppUrl('5511999999999', rawBaseText);

  const handleWhatsAppClick = () => {
    trackWhatsAppLead('section_suporte_whatsapp', selectedTopic);
  };

  return (
    <section id="suporte-whatsapp" className="py-20 lg:py-28 bg-[#0b0d11] relative border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full">
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Canal Direto no WhatsApp</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Fale com a nossa <span className="text-emerald-400">Consultoria Capilar</span> no WhatsApp
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Nossa equipe técnica de cabeleireiros e especialistas em recuperação de fios está online para orientar você sobre a aplicação correta e tirar qualquer dúvida.
          </p>
        </div>

        {/* WhatsApp Card Box */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Col: Info & Quick Selector */}
            <div className="md:col-span-7 space-y-5 text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    <span>Especialista Dyusar Online</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="text-xs text-slate-400">
                    Resposta média em menos de 2 minutos
                  </div>
                </div>
              </div>

              {/* Optional Name Input */}
              <div>
                <label htmlFor="wa-client-name" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Seu Nome (Opcional):
                </label>
                <input
                  type="text"
                  id="wa-client-name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Subject Options */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                  Selecione o Assunto:
                </span>
                <div className="space-y-2">
                  {topics.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTopic(t.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                        selectedTopic === t.id
                          ? 'bg-emerald-500/15 border-emerald-400 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{t.label}</span>
                      {selectedTopic === t.id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Official WhatsApp CTA */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                <MessageCircle className="w-8 h-8" />
              </div>

              <div>
                <div className="text-sm font-bold text-white">Central Oficial Dyusar</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Segunda a Sábado · 08h às 20h</span>
                </div>
              </div>

              <a
                href={trackedWhatsAppUrl}
                onClick={handleWhatsAppClick}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-95 transition-transform"
                aria-label="Abrir conversa no WhatsApp oficial da Dyusar Cosméticos"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Conversar no WhatsApp</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Atendimento 100% Humano e Gratuito</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
