import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Maximize2,
  Minimize2,
  Award,
  Video as VideoIcon,
  Link as LinkIcon,
  Flame
} from 'lucide-react';
import { VIDEO_TRANSCRIPT_CHUNKS } from '../data/landingData.ts';

interface VideoSectionProps {
  onOpenOrder: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ onOpenOrder }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [videoMode, setVideoMode] = useState<'demo' | 'custom'>('demo');
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');
  const [appliedCustomUrl, setAppliedCustomUrl] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const customVideoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const totalDuration = 25; // seconds

  // Update active chapter and trigger spoken narration
  useEffect(() => {
    if (videoMode !== 'demo') return;

    const chapterIdx = VIDEO_TRANSCRIPT_CHUNKS.findIndex((chunk, i) => {
      const nextChunk = VIDEO_TRANSCRIPT_CHUNKS[i + 1];
      const nextTime = nextChunk ? nextChunk.seconds : totalDuration;
      return currentTime >= chunk.seconds && currentTime < nextTime;
    });

    if (chapterIdx !== -1 && chapterIdx !== activeChapterIndex) {
      setActiveChapterIndex(chapterIdx);

      // Play narration if active and not muted
      if (isPlaying && isVoiceActive && !isMuted && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const textToSpeak = VIDEO_TRANSCRIPT_CHUNKS[chapterIdx].transcript;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.05;
        const voices = window.speechSynthesis.getVoices();
        const ptVoice = voices.find((v) => v.lang.startsWith('pt'));
        if (ptVoice) utterance.voice = ptVoice;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [currentTime, isPlaying, isVoiceActive, isMuted, activeChapterIndex, videoMode]);

  // Video playback loop for demo mode
  useEffect(() => {
    if (videoMode === 'demo' && isPlaying) {
      lastTimeRef.current = performance.now();
      const tick = (now: number) => {
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;

        setCurrentTime((prev) => {
          if (prev + delta >= totalDuration) {
            setIsPlaying(false);
            if (typeof window !== 'undefined' && window.speechSynthesis) {
              window.speechSynthesis.cancel();
            }
            return 0;
          }
          return prev + delta;
        });

        animationFrameRef.current = requestAnimationFrame(tick);
      };

      animationFrameRef.current = requestAnimationFrame(tick);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, videoMode]);

  const handleTogglePlay = () => {
    if (videoMode === 'custom' && customVideoRef.current) {
      if (customVideoRef.current.paused) {
        customVideoRef.current.play();
        setIsPlaying(true);
      } else {
        customVideoRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

    if (!isPlaying && currentTime >= totalDuration - 0.5) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (newSeconds: number) => {
    setCurrentTime(newSeconds);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleApplyCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (customVideoUrl.trim()) {
      setAppliedCustomUrl(customVideoUrl.trim());
      setVideoMode('custom');
      setIsPlaying(false);
    }
  };

  const activeTranscript = VIDEO_TRANSCRIPT_CHUNKS[activeChapterIndex]?.transcript || '';

  return (
    <section id="video-demonstracao" className="py-20 lg:py-28 bg-[#0e1117] border-y border-slate-800/80 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Vídeo Oficial de Aplicação</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Veja a ação do <span className="text-gold-gradient">S.O.S Antiemborrachamento</span> no lavatório
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Acompanhe o teste de elasticidade ao vivo: o momento em que a mecha danificada para de quebrar e recupera a força em 3 minutos.
          </p>

          {/* Mode Switcher */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => {
                setVideoMode('demo');
                setIsPlaying(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                videoMode === 'demo'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              <span>Vídeo Demonstração Técnica & Narração</span>
            </button>

            <button
              onClick={() => {
                setVideoMode('custom');
                setIsPlaying(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                videoMode === 'custom'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Inserir Link de Vídeo (MP4 / Web)</span>
            </button>
          </div>
        </div>

        {/* Video Player Frame Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Box */}
          <div
            ref={containerRef}
            className={`lg:col-span-8 bg-slate-950 rounded-2xl sm:rounded-3xl border border-slate-800 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative group ${
              isFullscreen ? 'p-4 flex flex-col justify-center' : ''
            }`}
          >
            {videoMode === 'custom' && appliedCustomUrl ? (
              // HTML5 Custom Video Player
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <video
                  ref={customVideoRef}
                  src={appliedCustomUrl}
                  controls
                  className="w-full h-full object-contain"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            ) : videoMode === 'custom' && !appliedCustomUrl ? (
              // Empty Custom Video State
              <div className="relative aspect-video w-full bg-slate-900/60 p-8 flex flex-col items-center justify-center text-center">
                <VideoIcon className="w-12 h-12 text-amber-400/60 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Cole o Link do seu Vídeo de Aplicação</h3>
                <p className="text-xs text-slate-400 max-w-md mb-4">
                  Insira o link direto de um vídeo MP4 ou link web para reproduzir nesta seção da landing page.
                </p>
                <form onSubmit={handleApplyCustomVideo} className="flex gap-2 w-full max-w-md">
                  <input
                    type="url"
                    value={customVideoUrl}
                    onChange={(e) => setCustomVideoUrl(e.target.value)}
                    placeholder="https://exemplo.com/video-dyusar.mp4"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0"
                  >
                    Carregar
                  </button>
                </form>
              </div>
            ) : (
              // Interactive Synchronized Simulated Salon Player
              <div className="relative aspect-video w-full bg-gradient-to-br from-slate-950 via-[#141822] to-slate-900 overflow-hidden flex items-center justify-center">
                {/* Simulated hair salon scene elements */}
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-90">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />

                  {/* Dynamic Video Scene Representation matching user video */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {currentTime < 4 ? (
                      // Stage 1: Damaged / Elastic hair
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="inline-block px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold tracking-wide">
                          CENA 1: DIAGNÓSTICO DO FIO EMBORRACHADO
                        </div>
                        <div className="w-24 h-24 mx-auto rounded-full border-2 border-rose-500/50 flex items-center justify-center bg-rose-950/40 shadow-inner">
                          <span className="text-3xl">⚠️</span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 max-w-md font-medium">
                          Cabelo danificado, elástico e sem vida pós-descoloração esticando ao toque.
                        </p>
                      </div>
                    ) : currentTime < 12 ? (
                      // Stage 2: Application of Dyusar SOS
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wide">
                          CENA 2: APLICAÇÃO DO EFEITO TEIA
                        </div>
                        <div className="w-24 h-24 mx-auto rounded-full border-2 border-amber-400 flex items-center justify-center bg-amber-950/40 animate-pulse">
                          <span className="text-3xl">✨</span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-100 max-w-md font-medium">
                          A máscara S.O.S é espalhada no lavatório mecha a mecha com recuperação em 3 minutos.
                        </p>
                      </div>
                    ) : currentTime < 20 ? (
                      // Stage 3: Immediate recovery & transformation
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide">
                          CENA 3: RESULTADO VISÍVEL NA 1ª APLICAÇÃO
                        </div>
                        <div className="w-24 h-24 mx-auto rounded-full border-2 border-emerald-400 flex items-center justify-center bg-emerald-950/40 shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                        </div>
                        <p className="text-sm sm:text-base text-slate-100 max-w-md font-medium">
                          Fios macios, fortes, sem quebra e com resistência recuperada.
                        </p>
                      </div>
                    ) : (
                      // Stage 4: Mirror shine and finish with brand star
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="inline-block px-3 py-1 rounded-full bg-amber-500/30 border border-amber-400 text-amber-200 text-xs font-semibold tracking-wide">
                          CENA 4: DYUSAR PROFESSIONAL
                        </div>
                        <div className="w-24 h-24 mx-auto rounded-full border-2 border-amber-400 flex items-center justify-center bg-gradient-to-tr from-amber-600/40 to-yellow-300/40">
                          <Award className="w-12 h-12 text-amber-300" />
                        </div>
                        <p className="text-sm sm:text-base text-white max-w-md font-semibold">
                          Se o seu cabelo está pedindo socorro, o S.O.S Capilar da Dyusar é a solução!
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Central Play Overlay Button when paused */}
                {!isPlaying && (
                  <button
                    onClick={handleTogglePlay}
                    className="relative z-20 group/play flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-400 text-slate-950 shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:scale-110 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200"
                    aria-label="Reproduzir vídeo da aplicação do Dyusar SOS"
                  >
                    <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-current ml-1" />
                    <span className="absolute -inset-2 rounded-full border border-amber-400/50 animate-ping pointer-events-none" />
                  </button>
                )}

                {/* Top Bar inside player: Video Title & Live State */}
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between text-xs z-20 bg-gradient-to-b from-black/80 to-transparent">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="font-semibold text-white tracking-wide">
                      Dyusar Professional · Lavatório Técnico Oficial
                    </span>
                  </div>
                  <div className="text-slate-300 font-mono">
                    {Math.floor(currentTime / 60)}:
                    {Math.floor(currentTime % 60).toString().padStart(2, '0')} / 0:25
                  </div>
                </div>

                {/* Subtitles Overlay (Exact Narration from User's Video) */}
                <div className="absolute bottom-16 left-4 right-4 text-center z-20 pointer-events-none">
                  <div className="inline-block bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-sm sm:text-base font-semibold text-amber-300 shadow-xl max-w-2xl leading-snug">
                    "{activeTranscript}"
                  </div>
                </div>

                {/* Custom Video Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-30 flex flex-col gap-2">
                  {/* Timeline Progress Scrubber */}
                  <div
                    className="w-full h-2 bg-slate-800/90 rounded-full cursor-pointer relative overflow-hidden group/scrub"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                      handleSeek(ratio * totalDuration);
                    }}
                    role="slider"
                    aria-label="Linha do tempo do vídeo"
                    aria-valuemin={0}
                    aria-valuemax={totalDuration}
                    aria-valuenow={Math.round(currentTime)}
                    tabIndex={0}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 relative transition-all duration-100"
                      style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                    >
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform scale-0 group-hover/scrub:scale-100 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Action Controls */}
                  <div className="flex items-center justify-between gap-3 text-slate-200">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleTogglePlay}
                        className="p-1.5 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
                        aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                      </button>

                      <button
                        onClick={handleRestart}
                        className="p-1.5 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
                        aria-label="Reiniciar vídeo"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      {/* Mute/Voice Toggle */}
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="flex items-center gap-1.5 p-1.5 hover:text-amber-400 transition-colors text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
                        aria-label={isMuted ? 'Ativar áudio da narração' : 'Mutar áudio'}
                      >
                        {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-amber-400" />}
                        <span className="hidden sm:inline text-xs text-slate-300">
                          {isMuted ? 'Sem Áudio' : 'Voz Real'}
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-amber-300 bg-amber-500/15 border border-amber-500/25 px-2.5 py-0.5 rounded-md hidden md:inline">
                        Etapa {activeChapterIndex + 1} de {VIDEO_TRANSCRIPT_CHUNKS.length}
                      </span>

                      <button
                        onClick={toggleFullscreen}
                        className="p-1.5 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
                        aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                      >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Step-by-Step Chapters & Direct Action */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-base font-bold text-white mb-3 flex items-center justify-between">
                <span>Roteiro de Aplicação</span>
                <span className="text-xs text-amber-400 font-mono">25 segundos</span>
              </h3>

              <div className="space-y-2">
                {VIDEO_TRANSCRIPT_CHUNKS.map((chunk, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (videoMode !== 'demo') setVideoMode('demo');
                        handleSeek(chunk.seconds);
                        if (!isPlaying) setIsPlaying(true);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                        isActive && videoMode === 'demo'
                          ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-sm'
                          : 'bg-slate-950/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <span
                        className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                          isActive && videoMode === 'demo' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {chunk.time}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-bold ${isActive && videoMode === 'demo' ? 'text-amber-300' : 'text-slate-300'}`}>
                          {chunk.title}
                        </div>
                        <p className="text-[11px] line-clamp-1 text-slate-400 mt-0.5">
                          {chunk.transcript}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Conversion Card under chapters */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 text-center">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Oferta de Lançamento Ativa</span>
              </span>
              <p className="text-xs text-slate-300 mt-1 mb-4">
                Recupere o cabelo elástico de forma definitiva. Tenha o S.O.S Dyusar no seu lavatório ou em casa.
              </p>
              <button
                onClick={onOpenOrder}
                className="w-full py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-300 rounded-xl shadow-lg transition-transform active:scale-95"
              >
                Garantir S.O.S com Desconto
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
