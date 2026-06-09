import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { conexoes } from "@/data/chat";
import { me } from "@/data/me";
import Img from "@/components/Img";
import SpatialBg from "@/components/SpatialBg";
import ScreenHeader from "@/components/ScreenHeader";
import { VerifiedSeal, Reveal } from "@/components/ui";

export default function Conexoes() {
  const [busca, setBusca] = useState("");
  const q = busca.toLowerCase();
  const lista = conexoes.filter(
    (c) => !q || c.membro.nome.toLowerCase().includes(q) || c.membro.empresa.toLowerCase().includes(q)
  );

  return (
    <div className="relative min-h-full">
      <SpatialBg tint="dual" />
      <div className="relative z-10">
        <ScreenHeader title="Conexões" subtitle={`${me.conexoes} na sua rede`} back />

        <div className="px-5 pb-10">
          {/* Busca */}
          <div className="flex items-center gap-2.5 rounded-full vp-glass-soft px-4 py-3">
            <Search size={18} className="text-slate" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar nas conexões"
              className="w-full bg-transparent text-[15px] text-ice placeholder:text-slate focus:outline-none"
            />
          </div>

          <p className="mt-5 label-eyebrow">Mensagens</p>

          <div className="mt-3 space-y-2.5">
            {lista.map((c, i) => (
              <Reveal key={c.membro.id} delay={Math.min(i, 6) * 0.04}>
                <Link
                  to={`/conversas/${c.membro.id}`}
                  className="flex items-center gap-3.5 rounded-[20px] vp-glass-soft p-3.5 active:scale-[0.99]"
                >
                  <div className="relative shrink-0">
                    <Img src={c.membro.avatar} alt={c.membro.nome} className="h-14 w-14 rounded-full object-cover" />
                    {c.online && (
                      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-ink-600 bg-[#34c759]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-[15px] font-semibold text-ice">{c.membro.nome}</p>
                      {c.membro.verificado && <VerifiedSeal />}
                      <span className="ml-auto shrink-0 text-[11px] text-slate">{c.hora}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <p className="truncate text-[13px] text-slate">{c.preview}</p>
                      {c.naoLidas ? (
                        <span className="ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-black">
                          {c.naoLidas}
                        </span>
                      ) : (
                        <ChevronRight size={16} className="ml-auto shrink-0 text-slate" />
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
