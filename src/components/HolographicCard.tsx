import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LOGO_SCA } from "@/data/assets";
import QRTag from "./QRTag";
import { me } from "@/data/me";
import { usePersona } from "@/store/persona";

/**
 * The SCA credential — a clean, Apple-style metallic card that reacts to device
 * tilt (gyroscope on mobile) and pointer movement (desktop) with a subtle sheen.
 */
export default function HolographicCard() {
  const { userName } = usePersona();
  const ref = useRef<HTMLDivElement>(null);
  const [granted, setGranted] = useState(false);

  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const sheenX = useTransform(ry, [-16, 16], ["10%", "90%"]);

  function onPointer(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 18);
    rx.set(-py * 18);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  useEffect(() => {
    if (!granted) return;
    function handle(e: DeviceOrientationEvent) {
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 0;
      ry.set(Math.max(-16, Math.min(16, gamma / 3)));
      rx.set(Math.max(-16, Math.min(16, (beta - 45) / 3)));
    }
    window.addEventListener("deviceorientation", handle);
    return () => window.removeEventListener("deviceorientation", handle);
  }, [granted, rx, ry]);

  async function enableTilt() {
    const D = window.DeviceOrientationEvent as any;
    if (D && typeof D.requestPermission === "function") {
      try {
        const res = await D.requestPermission();
        if (res === "granted") setGranted(true);
      } catch {
        /* ignore */
      }
    } else {
      setGranted(true);
    }
  }

  return (
    <div className="[perspective:1300px]" onPointerMove={onPointer} onPointerLeave={reset}>
      <motion.div
        ref={ref}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[1.6/1] w-full overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#3a3a3d] via-[#1a1a1c] to-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        <motion.div
          className="holo-sheen pointer-events-none absolute -inset-2"
          style={{ backgroundPositionX: sheenX, backgroundSize: "220% 100%" }}
        />
        <div className="relative flex h-full flex-col justify-between p-6" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between">
            <img src={LOGO_SCA} alt="SCA" className="h-5 w-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]" />
            <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold">
              {me.tier}
            </span>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] tracking-wide text-slate">Membro {me.numeroSocio}</p>
              <p className="t-title mt-1 text-ice">{userName || me.nome}</p>
              <p className="mt-0.5 text-[13px] text-slate">Desde {me.desde} · Alphaville</p>
            </div>
            <div className="shrink-0 rounded-xl bg-white p-1.5">
              <QRTag value="SCA-MEMBER-001" size={48} />
            </div>
          </div>
        </div>
      </motion.div>

      {!granted && "DeviceOrientationEvent" in window && (
        <button onClick={enableTilt} className="mt-3 w-full text-center text-[13px] text-slate">
          Toque e incline o aparelho para ver o reflexo
        </button>
      )}
    </div>
  );
}
