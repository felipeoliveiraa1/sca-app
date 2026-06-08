import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { FALLBACK_IMG } from "@/data/assets";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
}

/** Image that gracefully falls back to a local gallery asset on error, and
 *  reacts to `src` changes (so reused <Img> elements update, e.g. in stories). */
export default function Img({ src, fallback = FALLBACK_IMG, alt = "", ...rest }: Props) {
  const [current, setCurrent] = useState(src);

  // Keep the displayed image in sync when the src prop changes.
  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      loading="lazy"
      onError={() => current !== fallback && setCurrent(fallback)}
    />
  );
}
