import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Trophy, X, Image as ImageIcon } from "lucide-react";
import { edicoesById, proximaEdicao } from "@/data/editions";
import { GALLERY, carImg } from "@/data/assets";
import Img from "@/components/Img";
import SpatialBg from "@/components/SpatialBg";
import ScreenHeader from "@/components/ScreenHeader";
import Portal from "@/components/Portal";

type Frame = { src: string; h: number; legenda: string };

// Pool variado: fotos oficiais do SCA + supercarros (sem repetir lado a lado).
const POOL = [
  GALLERY[0], carImg(3), GALLERY[1], carImg(5), GALLERY[2], carImg(10),
  GALLERY[3], carImg(0), GALLERY[4], carImg(7), carImg(13), carImg(2),
];
const LEGENDAS = [
  "Chegada ao pátio", "A fera do dia", "Pôr do sol entre hipercarros",
  "Detalhe em fibra de carbono", "Lounge dos parceiros", "V12 em ignição",
  "Encontro de gerações", "Pintura sob medida", "Ambiente do evento",
  "Faróis acesos", "Linha de largada", "Despedida noturna",
];
const ALTURAS = [240, 176, 208, 264, 184, 224, 200, 256, 192, 232, 180, 216];

const frames: Frame[] = POOL.map((src, i) => ({
  src,
  h: ALTURAS[i % ALTURAS.length],
  legenda: LEGENDAS[i % LEGENDAS.length],
}));

// Distribui em 2 colunas (masonry confiável, sem CSS columns).
const colunas: Frame[][] = [[], []];
frames.forEach((f, i) => colunas[i % 2].push(f));
const indexOf = (f: Frame) => frames.indexOf(f);

export default function Galeria() {
  const { id } = useParams();
  const edicao = (id && edicoesById[id]) || proximaEdicao;
  const [aberta, setAberta] = useState<number | null>(null);
  const fotoAberta = aberta !== null ? frames[aberta] : null;

  return (
    <div className="relative min-h-full">
      <SpatialBg tint="gold" />

      <div className="relative z-10">
        <ScreenHeader title="Galeria" subtitle={`${edicao.numero}ª · ${edicao.cidade}`} back />

        <div className="px-5 pb-10">
          {/* Capa */}
          <div className="relative overflow-hidden rounded-[26px] vp-glass">
            <Img src={edicao.capa} alt={edicao.titulo} className="h-56 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="label-eyebrow">Galeria pós-evento</p>
              <h2 className="t-title mt-1 leading-tight text-ice">{edicao.local}</h2>
              {edicao.vencedorCarroDoDia && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full vp-glass-soft px-3 py-1.5">
                  <Trophy size={14} strokeWidth={1.8} className="text-gold" />
                  <span className="text-[10px] uppercase tracking-wider text-slate">Carro do dia</span>
                  <span className="text-[13px] font-semibold text-ice">{edicao.vencedorCarroDoDia}</span>
                </div>
              )}
            </div>
          </div>

          {/* Resumo */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-[20px] vp-glass-soft p-4 text-center">
              <p className="font-display text-[34px] font-semibold tracking-tight text-ice">{edicao.carrosConfirmados}</p>
              <p className="mt-0.5 text-[12px] text-slate">no pátio</p>
            </div>
            <div className="rounded-[20px] vp-glass-soft p-4 text-center">
              <p className="font-display text-[34px] font-semibold tracking-tight text-ice">{edicao.membrosConfirmados}</p>
              <p className="mt-0.5 text-[12px] text-slate">presentes</p>
            </div>
          </div>

          {/* Cabeçalho */}
          <div className="mb-3 mt-7 flex items-center gap-2">
            <ImageIcon size={16} strokeWidth={1.8} className="text-slate" />
            <p className="label-eyebrow">{frames.length} registros</p>
          </div>

          {/* Masonry em 2 colunas */}
          <div className="flex gap-3">
            {colunas.map((col, c) => (
              <div key={c} className="flex flex-1 flex-col gap-3">
                {col.map((frame) => {
                  const idx = indexOf(frame);
                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx, 8) * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setAberta(idx)}
                      className="group relative block w-full overflow-hidden rounded-2xl active:scale-[0.98]"
                      style={{ height: frame.h }}
                    >
                      <Img src={frame.src} alt={frame.legenda} className="h-full w-full object-cover transition-transform duration-700 group-active:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <p className="absolute inset-x-0 bottom-0 p-3 text-left text-[11px] font-medium text-ice/90">{frame.legenda}</p>
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visualizador fullscreen */}
      <Portal>
      <AnimatePresence>
        {fotoAberta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setAberta(null)}
            className="fixed inset-0 z-[90] mx-auto flex max-w-[460px] flex-col items-center justify-center bg-black/95 px-4"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setAberta(null); }}
              className="absolute right-4 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full vp-circle text-ice active:scale-90"
              aria-label="Fechar"
            >
              <X size={20} strokeWidth={1.8} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="flex w-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Img src={fotoAberta.src} alt={fotoAberta.legenda} className="max-h-[76vh] w-full rounded-2xl object-contain" />
              <p className="mt-4 text-center text-[14px] text-ice/80">{fotoAberta.legenda}</p>
            </motion.div>
            <p className="absolute inset-x-0 bottom-8 text-center text-[11px] uppercase tracking-wider text-slate">Toque para fechar</p>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </div>
  );
}
