import { useNavigate } from "react-router-dom";

export function BackHeader({ title, onBack }: { title?: string; onBack?: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        onClick={() => (onBack ? onBack() : navigate(-1))}
        aria-label="Kembali"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-[var(--shadow-soft)] text-text active:scale-95 transition-transform"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      {title && <h1 className="text-lg font-semibold font-display">{title}</h1>}
    </div>
  );
}
