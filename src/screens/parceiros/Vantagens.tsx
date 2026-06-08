import { useState } from "react";
import { Gift, Flame, Clock, Gem, QrCode, ShieldCheck } from "lucide-react";
import type { Benefit } from "@/data/types";
import { benefits } from "@/data/partners";
import SpatialBg from "@/components/SpatialBg";
import ScreenHeader from "@/components/ScreenHeader";
import Sheet from "@/components/Sheet";
import QRTag from "@/components/QRTag";
import { Reveal } from "@/components/ui";

export default function Vantagens() {
  const [aberto, setAberto] = useState<Benefit | null>(null);

  return (
    <div className="relative min-h-full">
      <SpatialBg tint="gold" />

      <div className="relative z-10">
        <ScreenHeader title="Clube de Vantagens" subtitle="Seus benefícios SCA" back />

        <div className="px-5 pb-10">
          {/* Banner */}
          <Reveal>
            <div className="vp-glass flex items-center gap-4 rounded-[26px] p-5">
              <div className="vp-circle flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px]">
                <Gift size={24} strokeWidth={1.8} className="text-gold" />
              </div>
              <div className="min-w-0">
                <p className="label-eyebrow">Concierge SCA</p>
                <h2 className="t-title mt-1 leading-tight text-ice">
                  Benefícios que pagam sua associação
                </h2>
              </div>
            </div>
          </Reveal>

          {/* Lista de benefícios */}
          <div className="mt-6 space-y-3.5">
            {benefits.map((b, i) => {
              const diamante = b.categoria === "Diamante";
              return (
                <Reveal key={b.id} delay={i * 0.05}>
                  <div
                    className={`vp-glass-soft rounded-[24px] p-5 ${
                      b.relampago ? "border border-ember/40" : ""
                    }`}
                  >
                    {/* Topo: parceiro + categoria / relâmpago */}
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-slate">
                        {b.parceiro}
                      </p>
                      {b.relampago ? (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-ember/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ember">
                          <Flame size={13} strokeWidth={1.8} className="text-ember" />
                          Relâmpago
                        </span>
                      ) : (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate">
                          {diamante && (
                            <Gem size={12} strokeWidth={1.8} className="text-gold" />
                          )}
                          {b.categoria}
                        </span>
                      )}
                    </div>

                    <h3 className="t-title mt-2 leading-tight text-ice">{b.titulo}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate">
                      {b.descricao}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-slate">
                        <Clock size={12} strokeWidth={1.8} className="text-slate" />
                        {b.validade}
                      </span>
                      <button
                        onClick={() => setAberto(b)}
                        className="btn-gold !px-5 !py-2.5 !text-[14px]"
                      >
                        <QrCode size={16} strokeWidth={2} />
                        Resgatar
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Voucher */}
      <Sheet open={aberto !== null} onClose={() => setAberto(null)} title="Voucher SCA">
        {aberto && (
          <div className="pb-2">
            <div className="mx-auto mt-2 flex w-fit items-center justify-center rounded-[26px] bg-white p-5 shadow-2xl">
              <QRTag value={"SCA-BENEFIT-" + aberto.id} size={180} color="#0A0A0A" bg="#ffffff" />
            </div>

            <div className="mt-6 text-center">
              <p className="label-eyebrow">{aberto.parceiro}</p>
              <h3 className="t-title mt-1.5 leading-tight text-ice">{aberto.titulo}</h3>
              <p className="mt-2 inline-flex items-center justify-center gap-1.5 text-[12px] text-slate">
                <Clock size={12} strokeWidth={1.8} className="text-slate" />
                {aberto.validade}
              </p>
            </div>

            <div className="vp-glass-soft mt-6 flex items-center gap-3 rounded-[20px] px-4 py-3.5">
              <ShieldCheck size={18} strokeWidth={1.8} className="shrink-0 text-[#2997ff]" />
              <p className="text-[13px] leading-snug text-slate">
                Apresente este código no parceiro.
              </p>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
