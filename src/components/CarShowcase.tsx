import { motion } from "framer-motion";
import { Calendar, Gauge, ShieldCheck } from "lucide-react";
import Img from "./Img";
import type { Car } from "@/data/types";

/** Cinematic card for a single supercar — clean, Apple-style. */
export function CarSpotlight({ car }: { car: Car }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[22px] bg-ink-700"
    >
      <div className="relative aspect-[16/10] w-full">
        <Img src={car.img} alt={`${car.marca} ${car.modelo}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {car.categoria && <span className="absolute right-3 top-3 chip">{car.categoria}</span>}
      </div>
      <div className="p-5">
        <p className="text-[13px] font-medium text-slate">{car.marca}</p>
        <h3 className="t-title mt-0.5 text-ice">{car.modelo}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
          <span className="chip"><Calendar size={12} /> {car.ano}</span>
          <span className="chip"><Gauge size={12} /> {car.potencia}</span>
        </div>
        {car.selos && car.selos.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
            {car.selos.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 text-[12px] text-gold">
                <ShieldCheck size={13} /> {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/** Horizontal snap carousel of spotlight cards. */
export function CarGarage({ cars }: { cars: Car[] }) {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
      {cars.map((car, i) => (
        <div key={i} className="w-[85%] shrink-0 snap-center">
          <CarSpotlight car={car} />
        </div>
      ))}
    </div>
  );
}

/** Compact grid card for the confirmed-cars grid. */
export function CarGridCard({ car, dono }: { car: Car; dono?: string }) {
  return (
    <div className="overflow-hidden rounded-[18px] bg-ink-700">
      <div className="relative aspect-[4/3]">
        <Img src={car.img} alt={car.modelo} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
        {car.categoria === "JDM" && <span className="absolute left-2 top-2 chip">JDM</span>}
        <div className="absolute bottom-2.5 left-3 right-3">
          <p className="text-[11px] font-medium text-slate">{car.marca}</p>
          <p className="truncate text-[15px] font-semibold text-ice">{car.modelo}</p>
          {dono && <p className="truncate text-[11px] text-slate">{dono}</p>}
        </div>
      </div>
    </div>
  );
}
