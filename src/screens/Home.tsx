import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
export default function Home() {
  const navigate = useNavigate();

  return (
    <Screen className="items-center justify-between">
      <div className="w-full flex justify-end">
        <button
          onClick={() => navigate("/settings")}
          aria-label="Pengaturan"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-[var(--shadow-soft)] active:scale-95 transition-transform"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-soft">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center text-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-40 h-52 mb-8"
        >
          <div className="absolute inset-0 rotate-[-8deg] rounded-3xl bg-secondary/70 shadow-[var(--shadow-soft)]" />
          <div className="absolute inset-0 rotate-[6deg] rounded-3xl bg-white shadow-[var(--shadow-soft)]" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-primary-dark shadow-[var(--shadow-float)] flex items-center justify-center">
            <span className="text-5xl">❤️</span>
          </div>
        </motion.div>
        <h1 className="font-display text-3xl font-semibold text-text">Truth or Dare</h1>
        <p className="text-text-soft mt-3 text-[15px] leading-relaxed max-w-[280px]">
          Jawab jujur. Jangan intip.
        </p>
      </div>
      <div className="w-full flex flex-col gap-3">
        <Button onClick={() => navigate("/setup")}>Mulai Main</Button>
        <Button variant="secondary" onClick={() => navigate("/memories")}>
          Kenangan Kita
        </Button>
        <button
          onClick={() => navigate("/how-to-play")}
          className="text-text-soft text-sm py-2 active:opacity-60"
        >
          Cara Main
        </button>
      </div>
    </Screen>
  );
}
