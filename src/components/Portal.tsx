import { createPortal } from "react-dom";
import type { ReactNode } from "react";

/** Renders children at document.body, escaping any transform/filter ancestor
 *  (e.g. the page-transition wrapper) so `fixed` overlays cover the real viewport. */
export default function Portal({ children }: { children: ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}
