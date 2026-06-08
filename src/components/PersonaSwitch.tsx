import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, Crown, Check, ChevronDown } from "lucide-react";
import { usePersona } from "@/store/persona";
import { me } from "@/data/me";
import Sheet from "./Sheet";
import Img from "./Img";

/** Floating avatar chip (top-right) that opens the persona switcher.
 *  Switching to "Fundador" is the climax reveal of the demo. */
export default function PersonaSwitch() {
  const { persona, setPersona } = usePersona();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="absolute right-4 top-4 z-40 active:scale-95"
        aria-label="Trocar de visão"
      >
        <span className="relative block">
          <Img src={me.avatar} alt={me.nome} className="h-10 w-10 rounded-full object-cover ring-2 ring-white/25" />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-black ring-2 ring-black">
            <ChevronDown size={11} strokeWidth={3} />
          </span>
        </span>
      </button>

      <Sheet open={open} onClose={() => setOpen(false)} title="Trocar de visão">
        <p className="mb-4 text-sm text-slate">
          Veja o app como um membro do clube ou assuma o comando no Painel do Fundador.
        </p>
        <div className="space-y-3">
          {/* Visão do Membro */}
          <button
            onClick={() => {
              setPersona("membro");
              setOpen(false);
              navigate("/");
            }}
            className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition active:scale-[0.98] ${
              persona === "membro" ? "border-ice/40 bg-white/[0.08]" : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <CircleUserRound size={26} className="shrink-0 text-ice" strokeWidth={1.6} />
            <div className="flex-1">
              <p className="font-semibold text-ice">Visão do Membro</p>
              <p className="text-xs text-slate">
                {persona === "membro" ? "Você está nesta visão" : "A experiência completa do associado"}
              </p>
            </div>
            {persona === "membro" && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ice text-black">
                <Check size={14} strokeWidth={3} />
              </span>
            )}
          </button>

          {/* Painel do Fundador */}
          <button
            onClick={() => {
              setPersona("fundador");
              setOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition active:scale-[0.98] ${
              persona === "fundador" ? "border-gold bg-gold/15" : "border-gold/40 bg-gold/10"
            }`}
          >
            <Crown size={26} className="shrink-0 text-gold" strokeWidth={1.8} />
            <div className="flex-1">
              <p className="font-semibold text-gold-light">Painel do Fundador</p>
              <p className="text-xs text-gold-light/60">
                {persona === "fundador" ? "Você está nesta visão" : "Dr. José Silva — o comando do império"}
              </p>
            </div>
            {persona === "fundador" && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-black">
                <Check size={14} strokeWidth={3} />
              </span>
            )}
          </button>
        </div>
      </Sheet>
    </>
  );
}
