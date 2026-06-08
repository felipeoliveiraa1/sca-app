import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface Props {
  value: string;
  size?: number;
  /** dark module color */
  color?: string;
  /** light/background color */
  bg?: string;
}

/** Renders a real QR code (via the qrcode lib) as a data-URL image. */
export default function QRTag({ value, size = 120, color = "#0A0A0A", bg = "#ffffff00" }: Props) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(value, {
      margin: 1,
      width: size * 2,
      color: { dark: color, light: bg },
      errorCorrectionLevel: "M",
    })
      .then((u) => alive && setUrl(u))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [value, size, color, bg]);

  return url ? (
    <img src={url} width={size} height={size} alt="QR Code" style={{ width: size, height: size }} />
  ) : (
    <div style={{ width: size, height: size }} className="animate-pulse rounded bg-black/10" />
  );
}
