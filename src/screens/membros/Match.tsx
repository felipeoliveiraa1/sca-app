import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, MapPin, X, UserPlus, Check, Sparkles, ChevronRight } from "lucide-react";
import Img from "@/components/Img";
import SpatialBg from "@/components/SpatialBg";
import { Reveal, Eyebrow, TierBadge, VerifiedSeal } from "@/components/ui";
import { matches } from "@/data/me";

type MatchState = "idle" | "conectado" | "pulado";

export default function Match() {
  const [estados, setEstados] = useState<Record<string, MatchState>>({});

  function setEstado(id: string, estado: MatchState) {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(40);
    }
    setEstados((prev) => ({ ...prev, [id]: estado }));
  }

  const conectados = Object.values(estados).filter((e) => e === "conectado").length;

  return (
    <div className="relative min-h-full">
      <SpatialBg tint="dual" />

      <div className="relative z-10 px-5 pb-10 pt-6">
        <Reveal>
          <Eyebrow>Conexões curadas</Eyebrow>
          <h1 className="t-headline mt-1.5 text-ice">Match de Negócios</h1>
          <p className="mt-2 max-w-[300px] text-[13px] leading-relaxed text-slate">
            Sugestões selecionadas pelo algoritmo de afinidade do clube, alinhadas ao seu setor e aos
            seus interesses.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="vp-glass-soft mt-5 flex items-center justify-between rounded-[20px] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="vp-circle flex h-9 w-9 items-center justify-center">
                <Sparkles size={16} strokeWidth={1.8} className="text-gold" />
              </span>
              <div>
                <p className="text-[13px] font-medium text-ice">Curadoria SCA</p>
                <p className="text-[12px] text-slate">{matches.length} matches disponíveis hoje</p>
              </div>
            </div>
            <span className="font-display text-[22px] font-semibold tracking-tight text-ice">
              {conectados}
              <span className="text-[13px] font-normal text-slate"> conv.</span>
            </span>
          </div>
        </Reveal>

        <div className="mt-6 space-y-5">
          {matches.map((m, i) => {
            const estado = estados[m.membroId] ?? "idle";
            const carro = m.membro.carros[0];
            return (
              <Reveal key={m.membroId} delay={0.1 + i * 0.07}>
                <article className="vp-glass overflow-hidden rounded-[26px]">
                  {/* Hero do carro com avatar sobreposto */}
                  <div className="relative h-32">
                    <Img
                      src={carro.img}
                      alt={`${carro.marca} ${carro.modelo}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                    <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-ice/80 backdrop-blur-md">
                      {carro.marca} {carro.modelo}
                    </span>
                    <div className="absolute -bottom-7 left-4">
                      <div className="vp-circle h-[58px] w-[58px] overflow-hidden rounded-full p-[2px]">
                        <Img
                          src={m.membro.avatar}
                          alt={m.membro.nome}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-9">
                    {/* Identidade */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/membros/${m.membro.id}`}
                            className="truncate text-[16px] font-semibold text-ice"
                          >
                            {m.membro.nome}
                          </Link>
                          {m.membro.verificado && <VerifiedSeal />}
                        </div>
                        <p className="mt-0.5 truncate text-[13px] text-slate">{m.membro.empresa}</p>
                      </div>
                      <TierBadge tier={m.membro.tier} />
                    </div>

                    {/* Meta */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-slate">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={13} strokeWidth={1.8} className="text-ice/50" />
                        {m.membro.setor}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} strokeWidth={1.8} className="text-ice/50" />
                        {m.membro.cidade}
                      </span>
                    </div>

                    {/* Compatibilidade */}
                    <div className="mt-4">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="label-eyebrow">Compatibilidade</span>
                        <span className="font-display text-[15px] font-semibold tracking-tight text-gold">
                          {m.forca}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gold"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${m.forca}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>

                    {/* Por que conectar */}
                    <div className="mt-4 rounded-[16px] bg-white/[0.04] px-3.5 py-3">
                      <p className="label-eyebrow">Por que conectar</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-ice/80">{m.motivo}</p>
                    </div>

                    {/* Ações */}
                    {estado === "conectado" ? (
                      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gold/15 py-3 text-[14px] font-semibold text-gold">
                        <Check size={17} strokeWidth={2.2} />
                        Convite enviado
                      </div>
                    ) : estado === "pulado" ? (
                      <div className="mt-4 flex items-center justify-between rounded-full bg-white/[0.04] py-3 pl-5 pr-3 text-[13px] text-slate">
                        Sugestão dispensada
                        <button
                          type="button"
                          onClick={() => setEstado(m.membroId, "idle")}
                          className="flex items-center gap-0.5 text-[12px] font-medium text-[#2997ff]"
                        >
                          Reconsiderar
                          <ChevronRight size={15} strokeWidth={1.8} />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-4 flex gap-2.5">
                        <button
                          type="button"
                          onClick={() => setEstado(m.membroId, "pulado")}
                          className="btn-ghost flex flex-1 items-center justify-center gap-1.5 text-[14px] active:scale-95"
                        >
                          <X size={16} strokeWidth={2} />
                          Pular
                        </button>
                        <button
                          type="button"
                          onClick={() => setEstado(m.membroId, "conectado")}
                          className="btn-gold flex flex-[1.4] items-center justify-center gap-1.5 text-[14px] active:scale-95"
                        >
                          <UserPlus size={16} strokeWidth={2} />
                          Conectar
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1 + matches.length * 0.07}>
          <Link
            to="/membros"
            className="mt-6 flex items-center justify-center gap-1 text-[13px] font-medium text-[#2997ff]"
          >
            Explorar todo o diretório
            <ChevronRight size={15} strokeWidth={1.8} />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
