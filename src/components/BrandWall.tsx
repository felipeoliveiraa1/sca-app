import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import { partners } from "@/data/partners";

/** Wall of Brands: partner monograms light up in sequence on clean dark tiles. */
export default function BrandWall() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {partners.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.2 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 12) * 0.06, duration: 0.5 }}
          className="relative flex aspect-square flex-col items-center justify-center rounded-[18px] bg-ink-700 p-2"
        >
          <span className="text-[22px] font-semibold tracking-tight text-ice/90">{p.logo}</span>
          <span className="mt-1 line-clamp-1 px-1 text-center text-[9px] text-slate">{p.nome}</span>
          {p.categoria === "Diamante" && (
            <Gem size={11} className="absolute right-2 top-2 text-gold" strokeWidth={2.2} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
