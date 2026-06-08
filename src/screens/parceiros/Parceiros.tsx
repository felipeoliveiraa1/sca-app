import { Link } from "react-router-dom";
import { Gift, ChevronRight, Flame, Clock, Gem } from "lucide-react";
import SpatialBg from "@/components/SpatialBg";
import BrandWall from "@/components/BrandWall";
import { SectionTitle, Reveal } from "@/components/ui";
import { partnersByCat, relampago } from "@/data/partners";
import type { Partner } from "@/data/types";

const categorias: Partner["categoria"][] = ["Diamante", "Ouro", "Prata"];

const subtitulos: Record<Partner["categoria"], string> = {
  Diamante: "Parceiros de mais alto nível, presentes em todas as edições.",
  Ouro: "Marcas de performance e lifestyle com ativações exclusivas.",
  Prata: "Curadoria de serviços e experiências para os membros.",
};

export default function Parceiros() {
  return (
    <div className="relative min-h-full">
      <SpatialBg tint="gold" />

      <div className="relative z-10 px-5 pb-10 pt-6">
        <p className="label-eyebrow">30+ marcas de luxo</p>
        <h1 className="t-headline mt-1 text-ice">Parceiros</h1>

        {/* Hall de Marcas */}
        <div className="mt-7">
          <SectionTitle title="Hall de Marcas" />
          <Reveal>
            <BrandWall />
          </Reveal>
        </div>

        {/* Clube de Vantagens */}
        <Reveal className="mt-7">
          <Link
            to="/vantagens"
            className="vp-glass flex items-center gap-4 rounded-[24px] p-5"
          >
            <div className="vp-circle flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
              <Gift size={22} strokeWidth={1.8} className="text-gold" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="t-title font-semibold text-ice">Clube de Vantagens</p>
              <p className="mt-0.5 text-[13px] text-slate">
                Benefícios negociados com os parceiros do clube.
              </p>
            </div>
            <ChevronRight size={20} strokeWidth={1.8} className="shrink-0 text-slate" />
          </Link>
        </Reveal>

        {/* Ofertas relâmpago */}
        <div className="mt-9">
          <SectionTitle title="Ofertas relâmpago" />
          <div className="space-y-3">
            {relampago.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.05}>
                <div className="vp-glass-soft rounded-[22px] p-5">
                  <div className="flex items-center gap-2">
                    <Flame size={14} strokeWidth={1.8} className="text-ember" />
                    <p className="label-eyebrow">{b.parceiro}</p>
                  </div>

                  <h3 className="t-title mt-2 font-semibold text-ice">{b.titulo}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate">
                    {b.descricao}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-slate">
                      <Clock size={12} strokeWidth={1.8} />
                      {b.validade}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ember/15 px-3 py-1 text-[11px] font-semibold text-ember">
                      <Flame size={12} strokeWidth={2} />
                      Tempo limitado
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Vitrine */}
        <div className="mt-9">
          <SectionTitle title="Vitrine" />

          <div className="space-y-8">
            {categorias.map((cat) => (
              <div key={cat}>
                <div className="mb-4">
                  <h3 className="t-title font-semibold text-ice">{cat}</h3>
                  <p className="mt-1 text-[13px] text-slate">{subtitulos[cat]}</p>
                </div>

                <div className="space-y-3">
                  {partnersByCat[cat].map((p, i) => (
                    <Reveal key={p.id} delay={i * 0.04}>
                      <div className="vp-glass-soft flex items-start gap-4 rounded-[22px] p-4">
                        <div
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04]"
                          style={{ color: p.cor }}
                        >
                          <span className="font-display text-[22px] font-semibold tracking-tight">
                            {p.logo}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="t-title truncate font-semibold text-ice">
                              {p.nome}
                            </p>
                            <span
                              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                                p.categoria === "Diamante"
                                  ? "bg-gold/15 text-gold"
                                  : "bg-white/[0.08] text-ice/70"
                              }`}
                            >
                              {p.categoria === "Diamante" && (
                                <Gem size={12} strokeWidth={2} className="text-gold" />
                              )}
                              {p.categoria}
                            </span>
                          </div>

                          <p className="mt-0.5 text-[12px] text-slate">{p.setor}</p>
                          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slate">
                            {p.story}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
