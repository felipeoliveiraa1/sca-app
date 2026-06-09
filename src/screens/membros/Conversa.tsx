import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Send } from "lucide-react";
import { membersById } from "@/data/members";
import { seedThread, respostasAuto, type Msg } from "@/data/chat";
import Img from "@/components/Img";
import SpatialBg from "@/components/SpatialBg";
import { VerifiedSeal } from "@/components/ui";

export default function Conversa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const m = id ? membersById[id] : undefined;

  const [msgs, setMsgs] = useState<Msg[]>(() => (m ? seedThread(m) : []));
  const [texto, setTexto] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => endRef.current?.scrollIntoView({ block: "end" }), 60);
    return () => clearTimeout(t);
  }, [msgs.length]);

  if (!m) {
    return (
      <div className="relative flex min-h-full flex-col items-center justify-center px-8 text-center">
        <SpatialBg tint="dual" />
        <p className="relative z-10 text-slate">Conversa não encontrada.</p>
        <button onClick={() => navigate("/conexoes")} className="btn-ghost relative z-10 mt-4">Voltar</button>
      </div>
    );
  }

  function enviar() {
    const t = texto.trim();
    if (!t) return;
    setMsgs((prev) => [...prev, { from: "eu", texto: t, hora: "agora" }]);
    setTexto("");
    setTimeout(() => {
      setMsgs((prev) => [...prev, { from: "ele", texto: respostasAuto[prev.length % respostasAuto.length], hora: "agora" }]);
    }, 1100);
  }

  return (
    <div className="relative flex min-h-full flex-col">
      <SpatialBg tint="dual" />

      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/[0.08] bg-black/60 px-4 py-3 backdrop-blur-2xl">
        <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full vp-circle text-ice active:scale-90" aria-label="Voltar">
          <ChevronLeft size={20} />
        </button>
        <Img src={m.avatar} alt={m.nome} className="h-10 w-10 rounded-full object-cover" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-[15px] font-semibold text-ice">{m.nome}</p>
            {m.verificado && <VerifiedSeal />}
          </div>
          <p className="truncate text-[12px] text-[#34c759]">online agora</p>
        </div>
      </div>

      {/* Mensagens */}
      <div className="relative z-10 flex-1 space-y-2.5 px-4 py-4">
        {msgs.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "eu" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${
                msg.from === "eu"
                  ? "rounded-br-md bg-gold text-black"
                  : "rounded-bl-md vp-glass-soft text-ice"
              }`}
            >
              {msg.texto}
              <span className={`ml-2 align-bottom text-[10px] ${msg.from === "eu" ? "text-black/50" : "text-slate"}`}>{msg.hora}</span>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Campo de envio */}
      <div className="sticky bottom-0 z-20 flex items-center gap-2 border-t border-white/[0.08] bg-black/60 px-3 py-3 pb-6 backdrop-blur-2xl">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          placeholder="Mensagem…"
          className="flex-1 rounded-full bg-white/[0.08] px-4 py-2.5 text-[15px] text-ice placeholder:text-slate focus:outline-none"
        />
        <button
          onClick={enviar}
          disabled={!texto.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-black transition active:scale-90 disabled:opacity-40"
          aria-label="Enviar"
        >
          <Send size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
