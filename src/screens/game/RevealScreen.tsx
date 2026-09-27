import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";
import { haptic } from "../../lib/haptics";
import { sound } from "../../lib/sound";

interface Props {
  prompt: string;
  player1Name: string;
  player1Answer: string;
  player2Name: string;
  player2Answer: string;
  onReveal: () => void;
  onDone: () => void;
}

type Phase = "ready" | "counting" | "revealed";

export default function RevealScreen({ prompt, player1Name, player1Answer, player2Name, player2Answer, onReveal, onDone }: Props) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [count, setCount] = useState(3);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (phase !== "counting") return;
    if (count === 0) {
      sound.reveal();
      haptic([10, 40, 10]);
      setPhase("revealed");
      onReveal();
      setTimeout(() => setSaved(true), 500);
      return;
    }
    sound.countdown();
    haptic(6);
    const t = setTimeout(() => setCount((c) => c - 1), 650);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, count]);

  const startReveal = () => {
    setPhase("counting");
    setCount(3);
  };

  return (
    <Screen className="items-center">
      {phase !== "revealed" && (
        <div className="text-center mt-2 mb-6">
          <p className="text-text-soft text-sm">❤️ Dua-duanya sudah jawab.</p>
          <h1 className="font-display text-2xl font-semibold mt-1">Siap buka jawaban?</h1>
        </div>
      )}

      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === "ready" && (
            <motion.div key="ready" exit={{ opacity: 0, scale: 0.9 }} className="text-6xl">
              🔒
            </motion.div>
          )}

          {phase === "counting" && (
            <motion.div
              key={`count-${count}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ duration: 0.35 }}
              className="text-7xl font-display font-semibold text-primary"
            >
              {count}
            </motion.div>
          )}

          {phase === "revealed" && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col gap-4"
            >
              <p className="text-center text-primary text-xs font-semibold mb-1">❤️ JAWABAN KALIAN</p>
              <p className="text-center text-text-soft text-sm mb-2 px-2">{prompt}</p>

              {[{ name: player1Name, answer: player1Answer }, { name: player2Name, answer: player2Answer }].map(
                (p, i) => (
                  <motion.div
                    key={p.name + i}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="bg-white rounded-2xl p-4 shadow-[var(--shadow-card)]"
                  >
                    <p className="text-xs font-semibold text-primary mb-1">{p.name}</p>
                    <p className="text-[15px] leading-relaxed">{p.answer || "(nggak diisi)"}</p>
                  </motion.div>
                ),
              )}

              <AnimatePresence>
                {saved && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-text-soft text-xs mt-2"
                  >
                    📖 Disimpan ke Kenangan
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full">
        {phase === "ready" && <Button onClick={startReveal}>Buka Jawaban</Button>}
        {phase === "revealed" && (
          <Button onClick={onDone} disabled={!saved}>
            Lanjut
          </Button>
        )}
      </div>
    </Screen>
  );
}
