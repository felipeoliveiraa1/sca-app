import { useState } from "react";
import { Sparkles, Car, Plus, Trophy } from "lucide-react";
import SpatialBg from "@/components/SpatialBg";
import ScreenHeader from "@/components/ScreenHeader";
import Sheet from "@/components/Sheet";
import KpiCounter from "@/components/KpiCounter";
import { CarGarage, CarSpotlight } from "@/components/CarShowcase";
import { Reveal, SectionTitle } from "@/components/ui";
import { me, minhaGaragem } from "@/data/me";

export default function Garagem() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-full">
      <SpatialBg tint="gold" />
      <div className="relative z-10 px-5 pb-10">
        <ScreenHeader title="Minha Garagem" subtitle={me.nome} />

        {/* Banner de prestígio */}
        <Reveal>
          <div className="vp-glass mt-1 grid grid-cols-2 gap-3 rounded-[26px] p-5">
            <div className="border-r border-white/[0.08] pr-4">
              <div className="flex items-center gap-1.5">
                <Sparkles size={15} strokeWidth={1.8} className="text-gold" />
                <span className="label-eyebrow">Pontos de prestígio</span>
              </div>
              <div className="mt-2 font-display text-[34px] font-semibold tracking-tight text-ice">
                <KpiCounter value={me.pontosPrestigio} />
              </div>
            </div>
            <div className="pl-1">
              <div className="flex items-center gap-1.5">
                <Car size={15} strokeWidth={1.8} className="text-ice/70" />
                <span className="label-eyebrow">Veículos</span>
              </div>
              <div className="mt-2 font-display text-[34px] font-semibold tracking-tight text-ice">
                <KpiCounter value={minhaGaragem.length} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Carrossel */}
        <Reveal delay={0.05} className="mt-8">
          <SectionTitle eyebrow="Sua coleção" title="Destaques" />
          <CarGarage cars={minhaGaragem} />
        </Reveal>

        {/* Lista vertical */}
        <Reveal delay={0.1} className="mt-8">
          <SectionTitle eyebrow="Todos os veículos" title="Garagem completa" />
        </Reveal>
        <div className="space-y-4">
          {minhaGaragem.map((c, i) => (
            <Reveal key={`${c.marca}-${c.modelo}-${i}`} delay={0.1 + i * 0.05}>
              <CarSpotlight car={c} />
            </Reveal>
          ))}
        </div>

        {/* Adicionar veículo */}
        <Reveal delay={0.1 + minhaGaragem.length * 0.05} className="mt-4">
          <button
            onClick={() => setOpen(true)}
            className="vp-glass-soft flex w-full items-center gap-4 rounded-[24px] border border-dashed border-white/15 p-5 text-left active:scale-[0.99]"
          >
            <span className="vp-circle flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
              <Plus size={22} strokeWidth={1.8} className="text-gold" />
            </span>
            <div>
              <p className="t-title text-ice">Adicionar veículo</p>
              <p className="mt-0.5 text-[13px] text-slate">
                Inclua mais um supercarro à sua coleção SCA
              </p>
            </div>
          </button>
        </Reveal>

        {/* Linha explicativa */}
        <Reveal delay={0.15 + minhaGaragem.length * 0.05} className="mt-6">
          <div className="flex items-start gap-2.5 px-1">
            <Trophy size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-slate" />
            <p className="text-[13px] leading-relaxed text-slate">
              Cada carro registrado soma{" "}
              <span className="text-ice">pontos de prestígio</span> e entra
              automaticamente no grid das edições do clube.
            </p>
          </div>
        </Reveal>
      </div>

      <Sheet open={open} onClose={() => setOpen(false)} title="Adicionar veículo">
        <div className="pb-2">
          <div className="vp-circle mb-4 flex h-14 w-14 items-center justify-center rounded-full">
            <Car size={26} strokeWidth={1.8} className="text-gold" />
          </div>
          <p className="t-title text-ice">Em breve</p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate">
            Cadastre seu próximo supercarro diretamente pelo app. Em instantes ele
            estará na sua garagem, somando pontos e pronto para o grid das próximas
            edições.
          </p>
          <button
            onClick={() => setOpen(false)}
            className="mt-6 w-full rounded-full bg-white/[0.08] py-3.5 text-[15px] font-semibold text-ice active:scale-[0.98]"
          >
            Entendi
          </button>
        </div>
      </Sheet>
    </div>
  );
}
