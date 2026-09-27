import { useState } from "react";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";

interface Props {
  playerName: string;
  prompt: string;
  onSubmit: (text: string) => void;
}

export default function TruthAnswerScreen({ playerName, prompt, onSubmit }: Props) {
  const [text, setText] = useState("");

  return (
    <Screen>
      <div className="text-center mb-6">
        <span className="inline-block text-xs font-semibold tracking-wide text-primary bg-secondary/60 rounded-full px-3 py-1">
          GILIRAN {playerName.toUpperCase()}
        </span>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-[var(--shadow-soft)] mb-5">
        <p className="text-xs font-semibold text-primary mb-2">❤️ TRUTH</p>
        <p className="text-[17px] leading-relaxed font-medium">{prompt}</p>
      </div>

      <p className="text-text-soft text-sm text-center mb-4">Jangan kasih lihat jawabanmu ke pasanganmu. 👀</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tulis jawabanmu..."
        rows={5}
        autoFocus
        className="w-full flex-1 rounded-2xl bg-white border border-line px-4 py-4 text-[15px] outline-none focus:border-primary transition-colors resize-none mb-4"
      />

      <Button onClick={() => onSubmit(text.trim())} disabled={text.trim().length === 0}>
        Simpan Jawaban
      </Button>
    </Screen>
  );
}
