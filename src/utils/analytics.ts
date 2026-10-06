/**
 * Utilitário Centralizado de Rastreamento & Métricas de Conversão
 * Suporte a Google Tag Manager (GTM), Meta Pixel (Facebook) e UTMfy / UTMs de Tráfego Pago
 */

// Declaração de tipos globais para janelas de navegadores
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    utmify?: Record<string, unknown>;
  }
}

// Parâmetros de rastreamento padrões do ecossistema de tráfego pago
export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  src?: string;
  sck?: string;
  fbclid?: string;
  gclid?: string;
  ttclid?: string;
  [key: string]: string | undefined;
}

const UTM_STORAGE_KEY = 'dyusar_tracking_utms';

/**
 * Captura parâmetros UTM e IDs de cliques da URL e persiste no localStorage / sessionStorage
 */
export function captureAndPersistUtms(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const captured: UtmParams = {};

    const trackingKeys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'src',
      'sck',
      'fbclid',
      'gclid',
      'ttclid',
    ];

    let hasAnyUtm = false;
    trackingKeys.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        captured[key] = val;
        hasAnyUtm = true;
      }
    });

    if (hasAnyUtm) {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
      return captured;
    }

    // Tenta recuperar do storage anterior se não estiver na URL atual
    const saved = sessionStorage.getItem(UTM_STORAGE_KEY) || localStorage.getItem(UTM_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn('Erro ao capturar UTMs:', err);
  }

  return {};
}

/**
 * Retorna os parâmetros UTM atualmente salvos
 */
export function getSavedUtms(): UtmParams {
  if (typeof window === 'undefined') return {};
  try {
    const saved = sessionStorage.getItem(UTM_STORAGE_KEY) || localStorage.getItem(UTM_STORAGE_KEY);
    return saved ? JSON.parse(saved) : captureAndPersistUtms();
  } catch {
    return {};
  }
}

/**
 * Adiciona UTMs à URL de checkout ou afiliado
 */
export function appendUtmsToUrl(url: string): string {
  try {
    const utms = getSavedUtms();
    if (Object.keys(utms).length === 0) return url;

    const parsedUrl = new URL(url, window.location.origin);
    Object.entries(utms).forEach(([key, val]) => {
      if (val && !parsedUrl.searchParams.has(key)) {
        parsedUrl.searchParams.set(key, val);
      }
    });
    return parsedUrl.toString();
  } catch {
    return url;
  }
}

/**
 * Monta o link do WhatsApp oficial já com mensagem e parâmetros de rastreio (UTMfy / Gestão de Lead)
 */
export function buildTrackedWhatsAppUrl(
  phoneNumber: string = '5511999999999',
  baseText: string = 'Olá, gostaria de saber mais sobre o S.O.S Dyusar'
): string {
  const utms = getSavedUtms();
  const utmSuffix = utms.utm_source
    ? ` [Origem: ${utms.utm_source}${utms.utm_campaign ? ' | ' + utms.utm_campaign : ''}]`
    : '';

  const fullText = encodeURIComponent(`${baseText}${utmSuffix}`);
  return `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${fullText}`;
}

/**
 * Envia evento para o Google Tag Manager (DataLayer)
 */
export function pushToDataLayer(eventPayload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);
}

/**
 * Envia evento para o Meta / Facebook Pixel
 */
export function trackMetaPixel(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
}

// ==========================================
// EVENTOS PADRONIZADOS DE ALTA CONVERSÃO
// ==========================================

/**
 * Rastreia PageView inicial
 */
export function trackPageView(): void {
  const utms = getSavedUtms();

  pushToDataLayer({
    event: 'page_view_custom',
    page_title: document.title,
    page_location: window.location.href,
    ...utms,
  });

  trackMetaPixel('PageView');
}

/**
 * Rastreia visualização de produto
 */
export function trackViewContent(productName: string = 'Dyusar S.O.S Antiemborrachamento', value: number = 87.90): void {
  const utms = getSavedUtms();

  pushToDataLayer({
    event: 'view_item',
    item_name: productName,
    currency: 'BRL',
    value: value,
    ...utms,
  });

  trackMetaPixel('ViewContent', {
    content_name: productName,
    content_type: 'product',
    currency: 'BRL',
    value: value,
  });
}

/**
 * Rastreia início de checkout (clique em comprar ou abertura de modal)
 */
export function trackInitiateCheckout(planId: string, price: number, planName: string): void {
  const utms = getSavedUtms();

  pushToDataLayer({
    event: 'begin_checkout',
    plan_id: planId,
    plan_name: planName,
    value: price,
    currency: 'BRL',
    ...utms,
  });

  trackMetaPixel('InitiateCheckout', {
    content_name: planName,
    content_ids: [planId],
    content_type: 'product',
    value: price,
    currency: 'BRL',
  });
}

/**
 * Rastreia Lead e clique para o WhatsApp (Suporte ou Conversão)
 */
export function trackWhatsAppLead(sourceLocation: string, topic?: string): void {
  const utms = getSavedUtms();

  pushToDataLayer({
    event: 'generate_lead',
    lead_channel: 'whatsapp',
    lead_source: sourceLocation,
    lead_topic: topic || 'geral',
    ...utms,
  });

  trackMetaPixel('Lead', {
    content_name: 'WhatsApp Support Lead',
    content_category: topic || 'duvidas_capilares',
  });

  trackMetaPixel('Contact', {
    channel: 'whatsapp',
    source: sourceLocation,
  });
}

/**
 * Rastreia compra ou reserva finalizada
 */
export function trackPurchaseSuccess(orderId: string, planId: string, value: number, planName: string): void {
  const utms = getSavedUtms();

  pushToDataLayer({
    event: 'purchase',
    transaction_id: orderId,
    value: value,
    currency: 'BRL',
    items: [
      {
        item_id: planId,
        item_name: planName,
        price: value,
        quantity: 1,
      },
    ],
    ...utms,
  });

  trackMetaPixel('Purchase', {
    content_name: planName,
    content_ids: [planId],
    content_type: 'product',
    value: value,
    currency: 'BRL',
  });
}

/**
 * Rastreia interação com o vídeo de demonstração
 */
export function trackVideoPlay(second: number, chapter: string): void {
  pushToDataLayer({
    event: 'video_interaction',
    video_title: 'Demonstracao SOS Dyusar Lavatorio',
    video_second: second,
    video_chapter: chapter,
  });
}
