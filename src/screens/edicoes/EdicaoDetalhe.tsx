import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Car, Power, MapPin } from "lucide-react";
import { edicoesById, programacao, venuePontos, carroDoDia, proximaEdicao } from "@/data/editions";
import { members } from "@/data/members";
import { minhaGaragem } from "@/data/me";
import Img from "@/components/Img";
import Sheet from "@/components/Sheet";
import Countdown from "@/components/Countdown";
import QRTag from "@/components/QRTag";
import SpatialBg from "@/components/SpatialBg";
import { CarGridCard } from "@/components/CarShowcase";
import { SectionTitle } from "@/components/ui";

// Carros confirmados: puxa carros dos membros do seed
const confirmados = members.flatMap((m) =>
  m.carros.map((c) => ({ car: c, dono: m.nome }))
);
const marcasFiltro = ["Todos", "Ferrari", "Lamborghini", "Porsche", "JDM"];

export default function EdicaoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const edicao = (id && edicoesById[id]) || proximaEdicao;

  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [passeOpen, setPasseOpen] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [acompanhante, setAcompanhante] = useState(true);
  const [carroIdx, setCarroIdx] = useState(0);
  const [filtro, setFiltro] = useState("Todos");
  const [checkin, setCheckin] = useState<"idle" | "ignition" | "done">("idle");
  const [votos, setVotos] = useState(() => carroDoDia.map((c) => c.votos));
  const [votado, setVotado] = useState<number | null>(null);

  const lista = confirmados.filter(({ car }) => {
    if (filtro === "Todos") return true;
    if (filtro === "JDM") return car.categoria === "JDM";
    return car.marca === filtro;
  });

  const totalVotos = votos.reduce((a, b) => a + b, 0);

  function votar(i: number) {
    if (votado !== null) return;
    setVotos((v) => v.map((x, k) => (k === i ? x + 1 : x)));
    setVotado(i);
  }

  function fazerCheckin() {
    setCheckin("ignition");
    setTimeout(() => setCheckin("done"), 1900);
  }

  return (
    <div className="relative min-h-full pb-8">
      <SpatialBg tint="gold" />
      <div className="relative z-10">
      {/* Hero */}
      <div className="relative">
        <Img src={edicao.capa} alt={edicao.titulo} className="h-80 w-full object-cover" />
        <div className="absolute inset-0 bg-ink-fade" />
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-ice backdrop-blur-md active:scale-90"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-5">
          {edicao.tema && edicao.tema !== "Regular" && <span className="chip-gold mb-2">{edicao.tema}</span>}
          <p className="label-eyebrow">{edicao.numero}ª edição</p>
          <h1 className="t-hero mt-1 text-ice">{edicao.local}</h1>
          <p className="mt-2 text-[15px] text-ice/70">{edicao.cidade} · {edicao.estado}</p>
        </div>
      </div>

      {/* Métricas + ação */}
      <div className="px-5 pt-4">
        <div className="grid grid-cols-3 gap-2 rounded-[20px] vp-glass-soft p-5 text-center">
          <div>
            <p className="font-display text-[26px] font-semibold tracking-tight text-ice">{edicao.carrosConfirmados}</p>
            <p className="mt-0.5 text-[11px] text-slate">Feras</p>
          </div>
          <div className="border-x border-white/[0.08]">
            <p className="font-display text-[26px] font-semibold tracking-tight text-ice">{edicao.membrosConfirmados}</p>
            <p className="mt-0.5 text-[11px] text-slate">Membros</p>
          </div>
          <div>
            <p className="font-display text-[26px] font-semibold tracking-tight text-ice">
              {edicao.vagasRestantes ?? "—"}
            </p>
            <p className="mt-0.5 text-[11px] text-slate">Vagas</p>
          </div>
        </div>

        {edicao.status === "proxima" ? (
          <>
            <div className="mt-4 flex justify-center">
              <Countdown iso={edicao.data} />
            </div>
            {!confirmado ? (
              <button onClick={() => setRsvpOpen(true)} className="btn-gold mt-4 w-full">
                Confirmar Presença
              </button>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={() => setPasseOpen(true)} className="btn-ghost">
                  Ver meu Passe
                </button>
                <button
                  onClick={() => {
                    setPasseOpen(true);
                  }}
                  className="btn-gold"
                >
                  Check-in
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-4 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-center">
            <p className="text-xs text-ice/60">Vencedor Carro do Dia</p>
            <p className="title-serif text-lg font-bold text-gold-light">{edicao.vencedorCarroDoDia}</p>
          </div>
        )}
        {edicao.destaque && <p className="mt-3 text-center text-[13px] text-ice/60">{edicao.destaque}</p>}
      </div>

      {/* Carro do Dia — votação ao vivo */}
      <div className="px-5 pt-8">
        <SectionTitle eyebrow="Ao vivo" title="Carro do Dia" />
        <div className="space-y-2.5">
          {carroDoDia.map((c, i) => {
            const pct = Math.round((votos[i] / totalVotos) * 100);
            return (
              <button
                key={c.nome}
                onClick={() => votar(i)}
                className={`relative w-full overflow-hidden rounded-2xl border p-3 text-left transition ${
                  votado === i ? "border-gold bg-gold/10" : "border-white/10 bg-ink-700"
                }`}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold/15"
                  initial={false}
                  animate={{ width: `${pct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
                <div className="relative flex items-center gap-3">
                  <Img src={c.img} alt={c.nome} className="h-12 w-16 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ice">{c.nome}</p>
                    <p className="truncate text-[11px] text-ice/50">{c.dono}</p>
                  </div>
                  <span className="title-serif text-lg font-bold text-gold-light">{pct}%</span>
                </div>
              </button>
            );
          })}
        </div>
        {votado !== null && <p className="mt-2 text-center text-[11px] text-gold/70">Seu voto foi computado ✓</p>}
      </div>

      {/* Grid de carros confirmados */}
      <div className="px-5 pt-8">
        <SectionTitle eyebrow={`${confirmados.length} feras confirmadas`} title="Carros na pista" />
        <div className="no-scrollbar -mx-5 mb-3 flex gap-2 overflow-x-auto px-5">
          {marcasFiltro.map((m) => (
            <button
              key={m}
              onClick={() => setFiltro(m)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                filtro === m ? "border-gold bg-gold/15 text-gold-light" : "border-white/10 text-ice/60"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {lista.slice(0, 10).map(({ car, dono }, i) => (
            <CarGridCard key={i} car={car} dono={dono} />
          ))}
        </div>
      </div>

      {/* Programação */}
      <div className="px-5 pt-8">
        <SectionTitle eyebrow="Roteiro do dia" title="Programação" />
        <div className="relative space-y-3 pl-5">
          <div className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-gold/50 to-transparent" />
          {programacao.map((p) => (
            <div key={p.hora} className="relative">
              <span className="absolute -left-5 top-1.5 h-2.5 w-2.5 rounded-full bg-gold-grad" />
              <p className="text-xs font-bold text-gold-light">{p.hora}</p>
              <p className="text-sm text-ice">{p.titulo}</p>
              <p className="text-[11px] text-ice/45">{p.local}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mapa real do local */}
      <div className="px-5 pt-8">
        <SectionTitle eyebrow="Onde acontece" title="Mapa do local" />
        <div className="overflow-hidden rounded-[20px] border border-white/10">
          <iframe
            title="Mapa do local"
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${edicao.local}, ${edicao.cidade} - ${edicao.estado}`)}&z=14&output=embed`}
            className="h-56 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex items-center gap-2 bg-ink-700 px-4 py-3">
            <MapPin size={16} className="shrink-0 text-gold" strokeWidth={1.8} />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-ice">{edicao.local}</p>
              <p className="truncate text-[12px] text-slate">{edicao.cidade} · {edicao.estado}</p>
            </div>
          </div>
        </div>
        {/* Pontos do evento */}
        <div className="mt-3 flex flex-wrap gap-2">
          {venuePontos.map((p) => (
            <span key={p.nome} className="chip">
              <MapPin size={12} className="text-slate" /> {p.nome}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 pt-6">
        <Link to={`/galeria/${edicao.id}`} className="btn-ghost w-full">
          Ver galeria da edição
        </Link>
      </div>

      {/* RSVP Sheet */}
      <Sheet open={rsvpOpen} onClose={() => setRsvpOpen(false)} title="Confirmar presença">
        <p className="text-sm text-ice/60">{edicao.numero}ª edição · {edicao.local}</p>
        <p className="mt-1 text-[12px] text-ember">Restam {edicao.vagasRestantes} lugares</p>

        <div className="mt-5">
          <p className="label-eyebrow mb-2">Levará acompanhante?</p>
          <div className="grid grid-cols-2 gap-2">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => setAcompanhante(v)}
                className={`rounded-xl border py-2.5 text-sm font-medium ${
                  acompanhante === v ? "border-gold bg-gold/10 text-gold-light" : "border-white/10 text-ice/60"
                }`}
              >
                {v ? "Sim, +1" : "Vou sozinho"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="label-eyebrow mb-2">Qual carro você vai exibir?</p>
          <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
            {minhaGaragem.map((c, i) => (
              <button
                key={i}
                onClick={() => setCarroIdx(i)}
                className={`w-32 shrink-0 overflow-hidden rounded-xl border text-left ${
                  carroIdx === i ? "border-gold" : "border-white/10"
                }`}
              >
                <Img src={c.img} alt={c.modelo} className="h-20 w-full object-cover" />
                <div className="p-2">
                  <p className="truncate text-[11px] font-semibold text-ice">{c.modelo}</p>
                  <p className="text-[10px] text-ice/50">{c.marca}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            setConfirmado(true);
            setRsvpOpen(false);
            setTimeout(() => setPasseOpen(true), 350);
          }}
          className="btn-gold mt-6 w-full"
        >
          Gerar meu Passe de Acesso
        </button>
      </Sheet>

      {/* Passe + Check-in */}
      <Sheet
        open={passeOpen}
        onClose={() => {
          setPasseOpen(false);
          setCheckin("idle");
        }}
        title={checkin === "done" ? "Check-in confirmado" : "Passe de Acesso"}
      >
        <AnimatePresence mode="wait">
          {checkin === "idle" && (
            <motion.div key="passe" exit={{ opacity: 0 }} className="pb-2">
              <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-ink-700 to-black p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="label-eyebrow">Acesso restrito</p>
                    <p className="title-serif text-xl font-bold text-ice">{edicao.local}</p>
                    <p className="text-xs text-ice/60">{edicao.cidade} · 28 jun · 16h</p>
                  </div>
                  <div className="rounded-lg bg-white p-1.5">
                    <QRTag value={`SCA-CHECKIN-${edicao.id}`} size={64} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] text-ice/60">
                  <span className="chip">{acompanhante ? "+1 acompanhante" : "Individual"}</span>
                  <span className="chip"><Car size={13} /> {minhaGaragem[carroIdx].modelo}</span>
                </div>
              </div>
              <button onClick={fazerCheckin} className="btn-gold mt-5 w-full">
                Simular check-in no evento
              </button>
              <p className="mt-2 text-center text-[11px] text-ice/40">
                Aproxime o QR da portaria para dar a partida
              </p>
            </motion.div>
          )}

          {checkin === "ignition" && (
            <motion.div
              key="ign"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-10"
            >
              <motion.div
                animate={{ rotate: [0, -8, 320, 350, 360], scale: [1, 1.05, 1] }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
                className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-gold/40 text-gold"
              >
                <Power size={40} strokeWidth={2} />
              </motion.div>
              <motion.p
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="mt-5 text-sm uppercase tracking-[0.3em] text-gold-light"
              >
                Dando a partida…
              </motion.p>
            </motion.div>
          )}

          {checkin === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8"
            >
              <motion.div
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: -12, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-gold bg-gold/10"
              >
                <div className="text-center">
                  <p className="title-serif text-xs font-bold text-gold-light">SCA</p>
                  <p className="text-[8px] text-ice/60">{edicao.numero}ª</p>
                  <p className="text-[8px] text-ice/60">CHECK-IN</p>
                </div>
              </motion.div>
              <p className="mt-5 title-serif text-xl font-bold text-ice">Bem-vindo à {edicao.numero}ª!</p>
              <p className="mt-1 text-center text-sm text-ice/60">
                Selo carimbado no seu passaporte de edições.
              </p>
              <button onClick={() => { setPasseOpen(false); setCheckin("idle"); }} className="btn-ghost mt-6 w-full">
                Concluir
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Sheet>
      </div>
    </div>
  );
}
