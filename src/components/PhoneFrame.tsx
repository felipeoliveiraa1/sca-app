import type { ReactNode } from "react";

/** On desktop, centers the app inside an elegant phone frame for presentation.
 *  On a real phone it fills the screen.
 *  The #sca-overlay-root host keeps modals/stories contained to the frame
 *  (Portal renders into it), so overlays look right on phone AND big screen. */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-black bg-radial-gold md:py-8">
      <div className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-ink md:h-[900px] md:max-h-[92vh] md:rounded-[44px] md:border-[10px] md:border-[#1a1a1a] md:shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_0_1px_rgba(212,175,55,0.15)]">
        {children}
        {/* Host dos overlays (modais, stories) — fica dentro da moldura */}
        <div id="sca-overlay-root" className="pointer-events-none absolute inset-0 z-[70]" />
      </div>
    </div>
  );
}
