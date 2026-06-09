import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Apple, Smartphone, ArrowRight, ChevronLeft } from "lucide-react";
import { LOGO_SCA, HERO_LAMBO } from "@/data/assets";
import Img from "./Img";

export default function Welcome({ onEnter }: { onEnter: (nome: string) => void }) {
  const [step, setStep] = useState<"login" | "nome">("login");
  const [nome, setNome] = useState("");

  return (
    <motion.div
      className="absolute inset-0 z-[95] flex flex-col overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fundo: Lamborghini tratada em preto + brilho dourado */}
      <Img src={HERO_LAMBO} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_42%] grayscale brightness-[0.82] contrast-[1.12]" />
      {/* escurece topo (logo) e base (botões), deixa o carro visível no meio */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/95" />
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/30 blur-[120px]" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* Topo: marca */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
        <motion.img
          src={LOGO_SCA}
          alt="Super Carros Alphaville"
          className="h-7 w-auto drop-shadow-[0_2px_16px_rgba(212,175,55,0.3)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        />
        <p className="mt-3 text-[11px] uppercase tracking-[0.45em] text-gold/70">Business & Lifestyle</p>
      </div>

      {/* Base: card de acesso */}
      <div className="relative z-10 px-6 pb-12">
        <AnimatePresence mode="wait">
          {step === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="t-headline text-ice">Bem-vindo ao clube.</h1>
              <p className="mt-1.5 text-[15px] text-ice/60">Acesso exclusivo para membros.</p>

              <div className="mt-6 space-y-2.5">
                <button onClick={() => setStep("nome")} className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[16px] font-medium text-black active:scale-[0.98]">
                  <Apple size={18} /> Entrar com Apple
                </button>
                <button onClick={() => setStep("nome")} className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 text-[16px] font-medium text-ice active:scale-[0.98]">
                  <Smartphone size={17} /> Entrar com telefone
                </button>
              </div>

              <div className="my-4 flex items-center gap-3 text-[12px] text-slate">
                <span className="h-px flex-1 bg-white/10" /> ou <span className="h-px flex-1 bg-white/10" />
              </div>

              <button onClick={() => setStep("nome")} className="btn-gold w-full">
                Entrar como convidado <ArrowRight size={16} />
              </button>
              <p className="mt-4 text-center text-[11px] text-slate">
                É uma prévia — qualquer opção entra na demonstração.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="nome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button onClick={() => setStep("login")} className="mb-3 flex items-center gap-1 text-[13px] text-slate">
                <ChevronLeft size={16} /> Voltar
              </button>
              <h1 className="t-headline text-ice">Como prefere ser chamado?</h1>
              <p className="mt-1.5 text-[15px] text-ice/60">Vamos personalizar sua experiência no SCA.</p>

              <input
                autoFocus
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && nome.trim() && onEnter(nome)}
                placeholder="Seu nome"
                className="mt-5 w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[17px] text-ice placeholder:text-slate focus:border-gold/50 focus:outline-none"
              />

              <button
                onClick={() => nome.trim() && onEnter(nome)}
                disabled={!nome.trim()}
                className="btn-gold mt-4 w-full disabled:opacity-40"
              >
                Entrar no clube <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
