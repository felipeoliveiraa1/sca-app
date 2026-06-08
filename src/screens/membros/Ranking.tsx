import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Crown,
  Trophy,
  Flag,
  MapPin,
  Handshake,
  Award,
  Star,
  Check,
  Gem,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Img from "@/components/Img";
import ScreenHeader from "@/components/ScreenHeader";
import SpatialBg from "@/components/SpatialBg";
import { SectionTitle, GoldDivider, Reveal, VerifiedSeal } from "@/components/ui";
import { rankingPresenca } from "@/data/members";
import { conquistas, tiers, me } from "@/data/me";

// Ícones lucide para as conquistas, mapeados por índice (ignoramos conquista.icone).
const CONQUISTA_ICONS: LucideIcon[] = [
  Trophy,
  Flag,
  MapPin,
  Handshake,
  Award,
  Star,
];

// Ordem visual do pódio: 2º (esquerda), 1º (centro), 3º (direita).
const PODIO_ORDEM = [1, 0, 2] as const;

export default function Ranking() {
  const top3 = rankingPresenca.slice(0, 3);
  const resto = rankingPresenca.slice(3, 8);

  return (
    <div className="relative min-h-full">
      <SpatialBg tint="gold" />

      <div className="relative z-10">
        <ScreenHeader title="Ranking & Status" />

        <div className="px-5 pb-10">
          {/* 1 — PÓDIO */}
          <SectionTitle eyebrow="Presença" title="Hall dos presentes" />

          <div className="grid grid-cols-3 items-end gap-3">
            {PODIO_ORDEM.map((idx, col) => {
              const m = top3[idx];
              if (!m) return <div key={col} />;
              const posicao = idx + 1;
              const primeiro = posicao === 1;
              const altura = primeiro ? "pt-7 pb-6" : posicao === 2 ? "pt-5 pb-5" : "pt-4 pb-4";
              return (
                <Reveal key={m.id} delay={col * 0.06} className="self-end">
                  <Link
                    to={`/membros/${m.id}`}
                    className={`vp-glass-soft relative flex flex-col items-center rounded-[24px] px-2.5 text-center active:scale-[0.98] ${altura} ${
                      primeiro ? "ring-1 ring-gold/40" : ""
                    }`}
                  >
                    {primeiro && (
                      <span className="absolute -top-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full vp-circle text-gold">
                        <Crown size={16} strokeWidth={2} className="text-gold" />
                      </span>
                    )}

                    <span
                      className={`mb-1 text-[11px] font-semibold ${
                        primeiro ? "text-gold" : "text-slate"
                      }`}
                    >
                      {posicao}º
                    </span>

                    <div className="relative">
                      <Img
                        src={m.avatar}
                        alt={m.nome}
                        className={`rounded-full object-cover ${
                          primeiro ? "h-[68px] w-[68px] ring-2 ring-gold/60" : "h-14 w-14 ring-1 ring-white/15"
                        }`}
                      />
                    </div>

                    <p className="mt-2 line-clamp-1 text-[13px] font-semibold leading-tight text-ice">
                      {m.nome.split(" ")[0]}
                    </p>
                    <p
                      className={`mt-0.5 font-display text-[18px] font-semibold tracking-tight ${
                        primeiro ? "text-gold" : "text-ice"
                      }`}
                    >
                      {m.edicoes}
                    </p>
                    <p className="text-[10px] text-slate">edições</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Lista 4º — 8º */}
          <div className="mt-4 space-y-2.5">
            {resto.map((m, i) => {
              const posicao = i + 4;
              return (
                <Reveal key={m.id} delay={i * 0.05}>
                  <Link
                    to={`/membros/${m.id}`}
                    className="flex items-center gap-3 rounded-[20px] vp-glass-soft p-3 active:scale-[0.99]"
                  >
                    <span className="w-6 shrink-0 text-center font-display text-[16px] font-semibold tracking-tight text-slate">
                      {posicao}
                    </span>
                    <Img
                      src={m.avatar}
                      alt={m.nome}
                      className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-[15px] font-semibold text-ice">{m.nome}</p>
                        {m.verificado && <VerifiedSeal />}
                      </div>
                      <p className="truncate text-[12px] text-slate">{m.empresa}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-[16px] font-semibold tracking-tight text-ice">
                        {m.edicoes}
                      </p>
                      <p className="text-[10px] text-slate">edições</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <GoldDivider />

          {/* 2 — CONQUISTAS */}
          <SectionTitle eyebrow="Trajetória" title="Conquistas" />

          <div className="grid grid-cols-3 gap-3">
            {conquistas.map((c, i) => {
              const Icon = CONQUISTA_ICONS[i % CONQUISTA_ICONS.length];
              const ativa = c.desbloqueada;
              return (
                <Reveal key={c.nome} delay={i * 0.05}>
                  <div
                    className={`vp-glass-soft flex h-full flex-col items-center gap-2 rounded-[20px] px-2 py-4 text-center ${
                      ativa ? "" : "opacity-40"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full vp-circle ${
                        ativa ? "text-gold" : "text-slate"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.8} className={ativa ? "text-gold" : "text-slate"} />
                    </span>
                    <span className="text-[11px] font-medium leading-tight text-ice/85">{c.nome}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <GoldDivider />

          {/* 3 — TRILHA DE TIERS */}
          <SectionTitle eyebrow="Status" title="Trilha de tiers" />

          {/* Barra de progresso decorativa */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                className="h-full rounded-full bg-gold"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold">
              <Gem size={11} strokeWidth={2.2} />
              {me.tier}
            </span>
          </div>

          <div className="space-y-3">
            {/* Tier atual (Founder) marcado como topo */}
            <Reveal>
              <div className="vp-glass relative overflow-hidden rounded-[24px] p-4 ring-1 ring-gold/40">
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">
                  <Crown size={11} strokeWidth={2.2} className="text-black" />
                  Seu tier
                </span>
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full vp-circle text-gold">
                    <Trophy size={18} strokeWidth={1.8} className="text-gold" />
                  </span>
                  <div>
                    <p className="t-title font-semibold text-ice">{me.tier}</p>
                    <p className="text-[12px] text-slate">
                      Sócio nº {me.numeroSocio} · desde {me.desde}
                    </p>
                  </div>
                </div>
                <ul className="mt-3.5 space-y-2">
                  <li className="flex items-start gap-2 text-[13px] text-ice/85">
                    <Check size={13} strokeWidth={2.6} className="mt-0.5 shrink-0 text-gold" />
                    Acesso vitalício a todas as edições e lounges
                  </li>
                  <li className="flex items-start gap-2 text-[13px] text-ice/85">
                    <Check size={13} strokeWidth={2.6} className="mt-0.5 shrink-0 text-gold" />
                    Concierge dedicado e mesa VIP permanente
                  </li>
                  <li className="flex items-start gap-2 text-[13px] text-ice/85">
                    <Check size={13} strokeWidth={2.6} className="mt-0.5 shrink-0 text-gold" />
                    Voz no conselho fundador do clube
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Demais tiers */}
            {tiers.map((t, i) => (
              <Reveal key={t.nome} delay={(i + 1) * 0.06}>
                <div className="vp-glass-soft rounded-[24px] p-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full vp-circle"
                      style={{ color: t.cor }}
                    >
                      <Award size={18} strokeWidth={1.8} style={{ color: t.cor }} />
                    </span>
                    <p className="t-title font-semibold text-ice">{t.nome}</p>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {t.beneficios.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] text-ice/80">
                        <Check size={13} strokeWidth={2.6} className="mt-0.5 shrink-0 text-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <Link
              to="/membros"
              className="mt-6 flex items-center justify-center gap-1.5 rounded-full vp-glass-soft py-3 text-[14px] font-medium text-ice/80 active:scale-[0.99]"
            >
              Ver diretório de membros
              <ChevronRight size={16} className="text-slate" />
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
