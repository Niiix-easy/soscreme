import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Lock, Truck, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRICING_PLANS, PricingPlan } from '../data/landingData.ts';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId = 'plan-duo',
}) => {
  const [currentPlanId, setCurrentPlanId] = useState<string>(selectedPlanId);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerCep, setCustomerCep] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPlanId) {
      setCurrentPlanId(selectedPlanId);
    }
  }, [selectedPlanId]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activePlan: PricingPlan =
    PRICING_PLANS.find((p) => p.id === currentPlanId) || PRICING_PLANS[1];

  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-order-title"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 id="modal-order-title" className="text-lg font-bold text-white">
              Finalizar Pedido Dyusar S.O.S
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Fechar modal de pedido"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {orderComplete ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <Check className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white">Reserva Confirmada com Sucesso!</h4>
              <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                Parabéns, <strong className="text-white">{customerName || 'Cliente'}</strong>! Sua reserva do <strong className="text-amber-400">{activePlan.title}</strong> foi registrada com desconto promocional garantido.
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 text-left space-y-1">
                <div>Pedido: <span className="font-mono text-white font-bold">#DYU-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                <div>Status: <span className="text-emerald-400 font-semibold">Aguardando Envio Imediato</span></div>
                <div>Forma de pagamento: Pix com 5% de desconto ou até 10x no Cartão</div>
              </div>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all"
                >
                  Concluir & Acompanhar Entrega
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFinishOrder} className="space-y-5">
              {/* Kit Selection Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Selecione o seu Kit:
                </label>
                <div className="space-y-2">
                  {PRICING_PLANS.map((plan) => (
                    <label
                      key={plan.id}
                      onClick={() => setCurrentPlanId(plan.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        currentPlanId === plan.id
                          ? 'border-amber-400 bg-amber-500/10 text-white'
                          : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="planSelect"
                          checked={currentPlanId === plan.id}
                          onChange={() => setCurrentPlanId(plan.id)}
                          className="accent-amber-400 w-4 h-4"
                        />
                        <div>
                          <div className="text-sm font-bold">{plan.title}</div>
                          <div className="text-xs text-slate-400">{plan.units}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-amber-300 font-mono">
                          R$ {plan.currentPrice.toFixed(2).replace('.', ',')}
                        </div>
                        {plan.freeShipping && (
                          <div className="text-[10px] text-emerald-400 font-semibold">Frete Grátis</div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-3 pt-2">
                <div>
                  <label htmlFor="order-name" className="block text-xs text-slate-300 font-medium mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="order-name"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="order-phone" className="block text-xs text-slate-300 font-medium mb-1">
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      id="order-phone"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(11) 98765-4321"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="order-cep" className="block text-xs text-slate-300 font-medium mb-1">
                      CEP de Entrega *
                    </label>
                    <input
                      type="text"
                      id="order-cep"
                      required
                      value={customerCep}
                      onChange={(e) => setCustomerCep(e.target.value)}
                      placeholder="00000-000"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="order-email" className="block text-xs text-slate-300 font-medium mb-1">
                    E-mail para Rastreio *
                  </label>
                  <input
                    type="email"
                    id="order-email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Garantir Pedido por R$ {activePlan.currentPrice.toFixed(2).replace('.', ',')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Guarantee footer */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 text-center">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  Compra Segura
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  7 Dias de Garantia
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-emerald-400" />
                  Envio 24h
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
