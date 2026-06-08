import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { stories } from "@/data/content";
import Img from "./Img";
import Portal from "./Portal";

const DURACAO = 4; // segundos por story

export default function StoryBar() {
  const [active, setActive] = useState<number | null>(null);

  const avancar = () =>
    setActive((a) => (a === null ? null : a + 1 >= stories.length ? null : a + 1));
  const voltar = () => setActive((a) => (a === null ? null : Math.max(0, a - 1)));

  return (
    <>
      <div className="no-scrollbar flex gap-3.5 overflow-x-auto px-5 py-3">
        {stories.map((s, i) => (
          <button key={s.id} onClick={() => setActive(i)} className="flex w-16 shrink-0 flex-col items-center gap-1.5">
            <span className={`rounded-full p-[2px] ${s.fundador ? "bg-gold" : "bg-white/25"}`}>
              <span className="block rounded-full border-2 border-black p-[2px]">
                <Img src={s.capa} alt={s.titulo} className="h-14 w-14 rounded-full object-cover" />
              </span>
            </span>
            <span className="line-clamp-1 text-center text-[10px] text-ice/60">{s.titulo}</span>
          </button>
        ))}
      </div>

      <Portal>
        <AnimatePresence>
          {active !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] mx-auto max-w-[460px] overflow-hidden bg-black"
            >
              {/* Imagem */}
              <Img src={stories[active].capa} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

              {/* Barras de progresso */}
              <div className="absolute left-3 right-3 top-4 z-20 flex gap-1">
                {stories.map((_, i) => (
                  <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
                    {i < active && <div className="h-full w-full bg-white" />}
                    {i === active && (
                      <motion.div
                        key={active}
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: DURACAO, ease: "linear" }}
                        onAnimationComplete={avancar}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Cabeçalho do story */}
              <div className="absolute inset-x-0 top-9 z-20 flex items-center gap-2.5 px-4">
                <Img src={stories[active].capa} alt="" className="h-8 w-8 rounded-full border border-white/40 object-cover" />
                <span className="text-[13px] font-semibold text-ice drop-shadow">SCA</span>
                <button
                  onClick={() => setActive(null)}
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-ice backdrop-blur-md active:scale-90"
                  aria-label="Fechar"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>

              {/* Zonas de toque: esquerda = anterior, direita = próximo */}
              <button className="absolute inset-y-0 left-0 z-10 w-1/3" onClick={voltar} aria-label="Anterior" />
              <button className="absolute inset-y-0 right-0 z-10 w-2/3" onClick={avancar} aria-label="Próximo" />

              {/* Legenda */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 pb-12">
                {stories[active].fundador && <p className="label-eyebrow mb-1">Mensagem do fundador</p>}
                <p className="t-headline text-ice">{stories[active].titulo}</p>
                {stories[active].fundador && (
                  <p className="mt-2 max-w-[85%] text-sm text-ice/75">
                    “Bem-vindo ao SCA. Aqui, sua paixão por carros e por negócios anda lado a lado. Aproveite cada conexão.” — Dr. José Silva
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
