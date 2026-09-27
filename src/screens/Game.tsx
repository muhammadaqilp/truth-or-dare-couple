import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORY_META } from "../data/cards";
import { haptic } from "../lib/haptics";
import { sound } from "../lib/sound";
import { useGame } from "../state/GameContext";
import DeckEmptyScreen from "./game/DeckEmptyScreen";
import HandoverScreen from "./game/HandoverScreen";
import RevealScreen from "./game/RevealScreen";
import TruthAnswerScreen from "./game/TruthAnswerScreen";

export default function Game() {
  const navigate = useNavigate();
  const {
    state,
    cardsRemaining,
    currentPlayer,
    answeringPlayer,
    drawCard,
    finishFlip,
    startTruthAnswer,
    submitAnswer,
    confirmHandover,
    completeReveal,
    completeDare,
    nextTurn,
    resetDeck,
  } = useGame();

  const [toast, setToast] = useState(false);
  const { stage, currentCard } = state;

  useEffect(() => {
    if (!state.player1.name || !state.player2.name) {
      navigate("/setup", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.player1.name || !state.player2.name) return null;

  if (stage === "handover") {
    return (
      <HandoverScreen
        nextPlayerName={answeringPlayer?.name ?? ""}
        onReady={() => {
          haptic(8);
          confirmHandover();
        }}
      />
    );
  }

  if (stage === "truth-answer" && currentCard && answeringPlayer) {
    return (
      <TruthAnswerScreen
        key={answeringPlayer.id}
        playerName={answeringPlayer.name}
        prompt={currentCard.content}
        onSubmit={(text) => {
          sound.submit();
          haptic(10);
          submitAnswer(text);
        }}
      />
    );
  }

  if (stage === "reveal-answers" && currentCard) {
    return (
      <RevealScreen
        prompt={currentCard.content}
        player1Name={state.player1.name}
        player1Answer={state.p1Answer}
        player2Name={state.player2.name}
        player2Answer={state.p2Answer}
        onReveal={() => completeReveal()}
        onDone={() => nextTurn()}
      />
    );
  }

  if (stage === "deck-empty") {
    return (
      <DeckEmptyScreen
        onPlayAgain={() => {
          resetDeck();
        }}
        onViewMemories={() => navigate("/memories")}
      />
    );
  }

  // stages: deck | flipping | card | dare-action
  const isFlipped = stage === "flipping" || stage === "card" || stage === "dare-action";
  const meta = currentCard ? CATEGORY_META[currentCard.category] : null;
  const typeInfo = currentCard?.type === "dare" ? { emoji: "🔥", label: "DARE" } : { emoji: "❤️", label: "TRUTH" };

  return (
    <div className="min-h-svh flex flex-col px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/home")}
          aria-label="Keluar"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-[var(--shadow-soft)] active:scale-95 transition-transform"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-xs text-text-soft">Giliran</p>
          <p className="font-semibold text-[15px]">{currentPlayer.name}</p>
        </div>
        <button
          onClick={() => navigate("/memories")}
          aria-label="Kenangan"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-[var(--shadow-soft)] active:scale-95 transition-transform text-sm"
        >
          📖
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* deck stack behind */}
        {stage === "deck" && (
          <>
            <div className="absolute w-64 h-[22rem] rounded-3xl bg-secondary/50 rotate-[-7deg] translate-y-2 shadow-[var(--shadow-soft)]" />
            <div className="absolute w-64 h-[22rem] rounded-3xl bg-white rotate-[5deg] translate-y-1 shadow-[var(--shadow-soft)]" />
          </>
        )}

        <div style={{ perspective: 1200 }} className="relative w-64 h-[22rem]">
          <motion.div
            animate={
              stage === "flipping"
                ? { y: [0, -16, 0], rotateY: 180 }
                : { y: 0, rotateY: isFlipped ? 180 : 0 }
            }
            transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={() => {
              if (stage === "flipping") finishFlip();
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-0 rounded-3xl"
          >
            {/* front — deck back design */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-float)] flex flex-col items-center justify-center gap-3"
            >
              <span className="text-5xl">❤️</span>
              <p className="text-white font-display font-semibold text-lg tracking-wide">TRUTH OR</p>
              <p className="text-white font-display font-semibold text-lg tracking-wide -mt-3">DARE</p>
            </div>

            {/* back — content */}
            <div
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              className="absolute inset-0 rounded-3xl bg-white shadow-[var(--shadow-card)] flex flex-col items-center px-5 py-7 overflow-y-auto"
            >
              <span className="text-4xl mb-2">{typeInfo.emoji}</span>
              <p className="font-display font-bold text-lg text-primary tracking-wide mb-1">{typeInfo.label}</p>
              {meta && (
                <span className="text-[11px] font-medium text-text-soft bg-muted rounded-full px-2.5 py-0.5 mb-4">
                  {meta.emoji} {meta.label}
                </span>
              )}
              <AnimatePresence>
                {stage !== "flipping" && currentCard && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-center text-[15px] leading-relaxed font-medium mt-1"
                  >
                    {currentCard.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pb-2">
        {stage === "deck" && (
          <>
            <p className="text-center text-text-soft text-xs mb-4">{cardsRemaining} kartu tersisa</p>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                sound.pickup();
                haptic(10);
                drawCard();
              }}
              className="w-full rounded-2xl px-6 py-4 text-[15px] font-semibold bg-primary text-white shadow-[0_8px_20px_-6px_rgba(233,30,99,0.55)]"
            >
              Ambil Kartu
            </motion.button>
          </>
        )}

        {stage === "card" && currentCard?.type === "truth" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              haptic(8);
              startTruthAnswer();
            }}
            className="w-full rounded-2xl px-6 py-4 text-[15px] font-semibold bg-primary text-white shadow-[0_8px_20px_-6px_rgba(233,30,99,0.55)]"
          >
            Aku Jawab
          </motion.button>
        )}

        {stage === "card" && currentCard?.type === "dare" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2.5">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                sound.saved();
                haptic([8, 30, 8]);
                completeDare(true);
                setToast(true);
                setTimeout(() => setToast(false), 1600);
                nextTurn();
              }}
              className="w-full rounded-2xl px-6 py-4 text-[15px] font-semibold bg-primary text-white shadow-[0_8px_20px_-6px_rgba(233,30,99,0.55)]"
            >
              Sudah, selesai!
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                completeDare(false);
                setToast(true);
                setTimeout(() => setToast(false), 1600);
                nextTurn();
              }}
              className="w-full rounded-2xl px-6 py-4 text-[15px] font-semibold bg-white text-text-soft border border-line"
            >
              Lewati
            </motion.button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-text text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-[var(--shadow-float)]"
          >
            📖 Disimpan ke Kenangan
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
