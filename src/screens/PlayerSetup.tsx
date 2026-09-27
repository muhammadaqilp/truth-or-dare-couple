import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackHeader } from "../components/BackHeader";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { useGame } from "../state/GameContext";
import { storage } from "../lib/storage";

export default function PlayerSetup() {
  const navigate = useNavigate();
  const { setPlayers, resetDeck } = useGame();
  const saved = storage.getPlayers();
  const [name1, setName1] = useState(saved?.[0]?.name ?? "");
  const [name2, setName2] = useState(saved?.[1]?.name ?? "");

  const canStart = name1.trim().length > 0 && name2.trim().length > 0;

  const handleStart = () => {
    if (!canStart) return;
    setPlayers(name1, name2);
    resetDeck();
    navigate("/play");
  };

  return (
    <Screen>
      <BackHeader />
      <div className="flex-1 flex flex-col">
        <h1 className="font-display text-2xl font-semibold mb-1">Siapa yang main?</h1>
        <p className="text-text-soft text-sm mb-8">Isi nama kalian dulu, ya.</p>

        <label className="text-sm font-medium text-text-soft mb-2">Nama kamu</label>
        <input
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          placeholder="Contoh: Sarah"
          maxLength={20}
          className="w-full rounded-2xl bg-white border border-line px-4 py-4 mb-5 text-[15px] outline-none focus:border-primary transition-colors"
        />

        <label className="text-sm font-medium text-text-soft mb-2">Nama pasanganmu</label>
        <input
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          placeholder="Contoh: Alex"
          maxLength={20}
          className="w-full rounded-2xl bg-white border border-line px-4 py-4 text-[15px] outline-none focus:border-primary transition-colors"
        />
      </div>
      <Button onClick={handleStart} disabled={!canStart}>
        Mulai
      </Button>
    </Screen>
  );
}
