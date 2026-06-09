import { Crown } from "lucide-react";
import { LOGO_SCA } from "@/data/assets";

type TierName = "Member" | "Black" | "Diamond" | "Founder";

const styles: Record<TierName, { card: string; pill: string; name: string; sub: string; eyebrow: string; holo: boolean; darkLogo?: boolean; crown?: boolean }> = {
  Member: {
    card: "bg-gradient-to-br from-[#4a4a4d] via-[#2a2a2c] to-[#161617] border-white/15",
    pill: "bg-white/15 text-ice",
    name: "text-ice",
    sub: "text-slate",
    eyebrow: "text-ice/50",
    holo: false,
  },
  Black: {
    card: "bg-gradient-to-br from-[#2a2a2c] via-[#161617] to-black border-gold/40",
    pill: "bg-gold/15 text-gold",
    name: "text-ice",
    sub: "text-gold-light/80",
    eyebrow: "text-slate",
    holo: true,
  },
  Diamond: {
    card: "bg-gradient-to-br from-[#f3e3b4] via-[#e8c77a] to-[#c39d3f] border-white/30",
    pill: "bg-black/20 text-black",
    name: "text-black",
    sub: "text-black/60",
    eyebrow: "text-black/55",
    holo: true,
    darkLogo: true,
  },
  Founder: {
    card: "bg-gradient-to-br from-[#1c1c1e] via-black to-black border-gold",
    pill: "bg-gold text-black",
    name: "text-ice",
    sub: "text-gold-light/80",
    eyebrow: "text-slate",
    holo: true,
    crown: true,
  },
};

export default function TierCard({ nome, membro, numero }: { nome: TierName; membro?: string; numero?: string }) {
  const s = styles[nome];
  return (
    <div className={`relative aspect-[1.6/1] w-full overflow-hidden rounded-[22px] border shadow-[0_16px_40px_rgba(0,0,0,0.5)] ${s.card}`}>
      {s.holo && <div className="holo-sheen pointer-events-none absolute -inset-2" style={{ backgroundSize: "220% 100%", backgroundPositionX: "70%" }} />}
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <img src={LOGO_SCA} alt="SCA" className={`h-5 w-auto ${s.darkLogo ? "opacity-80 [filter:brightness(0)]" : ""}`} />
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${s.pill}`}>
            {s.crown && <Crown size={12} strokeWidth={2.2} />}
            {nome}
          </span>
        </div>
        <div>
          <p className={`text-[10px] uppercase tracking-[0.25em] ${s.eyebrow}`}>{numero ?? "Membro SCA"}</p>
          <p className={`mt-1 font-display text-xl font-semibold tracking-tight ${s.name}`}>{membro ?? "Seu Nome"}</p>
          <p className={`text-[12px] ${s.sub}`}>Super Carros Alphaville</p>
        </div>
      </div>
    </div>
  );
}
