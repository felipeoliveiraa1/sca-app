import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Transição rápida estilo splash: a nova tela surge do topo com fade + leve escala. */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99, transition: { duration: 0.14 } }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-full"
    >
      {children}
    </motion.div>
  );
}
