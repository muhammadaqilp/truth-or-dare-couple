import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";

interface Props {
  onPlayAgain: () => void;
  onViewMemories: () => void;
}

export default function DeckEmptyScreen({ onPlayAgain, onViewMemories }: Props) {
  return (
    <Screen className="items-center justify-center text-center">
      <div className="text-6xl mb-6">❤️</div>
      <h1 className="font-display text-2xl font-semibold mb-3">Kartu kalian habis</h1>
      <p className="text-text-soft text-[15px] mb-10 max-w-[280px]">
        Tapi kayaknya masih banyak yang belum dibahas.
      </p>
      <div className="w-full flex flex-col gap-3">
        <Button onClick={onPlayAgain}>Main Lagi</Button>
        <Button variant="secondary" onClick={onViewMemories}>
          Lihat Kenangan
        </Button>
      </div>
    </Screen>
  );
}
