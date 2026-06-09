import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Car, QrCode, Gift, Mic, Trophy, type LucideIcon } from "lucide-react";
import { LOGO_SCA, carImg } from "@/data/assets";
import { saudacao } from "@/lib/saudacao";
import { usePersona } from "@/store/persona";
import { proximaEdicao } from "@/data/editions";
import { news } from "@/data/content";
import { me } from "@/data/me";
import HolographicCard from "@/components/HolographicCard";
import StoryBar from "@/components/StoryBar";
import Countdown from "@/components/Countdown";
import Img from "@/components/Img";
import { Reveal } from "@/components/ui";

const atalhos: { to: string; label: string; Icon: LucideIcon }[] = [
  { to: "/edicoes", label: "Edições", Icon: CalendarDays },
  { to: "/garagem", label: "Garagem", Icon: Car },
  { to: "/conectar", label: "Conectar", Icon: QrCode },
  { to: "/vantagens", label: "Vantagens", Icon: Gift },
  { to: "/play", label: "Podcast", Icon: Mic },
  { to: "/ranking", label: "Ranking", Icon: Trophy },
];

export default function Home() {
  const navigate = useNavigate();
  const { userName } = usePersona();
  const primeiro = userName.trim().split(" ")[0] || "José";
  return (
    <div className="relative min-h-full">
      {/* ===== Fundo espacial (visionOS) ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Img src={carImg(0)} alt="" className="absolute inset-x-0 top-0 h-[70%] w-full scale-110 object-cover opacity-40 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black" />
        <div className="absolute -top-16 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/25 blur-[120px]" />
        <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-[#2997ff]/12 blur-[120px]" />
        <div className="absolute bottom-24 -left-16 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      {/* ===== Conteúdo ===== */}
      <div className="relative z-10 px-5 pb-12 pt-[calc(env(safe-area-inset-top)+3.5rem)]">
        {/* Saudação */}
        <Reveal>
          <img src={LOGO_SCA} alt="Super Carros Alphaville" className="h-4 w-auto opacity-95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]" />
          <h1 className="t-hero mt-5 text-ice">{saudacao()},<br />{primeiro}.</h1>
          <p className="mt-2 text-[16px] text-ice/60">Bem-vindo de volta ao clube.</p>
        </Reveal>

        {/* Stories */}
        <div className="-mx-5 mt-5">
          <StoryBar />
        </div>

        {/* Painel primário — próxima edição */}
        <Reveal delay={0.05}>
          <div className="vp-glass mt-3 overflow-hidden rounded-[30px]">
            <div className="relative h-44">
              <Img src={carImg(3)} alt={proximaEdicao.titulo} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-ice backdrop-blur-md">
                Próxima · {proximaEdicao.numero}ª Edição
              </span>
            </div>
            <div className="p-6">
              <h2 className="t-title text-ice">Dream Car Museum</h2>
              <p className="mt-1 text-[14px] text-ice/60">São Roque · SP — 28 jun, 16h</p>
              <div className="mt-5 flex justify-center">
                <Countdown iso={proximaEdicao.data} variant="plain" />
              </div>
              <button onClick={() => navigate(`/edicoes/${proximaEdicao.id}`)} className="btn-gold mt-6 w-full">
                Confirmar Presença
              </button>
              <p className="mt-2.5 text-center text-[13px] text-slate">
                Restam apenas {proximaEdicao.vagasRestantes} lugares
              </p>
            </div>
          </div>
        </Reveal>

        {/* Stats flutuantes */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link to="/membros" className="vp-glass-soft rounded-[24px] p-5 active:scale-[0.98]">
            <p className="font-display text-[30px] font-semibold tracking-tight text-ice">2.147</p>
            <p className="mt-0.5 text-[13px] text-ice/60">Membros no clube</p>
          </Link>
          <Link to="/conectar" className="vp-glass-soft rounded-[24px] p-5 active:scale-[0.98]">
            <p className="font-display text-[30px] font-semibold tracking-tight text-ice">{me.conexoes}</p>
            <p className="mt-0.5 text-[13px] text-ice/60">Suas conexões</p>
          </Link>
        </div>

        {/* Credencial */}
        <div className="mt-9">
          <p className="label-eyebrow">Sua identidade</p>
          <h2 className="t-title mt-1.5 text-ice">Credencial Black</h2>
          <div className="vp-glass mt-4 rounded-[30px] p-5">
            <HolographicCard />
          </div>
          <Link to="/niveis" className="mt-4 inline-flex items-center gap-1 text-[15px] font-medium text-[#2997ff]">
            Conheça os níveis e cartões ›
          </Link>
        </div>

        {/* Atalhos em vidro */}
        <div className="mt-9">
          <p className="label-eyebrow">Acesso rápido</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {atalhos.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="vp-glass-soft flex flex-col items-center gap-2 rounded-[22px] px-2 py-5 active:scale-[0.96]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full vp-circle text-ice">
                  <a.Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="text-[12px] font-medium text-ice/80">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Novidades */}
        <div className="mt-9">
          <p className="label-eyebrow">Do ecossistema</p>
          <h2 className="t-title mt-1.5 text-ice">Novidades</h2>
          <div className="vp-glass mt-4 divide-y divide-white/10 rounded-[26px]">
            {news.map((n) => (
              <div key={n.id} className="flex items-center gap-3 p-3.5">
                <Img src={n.capa} alt={n.titulo} className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-gold">{n.tag}</span>
                  <p className="line-clamp-2 text-[14px] font-medium leading-snug text-ice">{n.titulo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-[12px] text-slate">
          Super Carros Alphaville · Business & Lifestyle
        </p>
      </div>
    </div>
  );
}
