import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Screen className="items-center justify-between bg-gradient-to-b from-bg to-[var(--color-bg-end)]">
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

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="w-3.5 h-px bg-accent/40" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
            <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
          </svg>
          <span className="w-3.5 h-px bg-accent/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-4xl font-semibold text-text leading-none">Truth</h1>
          <p className="font-display text-[27px] italic text-primary leading-tight mt-0.5">or Dare</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-3.5"
        >
          <p className="text-[14.5px] font-medium text-text">Jawab jujur. Jangan intip.</p>
          <p className="text-[13px] text-text-soft mt-1">Lihat jawabannya bareng.</p>
        </motion.div>

        <div className="relative w-[230px] h-[262px] mt-7 mb-2">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="relative w-full h-full"
            >
              <div className="absolute left-1/2 top-3.5 w-[180px] h-[238px] -ml-[90px] rounded-[26px] bg-secondary shadow-[var(--shadow-soft)] [transform:translateX(-16px)_rotate(-11deg)]" />
              <div className="absolute left-1/2 top-2.5 w-[180px] h-[238px] -ml-[90px] rounded-[26px] bg-card border border-line shadow-[var(--shadow-soft)] [transform:translateX(16px)_rotate(8deg)]" />
              <div className="absolute left-1/2 top-0 w-[186px] h-[246px] -ml-[93px] rounded-[28px] bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-float)] flex flex-col items-center justify-center gap-2.5 overflow-hidden [transform:rotate(-3deg)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full border border-white/50" />
                <span className="text-5xl">❤️</span>
                <div className="text-center">
                  <p className="font-display font-semibold text-lg text-white tracking-wide">TRUTH</p>
                  <p className="text-[11px] tracking-[3px] text-white/80 mt-0.5">OR DARE</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.95 }}
        className="w-full flex flex-col gap-2.5"
      >
        <Button onClick={() => navigate("/setup")}>
          <span className="flex items-center justify-center gap-2">
            Mulai Main
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Button>
        <Button variant="secondary" onClick={() => navigate("/memories")}>
          Kenangan Kita
        </Button>
        <button
          onClick={() => navigate("/how-to-play")}
          className="text-text-soft text-[13px] font-medium py-1 active:opacity-60"
        >
          Cara Main
        </button>
      </motion.div>
    </Screen>
  );
}
