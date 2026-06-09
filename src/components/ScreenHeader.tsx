import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

/** Lightweight header with optional back button for inner screens. */
export default function ScreenHeader({
  title,
  subtitle,
  back = false,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 pb-3 pl-5 pr-20 pt-[calc(env(safe-area-inset-top)+1rem)]">
      {back && (
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full vp-circle text-ice active:scale-90"
          aria-label="Voltar"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      <div>
        {subtitle && <p className="label-eyebrow">{subtitle}</p>}
        <h1 className="t-headline mt-1 text-ice">{title}</h1>
      </div>
    </div>
  );
}
