import { Check } from "lucide-react";
import { niveis } from "@/data/me";
import SpatialBg from "@/components/SpatialBg";
import ScreenHeader from "@/components/ScreenHeader";
import TierCard from "@/components/TierCard";
import { Reveal } from "@/components/ui";

const numeros: Record<string, string> = {
  Member: "Membro 1.482",
  Black: "Membro 318",
  Diamond: "Membro 042",
  Founder: "Membro 001",
};

export default function Niveis() {
  return (
    <div className="relative min-h-full">
      <SpatialBg tint="gold" />
      <div className="relative z-10">
        <ScreenHeader title="Níveis" subtitle="A escala do clube" back />

        <div className="px-5 pb-12">
          <p className="text-[15px] leading-relaxed text-slate">
            Cada nível tem seu próprio cartão e benefícios. O membro entra como Member e <span className="text-ice">sobe</span> por presença, indicações ou plano — o app mostra o quanto falta para o próximo.
          </p>

          <div className="mt-7 space-y-9">
            {niveis.map((n, i) => (
              <Reveal key={n.nome} delay={i * 0.05}>
                <div>
                  <TierCard nome={n.nome} membro={n.membroExemplo} numero={numeros[n.nome]} />
                  <div className="mt-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="t-title text-ice">{n.nome}</h3>
                      <span className="text-[12px] text-slate">{n.resumo}</span>
                    </div>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold/80">Como chega</p>
                    <p className="mt-0.5 text-[14px] text-ice/80">{n.comoChega}</p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                      {n.beneficios.map((b) => (
                        <span key={b} className="inline-flex items-center gap-1.5 text-[13px] text-ice/75">
                          <Check size={14} className="text-gold" strokeWidth={2.4} /> {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-[18px] vp-glass-soft p-4 text-center">
            <p className="text-[13px] text-slate">
              No app, o membro vê <span className="text-ice">“faltam X edições / Y pontos”</span> para o próximo nível — o que aumenta presença, indicações e receita recorrente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
