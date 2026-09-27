import { motion } from "framer-motion";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";

interface Props {
  nextPlayerName: string;
  onReady: () => void;
}

export default function HandoverScreen({ nextPlayerName, onReady }: Props) {
  return (
    <Screen className="items-center justify-center text-center">
      <motion.div
        animate={{ rotate: [0, -8, 8, -8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }}
        className="text-6xl mb-6"
      >
        🔄
      </motion.div>
      <h1 className="font-display text-2xl font-semibold mb-3">Gantian dulu</h1>
      <p className="text-text-soft text-[15px] mb-1">Jangan intip, ya. 😏</p>
      <p className="text-text-soft text-[15px] mb-10">
        Sekarang kasih HP-nya ke {nextPlayerName}.
      </p>
      <div className="w-full">
        <Button onClick={onReady}>Siap</Button>
      </div>
    </Screen>
  );
}
