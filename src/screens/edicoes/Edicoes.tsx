import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, MapPin, Trophy } from "lucide-react";
import Img from "@/components/Img";
import SpatialBg from "@/components/SpatialBg";
import Countdown from "@/components/Countdown";
import { Reveal } from "@/components/ui";
import { proximaEdicao, passadas } from "@/data/editions";

export default function Edicoes() {
  return (
    <div className="relative min-h-full">
      <SpatialBg image={proximaEdicao.capa} tint="gold" />

      <div className="relative z-10 px-5 pb-10 pt-6">
        {/* Header */}
        <Reveal>
          <p className="label-eyebrow">O legado SCA</p>
          <h1 className="t-headline mt-1.5 text-ice">Edições</h1>
        </Reveal>

        {/* (1) Próxima edição — painel de vidro forte */}
        <Reveal delay={0.05}>
          <div className="vp-glass mt-6 overflow-hidden rounded-[28px]">
            <Img
              src={proximaEdicao.capa}
              alt={proximaEdicao.titulo}
              className="h-44 w-full rounded-t-[28px] object-cover"
            />
            <div className="p-5">
              <p className="label-eyebrow">Próxima · {proximaEdicao.numero}ª</p>
              <h2 className="t-title mt-1.5 text-ice">{proximaEdicao.local}</h2>
              <div className="mt-2 flex items-center gap-1.5 text-[13px] text-slate">
                <MapPin size={14} strokeWidth={1.8} className="text-slate" />
                <span>
                  {proximaEdicao.cidade} · {proximaEdicao.estado}
                </span>
              </div>

              <div className="mt-5">
                <Countdown iso={proximaEdicao.data} variant="plain" />
              </div>

              <Link
                to={"/edicoes/" + proximaEdicao.id}
                className="btn-gold mt-5 flex w-full items-center justify-center"
              >
                Garantir presença
              </Link>
            </div>
          </div>
        </Reveal>

        {/* (2) Acervo */}
        <div className="mt-9">
          <Reveal delay={0.1}>
            <p className="label-eyebrow">Acervo · 140+ edições</p>
            <div className="vp-glass-soft mt-3 flex items-center gap-3 rounded-[20px] px-4 py-3">
              <span className="vp-circle flex h-9 w-9 items-center justify-center">
                <CalendarDays size={18} strokeWidth={1.8} className="text-ice" />
              </span>
              <div>
                <p className="text-[14px] font-medium text-ice">Desde 2019</p>
                <p className="text-[12px] text-slate">
                  Seis anos reunindo a maior coleção do país
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* (3) Timeline das edições passadas */}
        <div className="mt-6 space-y-3">
          {passadas.map((ed, i) => (
            <Reveal key={ed.id} delay={0.15 + i * 0.05}>
              <Link
                to={"/edicoes/" + ed.id}
                className="vp-glass-soft flex items-center gap-3 rounded-[20px] p-2.5"
              >
                <Img
                  src={ed.capa}
                  alt={ed.titulo}
                  className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="label-eyebrow">{ed.numero}ª Edição</p>
                  <h3 className="mt-0.5 truncate text-[15px] font-semibold text-ice">
                    {ed.titulo}
                  </h3>

                  <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-slate">
                    <MapPin size={12} strokeWidth={1.8} className="text-slate" />
                    <span className="truncate">
                      {ed.local} · {ed.cidade}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {ed.tema && ed.tema !== "Regular" && (
                      <span className="inline-flex items-center rounded-full bg-white/[0.08] px-2.5 py-0.5 text-[11px] font-medium text-ice/80">
                        {ed.tema}
                      </span>
                    )}
                    {ed.vencedorCarroDoDia && (
                      <span className="inline-flex max-w-full items-center gap-1 rounded-full bg-gold/12 px-2.5 py-0.5 text-[11px] font-medium text-gold">
                        <Trophy size={12} strokeWidth={1.8} className="text-gold" />
                        <span className="truncate">{ed.vencedorCarroDoDia}</span>
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight
                  size={20}
                  strokeWidth={1.8}
                  className="flex-shrink-0 text-slate"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
