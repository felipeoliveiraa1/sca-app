import type { ReactNode } from "react";

/** On desktop, centers the app inside an elegant phone frame for presentation.
 *  On a real phone it fills the screen. */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-black bg-radial-gold md:py-8">
      <div className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-ink md:h-[900px] md:max-h-[92vh] md:rounded-[44px] md:border-[10px] md:border-[#1a1a1a] md:shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_0_1px_rgba(212,175,55,0.15)]">
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ onAvatar }: { onAvatar?: () => void }) {
  return (
    <div className="relative z-30 flex shrink-0 items-center justify-between px-6 pb-1 pt-3 text-[13px] font-semibold text-ice">
      <span className="tabular-nums">20:24</span>
      <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-black md:block" />
      <div className="flex items-center gap-1.5 text-[11px]">
        <span>5G</span>
        <span>􀛨</span>
        <span className="ml-1 inline-flex h-3 w-6 items-center rounded-[3px] border border-ice/60 px-px">
          <span className="h-1.5 w-full rounded-[1px] bg-ice" />
        </span>
      </div>
    </div>
  );
}
