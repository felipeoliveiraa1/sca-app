import { useEffect, useState } from "react";

function diff(target: number) {
  const total = Math.max(0, target - Date.now());
  const dias = Math.floor(total / 86400000);
  const horas = Math.floor((total % 86400000) / 3600000);
  const min = Math.floor((total % 3600000) / 60000);
  const seg = Math.floor((total % 60000) / 1000);
  return { dias, horas, min, seg };
}

function BoxedCell({ v, label }: { v: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass-strong flex h-14 w-14 items-center justify-center rounded-2xl">
        <span className="font-display text-2xl font-semibold text-ice tabular-nums">
          {String(v).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] uppercase tracking-widest text-slate">{label}</span>
    </div>
  );
}

function PlainCell({ v, label }: { v: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-[34px] font-semibold leading-none text-ice tabular-nums">
        {String(v).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-widest text-slate">{label}</span>
    </div>
  );
}

export default function Countdown({
  iso,
  variant = "boxed",
}: {
  iso: string;
  variant?: "boxed" | "plain";
}) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const Cell = variant === "plain" ? PlainCell : BoxedCell;
  const sep =
    variant === "plain"
      ? "font-display pb-4 text-2xl font-semibold text-slate"
      : "font-display pb-5 text-xl text-gold/60";

  return (
    <div className="flex items-center gap-2.5">
      <Cell v={t.dias} label="dias" />
      <span className={sep}>:</span>
      <Cell v={t.horas} label="hrs" />
      <span className={sep}>:</span>
      <Cell v={t.min} label="min" />
      <span className={sep}>:</span>
      <Cell v={t.seg} label="seg" />
    </div>
  );
}
