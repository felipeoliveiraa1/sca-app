import Img from "./Img";

/**
 * Reusable visionOS-style spatial backdrop: a deep dark gradient with soft
 * colored glows and an optional blurred image, giving every screen depth so the
 * frosted-glass panels (.vp-glass) read as floating.
 */
export default function SpatialBg({
  image,
  tint = "gold",
}: {
  image?: string;
  tint?: "gold" | "blue" | "dual";
}) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {image && (
        <Img src={image} alt="" className="absolute inset-x-0 top-0 h-[45%] w-full scale-110 object-cover opacity-25 blur-3xl" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black to-black" />
      {(tint === "gold" || tint === "dual") && (
        <div className="absolute -top-24 right-[-20%] h-80 w-80 rounded-full bg-gold/16 blur-[120px]" />
      )}
      {(tint === "blue" || tint === "dual") && (
        <div className="absolute top-1/3 left-[-25%] h-80 w-80 rounded-full bg-[#2997ff]/12 blur-[120px]" />
      )}
      <div className="absolute bottom-[-10%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/8 blur-[120px]" />
    </div>
  );
}
