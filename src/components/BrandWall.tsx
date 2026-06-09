import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gem, Gift, Car, Hand } from "lucide-react";
import { partners } from "@/data/partners";
import type { Partner } from "@/data/types";
import Sheet from "./Sheet";

/** Wall of Brands: partner monograms light up in sequence on clean dark tiles.
 *  Tapping a brand opens its profile (category, story, member benefit, activation). */
export default function BrandWall() {
  const [sel, setSel] = useState<Partner | null>(null);
  const ehConcessionaria = sel?.setor.toLowerCase().includes("concessionária");

  return (
    <>
      <p className="mb-3 flex items-center gap-1.5 text-[13px] text-slate">
        <Hand size={14} className="text-gold" /> Toque numa marca para ver os benefícios e ativações.
      </p>

      <div className="grid grid-cols-3 gap-2.5">
        {partners.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 12) * 0.06, duration: 0.5 }}
            onClick={() => setSel(p)}
            className="relative flex aspect-square flex-col items-center justify-center rounded-[18px] bg-ink-700 p-2 active:scale-95"
          >
            <span className="text-[22px] font-semibold tracking-tight text-ice/90">{p.logo}</span>
            <span className="mt-1 line-clamp-1 px-1 text-center text-[9px] text-slate">{p.nome}</span>
            {p.categoria === "Diamante" && <Gem size={11} className="absolute right-2 top-2 text-gold" strokeWidth={2.2} />}
          </motion.button>
        ))}
      </div>

      <Sheet open={!!sel} onClose={() => setSel(null)} title={sel?.nome}>
        {sel && (
          <div className="pb-2">
            <div className="flex items-center gap-3">
              <span
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold"
                style={{ background: "rgba(255,255,255,0.06)", color: sel.cor }}
              >
                {sel.logo}
              </span>
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold">
                  {sel.categoria === "Diamante" && <Gem size={11} strokeWidth={2.2} />}
                  Parceiro {sel.categoria}
                </span>
                <p className="mt-1 text-[13px] text-slate">{sel.setor}</p>
              </div>
            </div>

            <p className="mt-4 text-[14px] leading-relaxed text-ice/80">{sel.story}</p>

            <div className="mt-4 rounded-2xl border border-gold/25 bg-gold/[0.06] p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold/80">
                <Gift size={13} /> Benefício para membros
              </p>
              <p className="mt-1 text-[14px] text-ice">{sel.beneficio}</p>
            </div>

            <div className="mt-5 space-y-2.5">
              <Link to="/vantagens" onClick={() => setSel(null)} className="btn-gold w-full">
                <Gift size={16} /> Ver no Clube de Vantagens
              </Link>
              {ehConcessionaria && (
                <button onClick={() => setSel(null)} className="btn-ghost w-full">
                  <Car size={16} /> Agendar test-drive
                </button>
              )}
            </div>
          </div>
        )}
      </Sheet>
    </>
  );
}
