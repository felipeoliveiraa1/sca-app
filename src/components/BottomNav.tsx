import { NavLink } from "react-router-dom";
import { Home, CalendarDays, Users, Gem, Mic, type LucideIcon } from "lucide-react";

const tabs: { to: string; label: string; Icon: LucideIcon; end?: boolean }[] = [
  { to: "/", label: "Clube", Icon: Home, end: true },
  { to: "/edicoes", label: "Edições", Icon: CalendarDays },
  { to: "/membros", label: "Membros", Icon: Users },
  { to: "/parceiros", label: "Parceiros", Icon: Gem },
  { to: "/play", label: "Play", Icon: Mic },
];

export default function BottomNav() {
  return (
    <nav className="relative z-30 shrink-0 border-t border-white/[0.08] bg-black/60 backdrop-blur-2xl">
      <div className="flex items-stretch justify-around px-2 pb-6 pt-2.5">
        {tabs.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1.5 py-1 text-[10px] font-medium tracking-tight transition-colors ${
                isActive ? "text-ice" : "text-slate"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={21} strokeWidth={isActive ? 2.4 : 1.8} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
