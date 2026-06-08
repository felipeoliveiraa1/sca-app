import { motion } from "framer-motion";
import { BadgeCheck, Gem } from "lucide-react";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label-eyebrow">{children}</p>;
}

export function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="t-headline mt-1.5 text-ice">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function TierBadge({ tier }: { tier: string }) {
  const gold = tier === "Founder" || tier === "Diamond";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        gold ? "bg-gold/15 text-gold" : "bg-white/[0.08] text-ice/70"
      }`}
    >
      {gold && <Gem size={11} strokeWidth={2.2} />}
      {tier}
    </span>
  );
}

export function VerifiedSeal({ className = "" }: { className?: string }) {
  return <BadgeCheck size={16} className={`text-[#2997ff] ${className}`} strokeWidth={2.2} />;
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="t-title font-semibold text-ice">{value}</div>
      <div className="mt-1 text-[12px] text-slate">{label}</div>
    </div>
  );
}

/** Fade/slide-in wrapper for staggered list reveals (Apple-style scroll reveal). */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GoldDivider() {
  return <div className="my-8 h-px w-full bg-white/[0.08]" />;
}
