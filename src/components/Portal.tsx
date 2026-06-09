import { createPortal } from "react-dom";
import type { ReactNode } from "react";

/** Renders children into the phone-frame overlay host (so modals/stories stay
 *  contained to the frame on desktop AND fill the screen on mobile), escaping
 *  any transform/filter ancestor like the page-transition wrapper.
 *  Falls back to document.body if the host isn't mounted yet. */
export default function Portal({ children }: { children: ReactNode }) {
  if (typeof document === "undefined") return null;
  const host = document.getElementById("sca-overlay-root") ?? document.body;
  return createPortal(children, host);
}
