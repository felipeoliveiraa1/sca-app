import { motion } from "framer-motion";
import { LOGO_SCA } from "@/data/assets";

/** Cinematic splash: gold SCA mark reveals over black with a soft glow,
 *  then the whole layer fades out into the app. */
export default function Splash() {
  return (
    <motion.div
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* glow */}
      <motion.div
        className="absolute h-80 w-80 rounded-full bg-gold/25 blur-[110px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0.7], scale: [0.5, 1.15, 1] }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-radial-gold opacity-60" />

      <motion.img
        src={LOGO_SCA}
        alt="Super Carros Alphaville"
        className="relative h-9 w-auto drop-shadow-[0_2px_18px_rgba(212,175,55,0.35)]"
        initial={{ opacity: 0, scale: 0.82, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="relative mt-5 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 170, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.p
        className="relative mt-4 text-[10px] font-medium uppercase tracking-[0.55em] text-slate"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Super Carros Alphaville
      </motion.p>
    </motion.div>
  );
}
