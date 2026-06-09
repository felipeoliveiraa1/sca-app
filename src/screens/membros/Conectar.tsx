import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, CheckCircle2, ScanLine, X } from "lucide-react";
import Img from "@/components/Img";
import QRTag from "@/components/QRTag";
import SpatialBg from "@/components/SpatialBg";
import ScreenHeader from "@/components/ScreenHeader";
import Portal from "@/components/Portal";
import { Reveal, TierBadge, VerifiedSeal } from "@/components/ui";
import { me } from "@/data/me";
import { members } from "@/data/members";

export default function Conectar() {
  const [conectado, setConectado] = useState(false);
  const alvo = members[5];

  function simularConexao() {
    if (typeof navigator !== "undefined") {
      (navigator as any).vibrate?.(60);
    }
    setConectado(true);
  }

  return (
    <div className="relative min-h-full">
      <SpatialBg tint="dual" />

      <div className="relative z-10 px-5 pb-10 pt-6">
        <ScreenHeader title="Conectar" subtitle="Troca de contato presencial" back />

        {/* Chamada central */}
        <Reveal delay={0.05}>
          <div className="mt-2 text-center">
            <p className="t-title font-semibold text-ice">Aproxime para Conectar</p>
            <p className="mx-auto mt-2 max-w-[280px] text-[13px] leading-relaxed text-slate">
              Peça para outro membro escanear o seu código — ou aponte a câmera para o dele.
            </p>
          </div>
        </Reveal>

        {/* QR teatral com anel dourado pulsante */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-9 flex h-[296px] w-[296px] items-center justify-center">
            {/* Anéis dourados pulsantes */}
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-[40px] border border-gold/60"
              animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              aria-hidden
              className="absolute inset-3 rounded-[34px] border border-gold/35"
              animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Quadro branco com o QR */}
            <motion.div
              className="relative z-10 rounded-[28px] bg-white p-5 shadow-2xl shadow-gold/10"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <QRTag value="SCA-CONNECT-001" size={210} color="#0A0A0A" bg="#ffffff" />
            </motion.div>
          </div>
        </Reveal>

        {/* Status de aproximação */}
        <Reveal delay={0.15}>
          <p className="label-eyebrow mt-7 flex items-center justify-center gap-2 text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulseDot" />
            Aguardando aproximação
          </p>
        </Reveal>

        {/* Credencial resumida do membro logado */}
        <Reveal delay={0.2}>
          <div className="vp-glass mt-8 flex items-center gap-4 rounded-[24px] p-4">
            <div className="relative shrink-0">
              <Img
                src={me.avatar}
                alt={me.nome}
                className="h-14 w-14 rounded-full object-cover ring-1 ring-gold/40"
              />
              <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-black text-[10px] font-semibold text-gold ring-1 ring-gold/40">
                {me.numeroSocio}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-[15px] font-semibold text-ice">{me.nome}</p>
                {me.verificado && <VerifiedSeal className="h-4 w-4 shrink-0" />}
              </div>
              <p className="mt-0.5 truncate text-[12px] text-slate">
                Membro {me.numeroSocio} · {me.empresa}
              </p>
            </div>
            <TierBadge tier={me.tier} />
          </div>
        </Reveal>

        {/* Ação */}
        <Reveal delay={0.25}>
          <button onClick={simularConexao} className="btn-gold mt-6 flex w-full items-center justify-center gap-2">
            <Share2 size={18} strokeWidth={1.8} />
            Simular conexão
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate">
            <ScanLine size={13} strokeWidth={1.8} className="text-slate" />
            Contato trocado apenas na presença física
          </p>
        </Reveal>
      </div>

      {/* Animação de sucesso */}
      <Portal>
      <AnimatePresence>
        {conectado && (
          <motion.div
            className="pointer-events-auto absolute inset-0 z-[90] flex flex-col items-center justify-center bg-black/85 px-8 text-center backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConectado(false)}
          >
            {/* Avatares unidos */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className="relative"
            >
              <div className="flex items-center justify-center -space-x-4">
                <Img
                  src={me.avatar}
                  alt={me.nome}
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-gold/70"
                />
                <Img
                  src={alvo.avatar}
                  alt={alvo.nome}
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-gold/70"
                />
              </div>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 -m-6 rounded-full border border-gold/50"
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="mt-8 flex flex-col items-center"
            >
              <CheckCircle2 size={40} strokeWidth={1.6} className="text-gold" />
              <p className="t-title mt-3 font-semibold text-ice">
                Você e {alvo.nome.split(" ")[0]} estão conectados!
              </p>
              <p className="mt-2 max-w-[260px] text-[13px] leading-relaxed text-slate">
                <span className="text-ice">{alvo.nome}</span> agora faz parte da sua rede SCA.
              </p>
              <p className="mt-1 text-[12px] text-slate">
                {alvo.cargo} · {alvo.empresa}
              </p>
            </motion.div>

            <button
              onClick={() => setConectado(false)}
              className="mt-8 flex items-center gap-1.5 rounded-full bg-white/[0.08] px-5 py-2 text-[13px] font-medium text-ice"
            >
              <X size={15} strokeWidth={1.8} />
              Concluir
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </div>
  );
}
