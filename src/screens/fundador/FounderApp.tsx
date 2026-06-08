import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Check, X, LayoutDashboard, UserCheck, Map, Wallet, FileText, Globe, Plane, type LucideIcon } from "lucide-react";
import { usePersona } from "@/store/persona";
import { JOSE, LOGO_SCA } from "@/data/assets";
import SpatialBg from "@/components/SpatialBg";
import { saudacao } from "@/lib/saudacao";
import {
  kpis, crescimento, mesesCrescimento, receita, receitaTotalMes, receitaAno,
  cotas, applications, estados, internacional, pulsoMarca,
} from "@/data/founder";
import KpiCounter from "@/components/KpiCounter";
import Img from "@/components/Img";
import { GoldDivider, SectionTitle } from "@/components/ui";

type Tab = "visao" | "portaria" | "mapa" | "receita" | "presskit";
const tabs: { id: Tab; label: string; Icon: LucideIcon }[] = [
  { id: "visao", label: "Império", Icon: LayoutDashboard },
  { id: "portaria", label: "Portaria", Icon: UserCheck },
  { id: "mapa", label: "Domínio", Icon: Map },
  { id: "receita", label: "Receita", Icon: Wallet },
  { id: "presskit", label: "Press", Icon: FileText },
];

export default function FounderApp() {
  const { setPersona } = usePersona();
  const [tab, setTab] = useState<Tab>("visao");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Volta ao topo ao trocar de aba.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [tab]);

  return (
    <div className="relative flex h-full flex-col">
      <SpatialBg tint="gold" />
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-3">
          <Img src={JOSE} alt="Dr. José Silva" className="h-11 w-11 rounded-full border border-gold/50 object-cover" />
          <div>
            <p className="text-[12px] text-slate">{saudacao()},</p>
            <p className="t-title text-lg text-ice">Dr. José Silva</p>
          </div>
        </div>
        <button
          onClick={() => setPersona("membro")}
          className="rounded-full vp-glass-soft px-4 py-1.5 text-[12px] font-medium text-ice/80 active:scale-95"
        >
          Sair
        </button>
      </div>

      <div ref={scrollRef} className="no-scrollbar relative z-10 flex-1 overflow-y-auto px-5 pb-8 pt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: -10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "visao" && <Visao />}
            {tab === "portaria" && <Portaria />}
            {tab === "mapa" && <Mapa />}
            {tab === "receita" && <Receita />}
            {tab === "presskit" && <PressKit />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegação inferior do Fundador */}
      <nav className="relative z-10 shrink-0 border-t border-white/[0.08] bg-black/60 backdrop-blur-2xl">
        <div className="flex items-stretch justify-around px-1 pb-6 pt-2.5">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-1 flex-col items-center gap-1.5 py-1 text-[10px] font-medium tracking-tight transition-colors ${
                tab === id ? "text-gold" : "text-slate"
              }`}
            >
              <Icon size={21} strokeWidth={tab === id ? 2.4 : 1.8} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function Visao() {
  return (
    <div>
      <p className="label-eyebrow">O império em números</p>
      <h1 className="title-serif text-2xl font-bold text-ice">Seu legado, hoje</h1>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-[20px] vp-glass-soft p-5">
            <p className="font-display text-[34px] font-semibold tracking-tight text-ice">
              <KpiCounter value={k.valor} suffix={k.sufixo} />
            </p>
            <p className="mt-1 text-[13px] text-slate">{k.label}</p>
            <p className="mt-0.5 text-[11px] text-gold">{k.delta}</p>
          </div>
        ))}
      </div>

      <GoldDivider />

      <SectionTitle eyebrow="Últimos 12 meses" title="Crescimento de membros" />
      <GrowthChart />

      <GoldDivider />

      <SectionTitle eyebrow="Pulso da marca" title="Alcance digital" />
      <div className="grid grid-cols-2 gap-3">
        {pulsoMarca.map((p) => (
          <div key={p.canal} className="rounded-2xl border border-white/10 bg-ink-700 p-3.5">
            <p className="text-[11px] uppercase tracking-wider text-gold/70">{p.canal}</p>
            <p className="mt-1 text-sm font-semibold text-ice">{p.valor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrowthChart() {
  const max = Math.max(...crescimento);
  const min = Math.min(...crescimento);
  const pts = crescimento
    .map((v, i) => {
      const x = (i / (crescimento.length - 1)) * 100;
      const y = 100 - ((v - min) / (max - min)) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div className="rounded-2xl glass p-4">
      <div className="relative h-36">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#D4AF37" stopOpacity="0.35" />
              <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.polyline
            points={pts}
            fill="none"
            stroke="#E8C77A"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            vectorEffect="non-scaling-stroke"
          />
          <polygon points={`0,100 ${pts} 100,100`} fill="url(#fill)" />
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-[9px] text-ice/40">
        {mesesCrescimento.filter((_, i) => i % 2 === 0).map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-gold/70">
        +967 membros no período · +82% de crescimento
      </p>
    </div>
  );
}

function Portaria() {
  const [fila, setFila] = useState(applications);
  const [resultado, setResultado] = useState<{ nome: string; aprovado: boolean } | null>(null);

  function decidir(aprovado: boolean) {
    const atual = fila[0];
    if (!atual) return;
    setResultado({ nome: atual.nome, aprovado });
    setTimeout(() => {
      setFila((f) => f.slice(1));
      setResultado(null);
    }, 900);
  }

  return (
    <div>
      <p className="label-eyebrow">O senhor decide quem entra</p>
      <h1 className="title-serif text-2xl font-bold text-ice">Portaria VIP</h1>
      <p className="mt-1 text-sm text-ice/55">{fila.length} candidatos aguardando curadoria</p>

      <div className="relative mt-5 h-[400px]">
        <AnimatePresence>
          {fila.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full flex-col items-center justify-center rounded-3xl vp-glass-soft"
            >
              <CheckCircle2 size={44} className="text-gold" strokeWidth={1.6} />
              <p className="mt-3 t-title text-ice">Fila zerada</p>
              <p className="text-sm text-ice/50">Curadoria em dia, José.</p>
            </motion.div>
          )}
          {fila.slice(0, 3).reverse().map((app, idx, arr) => {
            const isTop = idx === arr.length - 1;
            return (
              <motion.div
                key={app.id}
                className="absolute inset-x-0 top-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-700 to-black shadow-lift"
                style={{ zIndex: idx }}
                initial={{ scale: 0.94, y: (arr.length - 1 - idx) * 14 }}
                animate={{
                  scale: 1 - (arr.length - 1 - idx) * 0.04,
                  y: (arr.length - 1 - idx) * 14,
                }}
                exit={{
                  x: resultado?.aprovado ? 320 : -320,
                  opacity: 0,
                  rotate: resultado?.aprovado ? 12 : -12,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <div className="relative">
                  <Img src={app.avatar} alt={app.nome} className="h-48 w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <p className="title-serif text-xl font-bold text-ice">{app.nome}</p>
                    <p className="text-sm text-gold-light">{app.empresa}</p>
                  </div>
                </div>
                <div className="space-y-2 p-4 text-sm">
                  <Row label="Setor" value={app.setor} />
                  <Row label="Cidade" value={app.cidade} />
                  <Row label="Padrinho" value={app.padrinho} />
                  <Row label="Garagem" value={app.carro} />
                </div>
                {isTop && (
                  <AnimatePresence>
                    {resultado && (
                      <motion.div
                        initial={{ scale: 0, rotate: -25, opacity: 0 }}
                        animate={{ scale: 1, rotate: -12, opacity: 1 }}
                        className={`absolute right-5 top-5 rounded-xl border-4 px-4 py-1.5 text-lg font-black uppercase tracking-wider ${
                          resultado.aprovado ? "border-gold text-gold" : "border-ember text-ember"
                        }`}
                      >
                        {resultado.aprovado ? "Aprovado" : "Recusado"}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {fila.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button onClick={() => decidir(false)} className="flex items-center justify-center gap-2 rounded-full border border-ember/50 bg-ember/10 py-3.5 text-sm font-semibold text-ember active:scale-95">
            <X size={18} /> Recusar
          </button>
          <button onClick={() => decidir(true)} className="btn-gold">
            <Check size={18} /> Aprovar
          </button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-ice/45">{label}</span>
      <span className="text-right font-medium text-ice">{value}</span>
    </div>
  );
}

function Mapa() {
  const ranking = [...estados].sort((a, b) => b.membros - a.membros);
  const max = ranking[0].membros;
  return (
    <div>
      <p className="label-eyebrow">Presença nacional & internacional</p>
      <h1 className="title-serif text-2xl font-bold text-ice">Mapa do Domínio</h1>

      {/* Mapa real do Brasil */}
      <div className="mt-4 overflow-hidden rounded-[20px] border border-white/10">
        <iframe
          title="Mapa do Domínio SCA"
          src="https://www.google.com/maps?q=Brasil&z=4&output=embed"
          className="h-52 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="flex items-center gap-2 bg-ink-700 px-4 py-3">
          <Globe size={16} className="shrink-0 text-gold" strokeWidth={1.8} />
          <p className="text-[13px] text-ice">12+ estados · Estados Unidos · Europa</p>
        </div>
      </div>

      {/* Ranking por estado */}
      <p className="mt-6 label-eyebrow">Presença por estado</p>
      <div className="mt-3 space-y-2.5">
        {ranking.map((e, i) => (
          <motion.div
            key={e.uf}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i, 8) * 0.04, duration: 0.45 }}
            className="rounded-[16px] vp-glass-soft p-3.5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-[12px] font-bold text-ice">
                  {e.uf}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-ice">{e.nome}</p>
                  <p className="truncate text-[11px] text-slate">{e.ultimaEdicao}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-display text-[18px] font-semibold tracking-tight text-ice">{e.membros}</span>
                <p className="text-[10px] text-slate">membros</p>
              </div>
            </div>
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                className="h-full rounded-full bg-gold"
                initial={{ width: 0 }}
                whileInView={{ width: `${(e.membros / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Internacional */}
      <p className="mt-6 label-eyebrow">Conexões no exterior</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {internacional.map((i) => (
          <div key={i.regiao} className="rounded-[16px] vp-glass-soft p-4">
            <Plane size={18} className="text-gold" strokeWidth={1.8} />
            <p className="mt-2 text-[14px] font-semibold text-ice">{i.regiao}</p>
            <p className="text-[11px] text-slate">{i.cidade}</p>
            <p className="mt-1 font-display text-[16px] font-semibold text-ice">{i.membros} <span className="text-[11px] font-normal text-slate">membros</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Receita() {
  const max = Math.max(...receita.map((r) => r.valor));
  return (
    <div>
      <p className="label-eyebrow">Paixão que virou negócio</p>
      <h1 className="title-serif text-2xl font-bold text-ice">Cofre de Receita</h1>

      <div className="mt-4 rounded-[22px] bg-ink-700 p-6 text-center">
        <p className="label-eyebrow">Receita recorrente / ano</p>
        <p className="mt-2 font-display text-[44px] font-semibold tracking-tight text-ice">
          <span className="text-gold">R$ </span>
          <KpiCounter value={receitaAno / 1000} decimals={1} suffix=" mi" />
        </p>
        <p className="mt-1 text-[13px] text-slate">
          R$ {receitaTotalMes.toLocaleString("pt-BR")} mil / mês
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {receita.map((r) => (
          <div key={r.fonte}>
            <div className="mb-1 flex justify-between text-[12px]">
              <span className="text-ice/70">{r.fonte}</span>
              <span className="font-semibold text-ice">R$ {r.valor} mil</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full"
                style={{ background: r.cor }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(r.valor / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <GoldDivider />

      <SectionTitle eyebrow="Cotas de parceiros" title="Patrocínios" />
      <div className="space-y-2.5">
        {cotas.map((c) => (
          <div key={c.categoria} className="flex items-center justify-between rounded-2xl border border-white/10 bg-ink-700 p-3.5">
            <div>
              <p className="text-sm font-semibold text-gold-light">{c.categoria}</p>
              <p className="text-[11px] text-ice/50">{c.valor}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-ice">{c.preenchidas}/{c.qtd}</p>
              <p className="text-[10px] text-ice/45">cotas preenchidas</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PressKit() {
  const [exportado, setExportado] = useState(false);
  return (
    <div>
      <p className="label-eyebrow">Material institucional</p>
      <h1 className="title-serif text-2xl font-bold text-ice">Press Kit do Império</h1>
      <p className="mt-1 text-sm text-ice/55">One-pager pronto para enviar a patrocinadores.</p>

      <div className="mt-5 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-ink-700 to-black">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <img src={LOGO_SCA} alt="SCA" className="h-5" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-ice/40">Media Kit 2026</span>
        </div>
        <div className="grid grid-cols-2 gap-px bg-white/5">
          {kpis.map((k) => (
            <div key={k.label} className="bg-ink p-4">
              <p className="font-display text-2xl font-semibold tracking-tight text-ice">{k.valor}{k.sufixo}</p>
              <p className="text-[11px] text-slate">{k.label}</p>
            </div>
          ))}
        </div>
        <div className="p-4">
          <p className="text-[12px] leading-relaxed text-ice/65">
            O maior ecossistema de empresários e supercarros do Brasil. Eventos exclusivos,
            audiência de altíssimo poder aquisitivo e 32 marcas de luxo parceiras.
          </p>
        </div>
      </div>

      <button
        onClick={() => setExportado(true)}
        className="btn-gold mt-5 w-full"
      >
        {exportado ? (<><Check size={18} /> Press Kit gerado</>) : "Exportar Press Kit"}
      </button>
      <AnimatePresence>
        {exportado && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-center text-[12px] text-gold/70"
          >
            PDF institucional pronto para compartilhar via WhatsApp ou e-mail.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
