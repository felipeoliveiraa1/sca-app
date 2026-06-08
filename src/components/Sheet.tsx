import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import Portal from "./Portal";

/** Bottom sheet modal used across the app for details, RSVP, check-in, etc. */
export default function Sheet({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}) {
  return (
    <Portal>
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="relative max-h-[88%] w-full max-w-[460px] overflow-y-auto rounded-t-[28px] border-t border-white/10 bg-ink-600 pb-8 no-scrollbar"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-ink-600/95 px-5 pb-3 pt-4 backdrop-blur">
              <div className="mx-auto h-1 w-10 rounded-full bg-white/20" />
            </div>
            {title && (
              <div className="px-5 pb-2">
                <h3 className="t-title text-ice">{title}</h3>
              </div>
            )}
            <div className="px-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </Portal>
  );
}
