import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, MapPin, Quote, UserPlus, CheckCircle2 } from "lucide-react";
import { membersById } from "@/data/members";
import Img from "@/components/Img";
import SpatialBg from "@/components/SpatialBg";
import Sheet from "@/components/Sheet";
import { CarGarage } from "@/components/CarShowcase";
import { SectionTitle, Stat, Reveal, TierBadge, VerifiedSeal } from "@/components/ui";

export default function MembroPerfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const m = id ? membersById[id] : undefined;
  const [convite, setConvite] = useState(false);

  // Estado vazio: membro não encontrado
  if (!m) {
    return (
      <div className="relative min-h-full">
        <SpatialBg tint="dual" />
        <div className="relative z-10 px-5 pb-10 pt-16">
          <button
            onClick={() => navigate(-1)}
            className="vp-circle mb-6 flex h-10 w-10 items-center justify-center text-ice active:scale-90"
          >
            <ChevronLeft size={20} strokeWidth={1.8} />
          </button>
          <div className="vp-glass rounded-[28px] p-8 text-center">
            <p className="t-title font-semibold text-ice">Membro não encontrado</p>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              Este perfil não faz parte do círculo SCA ou foi removido.
            </p>
            <button onClick={() => navigate(-1)} className="btn-gold mt-6">
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const primeiroNome = m.nome.split(" ")[0];
  const heroCar = m.carros[0];

  return (
    <div className="relative min-h-full">
      <SpatialBg tint="dual" />

      {/* HERO full-bleed cinematográfico */}
      <div className="relative">
        <Img
          src={heroCar?.img ?? ""}
          alt={`${m.nome} — garagem`}
          className="h-72 w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink-fade" />

        <button
          onClick={() => navigate(-1)}
          className="vp-circle absolute left-4 top-12 z-20 flex h-10 w-10 items-center justify-center text-ice active:scale-90"
        >
          <ChevronLeft size={20} strokeWidth={1.8} />
        </button>
      </div>

      {/* Conteúdo sobre o spatial bg */}
      <div className="relative z-10 px-5 pb-12">
        {/* Identidade — avatar sobreposto ao hero */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative -mt-10 shrink-0"
          >
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <Img src={m.avatar} alt={m.nome} className="h-full w-full object-cover" />
            </div>
          </motion.div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            <h1 className="t-headline text-ice">{m.nome}</h1>
            {m.verificado && <VerifiedSeal className="shrink-0" />}
          </div>

          <div className="mt-2">
            <TierBadge tier={m.tier} />
          </div>

          <p className="mt-2.5 text-sm text-ice">
            {m.cargo} · {m.empresa}
          </p>
          <p className="mt-1 flex items-center justify-center gap-1 text-[13px] text-slate">
            <MapPin size={14} strokeWidth={1.8} className="text-slate" />
            {m.cidade} · {m.estado}
          </p>
          <p className="mt-1 text-[12px] text-slate">Membro desde {m.desde}</p>
        </div>

        {/* Stats em 3 colunas */}
        <Reveal delay={0.05} className="mt-6">
          <div className="vp-glass-soft grid grid-cols-3 gap-2 rounded-[24px] p-5">
            <Stat value={String(m.edicoes)} label="Edições" />
            <div className="border-x border-white/10">
              <Stat value={String(m.carros.length)} label="Carros" />
            </div>
            <Stat value={m.setor} label="Setor" />
          </div>
        </Reveal>

        {/* Bio */}
        <Reveal delay={0.1} className="mt-4">
          <div className="vp-glass-soft rounded-[24px] p-5">
            <div className="flex items-center gap-2">
              <span className="vp-circle flex h-8 w-8 items-center justify-center">
                <Quote size={15} strokeWidth={1.8} className="text-gold" />
              </span>
              <p className="label-eyebrow">Sobre</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ice">{m.bio}</p>
          </div>
        </Reveal>

        {/* Garagem */}
        <Reveal delay={0.15} className="mt-8">
          <SectionTitle eyebrow="Coleção particular" title="Garagem" />
        </Reveal>
        <div className="-mx-5">
          <CarGarage cars={m.carros} />
        </div>

        {/* Ação: conectar */}
        <Reveal delay={0.1} className="mt-8">
          <button
            onClick={() => setConvite(true)}
            className="btn-gold flex w-full items-center justify-center gap-2 py-4 text-base"
          >
            <UserPlus size={18} strokeWidth={1.8} />
            Conectar com {primeiroNome}
          </button>
          <p className="mt-2.5 text-center text-[11px] text-slate">
            Conexões são privadas e exclusivas ao círculo SCA.
          </p>
        </Reveal>
      </div>

      {/* Sheet de confirmação */}
      <Sheet open={convite} onClose={() => setConvite(false)}>
        <div className="flex flex-col items-center py-2 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="relative mb-5 mt-2"
          >
            <div className="pointer-events-none absolute inset-0 -m-4 rounded-full bg-gold/15 blur-2xl" />
            <span className="vp-circle relative flex h-20 w-20 items-center justify-center">
              <CheckCircle2 size={38} strokeWidth={1.8} className="text-gold" />
            </span>
          </motion.div>

          <p className="label-eyebrow">SCA · Networking</p>
          <h3 className="t-title mt-1.5 font-semibold text-ice">Convite enviado</h3>
          <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-slate">
            Seu convite chegou a {m.nome}. Quando aceito, vocês ganham acesso direto e o
            histórico de edições em comum.
          </p>

          <div className="vp-glass-soft mt-6 flex w-full items-center gap-3 rounded-[20px] p-3 text-left">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gold/40">
              <Img src={m.avatar} alt={m.nome} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ice">{m.nome}</p>
              <p className="truncate text-[12px] text-slate">
                {m.cargo} · {m.empresa}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold">
              Pendente
            </span>
          </div>

          <button onClick={() => setConvite(false)} className="btn-ghost mt-6 w-full">
            Concluir
          </button>
        </div>
      </Sheet>
    </div>
  );
}
