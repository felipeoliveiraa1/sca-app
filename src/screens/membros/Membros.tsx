import { useState } from "react";
import { Link } from "react-router-dom";
import { Handshake, QrCode, Trophy, Search, ChevronRight, Car, MessageCircle } from "lucide-react";
import { members } from "@/data/members";
import Img from "@/components/Img";
import SpatialBg from "@/components/SpatialBg";
import { TierBadge, VerifiedSeal, Reveal } from "@/components/ui";

const hubs = [
  { to: "/conexoes", label: "Conexões", Icon: MessageCircle },
  { to: "/match", label: "Match", Icon: Handshake },
  { to: "/conectar", label: "Conectar", Icon: QrCode },
  { to: "/ranking", label: "Ranking", Icon: Trophy },
];

const estadosUnicos = ["Todos", ...Array.from(new Set(members.map((m) => m.estado)))];

export default function Membros() {
  const [busca, setBusca] = useState("");
  const [estado, setEstado] = useState("Todos");

  const filtrados = members.filter((m) => {
    const okEstado = estado === "Todos" || m.estado === estado;
    const q = busca.toLowerCase();
    const okBusca =
      !q ||
      m.nome.toLowerCase().includes(q) ||
      m.empresa.toLowerCase().includes(q) ||
      m.cidade.toLowerCase().includes(q) ||
      m.setor.toLowerCase().includes(q);
    return okEstado && okBusca;
  });

  return (
    <div className="relative min-h-full">
      <SpatialBg tint="dual" />

      <div className="relative z-10 px-5 pb-10 pt-6">
        <p className="label-eyebrow">2.000+ empresários</p>
        <h1 className="t-headline mt-1 text-ice">Membros</h1>

        {/* Hubs de networking */}
        <div className="mt-5 grid grid-cols-4 gap-2.5">
          {hubs.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className="vp-glass-soft flex flex-col items-center gap-2 rounded-[20px] px-1 py-4 text-center active:scale-[0.96]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full vp-circle text-gold">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <span className="text-[10px] font-medium leading-tight text-ice/80">{label}</span>
            </Link>
          ))}
        </div>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2.5 rounded-full vp-glass-soft px-4 py-3">
          <Search size={18} className="text-slate" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, empresa, cidade ou setor"
            className="w-full bg-transparent text-[15px] text-ice placeholder:text-slate focus:outline-none"
          />
        </div>

        {/* Filtro por estado */}
        <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
          {estadosUnicos.map((e) => (
            <button
              key={e}
              onClick={() => setEstado(e)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
                estado === e ? "bg-gold text-black" : "vp-glass-soft text-ice/70"
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        <p className="mt-5 label-eyebrow">{filtrados.length} membros</p>

        {/* Lista */}
        <div className="mt-3 space-y-3">
          {filtrados.map((m, i) => (
            <Reveal key={m.id} delay={Math.min(i, 6) * 0.04}>
              <Link
                to={`/membros/${m.id}`}
                className="flex items-center gap-3.5 rounded-[20px] vp-glass-soft p-3.5 active:scale-[0.99]"
              >
                <Img src={m.avatar} alt={m.nome} className="h-14 w-14 shrink-0 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-[16px] font-semibold text-ice">{m.nome}</p>
                    {m.verificado && <VerifiedSeal />}
                  </div>
                  <p className="truncate text-[13px] text-slate">
                    {m.cargo} · {m.empresa}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <TierBadge tier={m.tier} />
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate">
                      <Car size={12} /> {m.carros.length}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="shrink-0 text-slate" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
