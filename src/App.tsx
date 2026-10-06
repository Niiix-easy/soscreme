import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { Footer } from './components/Footer.tsx';
import { SocialProofToast } from './components/SocialProofToast.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { MobileStickyBar } from './components/MobileStickyBar.tsx';

// Performance optimization: Lazy load non-critical below-the-fold components
// to drastically minimize initial JavaScript bundle size, improve LCP, and boost Core Web Vitals
const VideoSection = lazy(() =>
  import('./components/VideoSection.tsx').then((module) => ({ default: module.VideoSection }))
);

const BeforeAfterSlider = lazy(() =>
  import('./components/BeforeAfterSlider.tsx').then((module) => ({ default: module.BeforeAfterSlider }))
);

const BenefitsBento = lazy(() =>
  import('./components/BenefitsBento.tsx').then((module) => ({ default: module.BenefitsBento }))
);

const HairDamageQuiz = lazy(() =>
  import('./components/HairDamageQuiz.tsx').then((module) => ({ default: module.HairDamageQuiz }))
);

const TestimonialsSlider = lazy(() =>
  import('./components/TestimonialsSlider.tsx').then((module) => ({ default: module.TestimonialsSlider }))
);

const PricingSection = lazy(() =>
  import('./components/PricingSection.tsx').then((module) => ({ default: module.PricingSection }))
);

const WhatsAppSupport = lazy(() =>
  import('./components/WhatsAppSupport.tsx').then((module) => ({ default: module.WhatsAppSupport }))
);

const FaqSection = lazy(() =>
  import('./components/FaqSection.tsx').then((module) => ({ default: module.FaqSection }))
);

const OrderModal = lazy(() =>
  import('./components/OrderModal.tsx').then((module) => ({ default: module.OrderModal }))
);

// High-fidelity zero-CLS skeleton placeholder with proportional heights
const SectionSkeleton: React.FC<{ minHeight?: string }> = ({ minHeight = 'min-h-[400px]' }) => (
  <div className={`w-full ${minHeight} flex items-center justify-center p-8 bg-slate-950/40`}>
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-amber-400/40 border-t-amber-400 animate-spin" />
      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
        Carregando seção otimizada...
      </span>
    </div>
  </div>
);

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-duo');

  const handleOpenOrder = (planId?: string) => {
    if (planId) {
      setSelectedPlanId(planId);
    }
    setOrderModalOpen(true);
  };

  const handleScrollToVideo = () => {
    const videoElem = document.getElementById('video-demonstracao');
    if (videoElem) {
      videoElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSupport = () => {
    const supportElem = document.getElementById('suporte-whatsapp');
    if (supportElem) {
      supportElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-black pb-16 md:pb-0">
      {/* 1. Header Navigation (Critical - Eager) */}
      <Navbar onOpenOrder={() => handleOpenOrder()} onOpenContact={handleOpenSupport} />

      <main className="flex-1">
        {/* 2. Hero Section (Critical Above-the-fold - Eager for Instant LCP) */}
        <HeroSection
          onOpenOrder={handleOpenOrder}
          onScrollToVideo={handleScrollToVideo}
        />

        {/* 3. Real Video Demonstration Section (Lazy Loaded) */}
        <Suspense fallback={<SectionSkeleton minHeight="min-h-[500px]" />}>
          <VideoSection onOpenOrder={() => handleOpenOrder('plan-duo')} />
        </Suspense>

        {/* 4. Before & After Interactive Slider (Lazy Loaded) */}
        <Suspense fallback={<SectionSkeleton minHeight="min-h-[480px]" />}>
          <BeforeAfterSlider />
        </Suspense>

        {/* 5. Benefits & Mechanism Bento (Lazy Loaded) */}
        <Suspense fallback={<SectionSkeleton minHeight="min-h-[600px]" />}>
          <BenefitsBento />
        </Suspense>

        {/* 6. Interactive Damage Quiz (Lazy Loaded) */}
        <Suspense fallback={<SectionSkeleton minHeight="min-h-[380px]" />}>
          <HairDamageQuiz onOpenOrder={() => handleOpenOrder('plan-single')} />
        </Suspense>

        {/* 7. Testimonials Slider (Lazy Loaded & initial 1-item optimization) */}
        <Suspense fallback={<SectionSkeleton minHeight="min-h-[450px]" />}>
          <TestimonialsSlider />
        </Suspense>

        {/* 8. Pricing & Packages Section (Lazy Loaded) */}
        <Suspense fallback={<SectionSkeleton minHeight="min-h-[650px]" />}>
          <PricingSection onSelectPlan={(planId) => handleOpenOrder(planId)} />
        </Suspense>

        {/* 9. WhatsApp Support & VIP Helpdesk (Replaced Form) */}
        <Suspense fallback={<SectionSkeleton minHeight="min-h-[480px]" />}>
          <WhatsAppSupport />
        </Suspense>

        {/* 10. Technical FAQ Section (Lazy Loaded) */}
        <Suspense fallback={<SectionSkeleton minHeight="min-h-[420px]" />}>
          <FaqSection />
        </Suspense>
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* 12. Real-time Simulated Social Proof Toast */}
      <SocialProofToast onOpenOrder={() => handleOpenOrder('plan-duo')} />

      {/* 13. Persistent Floating WhatsApp Support Button */}
      <FloatingWhatsApp />

      {/* 14. Mobile Sticky Conversion Bottom Bar (Zero Overlap, high touch targets) */}
      <MobileStickyBar onOpenOrder={() => handleOpenOrder('plan-duo')} />

      {/* 15. Checkout / Order Modal (Deferred) */}
      {orderModalOpen && (
        <Suspense fallback={null}>
          <OrderModal
            isOpen={orderModalOpen}
            onClose={() => setOrderModalOpen(false)}
            selectedPlanId={selectedPlanId}
          />
        </Suspense>
      )}
    </div>
  );
}
