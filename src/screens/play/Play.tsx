import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Play as PlayIcon, Clock, Headphones, X, Mic, Camera, type LucideIcon } from "lucide-react";
import Img from "@/components/Img";
import SpatialBg from "@/components/SpatialBg";
import { SectionTitle, Reveal } from "@/components/ui";
import { GALLERY } from "@/data/assets";
import { episodes, canais } from "@/data/content";
import type { Episode } from "@/data/types";

const destaque: Episode = episodes.find((e) => e.destaque) ?? episodes[0];

function iconePorCanal(nome: string): LucideIcon {
  const n = nome.toLowerCase();
  if (n.includes("youtube")) return PlayIcon;
  if (n.includes("instagram")) return Camera;
  return Mic;
}

export default function Play() {
  const [tocando, setTocando] = useState<Episode | null>(null);
  const [progresso, setProgresso] = useState(28);

  // Barra de progresso fake: avança suavemente enquanto há episódio "tocando".
  useEffect(() => {
    if (!tocando) return;
    setProgresso(8);
    const id = window.setInterval(() => {
      setProgresso((p) => (p >= 100 ? 8 : p + 1));
    }, 600);
    return () => window.clearInterval(id);
  }, [tocando]);

  return (
    <div className="relative min-h-full">
      <SpatialBg image={episodes[0].capa} tint="dual" />

      <div className="relative z-10 px-5 pb-32 pt-6">
        {/* Header */}
        <Reveal>
          <h1 className="t-headline text-ice">SCA Play</h1>
          <p className="mt-2 text-[15px] text-slate">Podcast Super Carros Alphaville</p>
        </Reveal>

        {/* Episódio em destaque */}
        <Reveal delay={0.06} className="mt-7">
          <button
            onClick={() => setTocando(destaque)}
            className="vp-glass block w-full overflow-hidden rounded-[28px] p-3 text-left transition active:scale-[0.99]"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-[22px]">
              <Img src={destaque.capa} alt={destaque.titulo} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <span className="vp-glass absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-ice">
                <Flame size={12} strokeWidth={2} className="text-gold" />
                Em alta
              </span>
              <span className="absolute bottom-3 right-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black shadow-lg shadow-black/40">
                <PlayIcon size={22} strokeWidth={2.4} className="ml-0.5" fill="currentColor" />
              </span>
            </div>

            <div className="px-2 pb-1 pt-4">
              <h2 className="t-title text-ice line-clamp-2">{destaque.titulo}</h2>
              <p className="mt-2 text-[13px] text-slate">
                {destaque.convidado} · {destaque.papelConvidado}
              </p>
              <div className="mt-3 flex items-center gap-4 text-[12px] text-slate">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={12} strokeWidth={1.8} />
                  {destaque.duracao}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Headphones size={12} strokeWidth={1.8} />
                  {destaque.views}
                </span>
              </div>
            </div>
          </button>
        </Reveal>

        {/* Lista de episódios */}
        <div className="mt-10">
          <SectionTitle eyebrow="Catálogo" title="Episódios" />
          <div className="space-y-3">
            {episodes.map((ep, i) => {
              const ativo = tocando?.id === ep.id;
              return (
                <Reveal key={ep.id} delay={i * 0.05}>
                  <button
                    onClick={() => setTocando(ep)}
                    className={`flex w-full items-center gap-3 rounded-[22px] p-3 text-left transition active:scale-[0.99] ${
                      ativo ? "vp-glass" : "vp-glass-soft"
                    }`}
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                      <Img src={ep.capa} alt={ep.titulo} className="h-full w-full object-cover" />
                      {ativo && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/45">
                          <span className="h-2 w-2 rounded-full bg-gold" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[14px] font-semibold leading-snug text-ice line-clamp-2">
                        {ep.titulo}
                      </h3>
                      <p className="mt-1 truncate text-[12px] text-slate">{ep.convidado}</p>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate">
                        <Clock size={11} strokeWidth={1.8} />
                        <span>{ep.duracao}</span>
                      </div>
                    </div>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        ativo ? "bg-gold text-black" : "vp-circle text-ice"
                      }`}
                    >
                      <PlayIcon size={16} strokeWidth={2.2} className="ml-0.5" fill="currentColor" />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Galeria HD */}
        <div className="mt-10">
          <SectionTitle eyebrow="Bastidores" title="Galeria HD" />
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GALLERY.map((src, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="relative h-40 w-32 shrink-0 overflow-hidden rounded-2xl border border-white/[0.1]">
                  <Img src={src} alt={`Galeria ${i + 1}`} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="label-eyebrow absolute bottom-2 left-2.5 text-ice/80">HD</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Nossos canais */}
        <div className="mt-10">
          <SectionTitle eyebrow="Onde assistir" title="Nossos canais" />
          <div className="space-y-3">
            {canais.map((canal, i) => {
              const Icone = iconePorCanal(canal.nome);
              return (
                <Reveal key={canal.nome} delay={i * 0.05}>
                  <div className="vp-glass-soft flex items-center gap-3 rounded-[22px] p-4">
                    <span className="vp-circle flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                      <Icone size={18} strokeWidth={1.8} className="text-ice" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold text-ice">{canal.nome}</p>
                      <p className="truncate text-[12px] text-slate">{canal.handle}</p>
                    </div>
                    <span className="shrink-0 text-right text-[11px] font-medium text-slate">
                      {canal.metrica}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mini-player fixo na base do frame */}
      <AnimatePresence>
        {tocando && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="absolute inset-x-3 bottom-3 z-30"
          >
            <div className="vp-glass overflow-hidden rounded-[24px]">
              <div className="flex items-center gap-3 p-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl">
                  <Img src={tocando.capa} alt={tocando.titulo} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Tocando agora
                  </p>
                  <p className="mt-0.5 truncate text-[14px] font-semibold text-ice">{tocando.titulo}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-black">
                  <PlayIcon size={16} strokeWidth={2.2} className="ml-0.5" fill="currentColor" />
                </span>
                <button
                  onClick={() => setTocando(null)}
                  className="vp-circle flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ice transition active:scale-90"
                  aria-label="Fechar player"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>
              {/* Barra de progresso fake */}
              <div className="h-1 w-full bg-white/10">
                <motion.div
                  className="h-full bg-gold"
                  animate={{ width: `${progresso}%` }}
                  transition={{ ease: "linear", duration: 0.6 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
