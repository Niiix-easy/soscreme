export interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
  transcript: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  hairType: string;
  verified: boolean;
  date: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  tagline: string;
  units: string;
  originalPrice: number;
  currentPrice: number;
  installments: string;
  discountBadge?: string;
  isPopular?: boolean;
  freeShipping: boolean;
  bonusGift?: string;
  ctaText: string;
}

export const VIDEO_TRANSCRIPT_CHUNKS: VideoChapter[] = [
  {
    time: "00:00",
    seconds: 0,
    title: "1. Diagnóstico do Fio",
    transcript: "Cabelo danificado, elástico ou sem vida?",
  },
  {
    time: "00:03",
    seconds: 3,
    title: "2. Apresentação Dyusar S.O.S",
    transcript: "A Máscara S.O.S Capilar da Dyusar é o tratamento que resolve de verdade.",
  },
  {
    time: "00:06",
    seconds: 6,
    title: "3. Ação em 3 Minutos",
    transcript: "Em poucos minutos ela: recupera fios danificados, devolve brilho intenso e reduz a quebra.",
  },
  {
    time: "00:11",
    seconds: 11,
    title: "4. Maciez & Força",
    transcript: "Deixa o cabelo macio, forte e saudável. É a reconstrução que seu cabelo precisa.",
  },
  {
    time: "00:16",
    seconds: 16,
    title: "5. Resultado Imediato",
    transcript: "Com resultado visível já na primeira aplicação.",
  },
  {
    time: "00:20",
    seconds: 20,
    title: "6. Resgate Profissional",
    transcript: "Se o seu cabelo está pedindo socorro, o S.O.S Capilar da Dyusar é a solução.",
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    author: "Juliana Mendes",
    role: "Cabeleireira Especialista em Loiras",
    city: "São Paulo, SP",
    avatar: "JM",
    rating: 5,
    title: "Salvou o cabelo de uma cliente no lavatório em 3 minutos cravados!",
    comment: "Eu passei por aquele momento de desespero onde o pó descolorante abriu além da conta e a mecha começou a emborrachar. Apliquei o S.O.S Dyusar na hora, massageei e enxaguei. O cabelo simplesmente parou de esticar como chiclete e voltou a ter corpo! É item obrigatório no meu salão.",
    hairType: "Loiro platinado descolorido",
    verified: true,
    date: "Avaliado há 3 dias",
  },
  {
    id: "test-2",
    author: "Camila Guimarães",
    role: "Cliente Verificada",
    city: "Belo Horizonte, MG",
    avatar: "CG",
    rating: 5,
    title: "Meu cabelo quebrava só de pentear, agora está sedoso e forte",
    comment: "Fiz luzes e meu cabelo parecia palha molhada, esticava e quebrava. Comprei por indicação de uma amiga cabeleireira. Na primeira aplicação senti a diferença absurda: os fios ficaram firmes, sem aquele aspecto elástico. O brilho parece de salão de luxo!",
    hairType: "Cabelo com mechas e química",
    verified: true,
    date: "Avaliado há 1 semana",
  },
  {
    id: "test-3",
    author: "Ricardo Silveira",
    role: "Proprietário do Studio Silveira Concept",
    city: "Curitiba, PR",
    avatar: "RS",
    rating: 5,
    title: "Melhor custo-benefício pré e pós química que já testamos",
    comment: "Já usei reconstrutores importados que custavam quatro vezes mais. O S.O.S Antiemborrachamento da Dyusar tem a tecnologia de efeito teia que adere instantaneamente na fibra. Usamos tanto como protetor pré-descoloração quanto tratamento de choque pós.",
    hairType: "Salão Profissional (Uso Diário)",
    verified: true,
    date: "Avaliado há 2 semanas",
  },
  {
    id: "test-4",
    author: "Fernanda Alencar",
    role: "Influenciadora de Beleza & Consumidora",
    city: "Rio de Janeiro, RJ",
    avatar: "FA",
    rating: 5,
    title: "Adeus corte químico! Recuperou a integridade dos meus fios",
    comment: "Pensei que teria que raspar as pontas depois de uma progressiva mal sucedida combinada com coloração. O SOS da Dyusar devolveu a massa que o fio perdeu. O cheiro é maravilhoso e rende muitas aplicações porque um pouquinho já espalha super bem.",
    hairType: "Quimicamente tratado",
    verified: true,
    date: "Avaliado há 3 semanas",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan-single",
    title: "1x Frasco S.O.S 250ml",
    tagline: "Tratamento de Emergência Individual",
    units: "1 Frasco (250 ml)",
    originalPrice: 129.90,
    currentPrice: 87.90,
    installments: "3x de R$ 29,30 sem juros",
    freeShipping: false,
    ctaText: "Comprar 1 Frasco",
  },
  {
    id: "plan-duo",
    title: "Kit Duplo Salão & Casa",
    tagline: "O Mais Escolhido por Profissionais",
    units: "2 Frascos (500 ml total)",
    originalPrice: 259.80,
    currentPrice: 147.90,
    installments: "6x de R$ 24,65 sem juros",
    discountBadge: "43% DE DESCONTO",
    isPopular: true,
    freeShipping: true,
    bonusGift: "Frete Grátis para todo o Brasil",
    ctaText: "Garantir Kit Duplo (Mais Vendido)",
  },
  {
    id: "plan-trio",
    title: "Kit Master Profissional",
    tagline: "Máxima Economia para Salão ou Estoque",
    units: "3 Frascos (750 ml total) + Brinde",
    originalPrice: 389.70,
    currentPrice: 197.90,
    installments: "10x de R$ 19,79 sem juros",
    discountBadge: "50% DE DESCONTO",
    freeShipping: true,
    bonusGift: "Brinde Exclusivo: Cumbuca + Pincel Dyusar + Frete Grátis",
    ctaText: "Comprar Kit Master com Brinde",
  },
];

export const FAQS = [
  {
    question: "O que é o efeito 'antiemborrachamento' e como ele funciona?",
    answer: "O emborrachamento ocorre quando a descoloração ou química degrada a queratina e as pontes de cisteína do cabelo, fazendo com que ele estique como elástico e quebre facilmente. O S.O.S Dyusar contém nano-aminoácidos e queratina hidrolisada que penetram no córtex em apenas 3 minutos, recompondo a estrutura celular do fio e devolvendo a rigidez e elasticidade natural imediatamente.",
  },
  {
    question: "Posso usar durante a descoloração ou luzes no lavatório?",
    answer: "Sim! Essa é uma das principais aplicações recomendadas por cabeleireiros. Se durante o enxágue do pó descolorante você perceber que a fibra perdeu sustentação, aplique o S.O.S Dyusar com o cabelo úmido, enluve mecha por mecha por 3 minutos e enxágue. Ele age como um 'freio químico' instantâneo.",
  },
  {
    question: "É compatível com cabelos com progressiva, botox ou coloração?",
    answer: "Totalmente compatível. O S.O.S Capilar Dyusar não possui químicas de alisamento nem amônia, sendo um tratamento restaurador puro com colágeno, elastina e aminoácidos. É indicado para qualquer tipo de cabelo danificado, inclusive cacheados e crespos com pontas ressecadas.",
  },
  {
    question: "Quantas aplicações rende o frasco de 250ml?",
    answer: "Devido à sua alta densidade e tecnologia efeito teia, uma pequena quantidade rende em média de 15 a 25 aplicações completas (dependendo do comprimento e volume do cabelo).",
  },
  {
    question: "Qual o prazo de envio e garantia de originalidade?",
    answer: "Seu pedido é enviado em até 24 horas úteis com rastreamento oficial. Todos os produtos Dyusar Professional são 100% originais, lacrados de fábrica e homologados na ANVISA. Você também tem 7 dias de garantia incondicional de satisfação.",
  },
];
