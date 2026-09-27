import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackHeader } from "../components/BackHeader";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { storage } from "../lib/storage";
import type { Memory } from "../types";

type Filter = "semua" | "truth" | "dare" | "love" | "funny" | "deep" | "future";

const filters: { key: Filter; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "truth", label: "Truth" },
  { key: "dare", label: "Dare" },
  { key: "love", label: "Love" },
  { key: "funny", label: "Funny" },
  { key: "deep", label: "Deep" },
  { key: "future", label: "Future" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function matchesFilter(m: Memory, f: Filter) {
  if (f === "semua") return true;
  if (f === "truth" || f === "dare") return m.type === f;
  return m.category === f;
}

export default function Memories() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("semua");
  const memories = storage.getMemories();

  const filtered = useMemo(() => memories.filter((m) => matchesFilter(m, filter)), [memories, filter]);

  if (memories.length === 0) {
    return (
      <Screen>
        <BackHeader title="Kenangan Kita" />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-5">📖</div>
          <h2 className="font-display text-xl font-semibold mb-2">Belum ada kenangan</h2>
          <p className="text-text-soft text-[15px] mb-8 max-w-[260px]">
            Main dulu. Nanti momen-momen favorit kalian bakal muncul di sini.
          </p>
          <div className="w-full">
            <Button onClick={() => navigate("/setup")}>Mulai Main</Button>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <BackHeader title="Kenangan Kita" />

      <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.key ? "bg-primary text-white" : "bg-white text-text-soft border border-line"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-text-soft text-sm text-center mt-8">Belum ada yang cocok di filter ini.</p>
        )}
        {filtered.map((m) => (
          <button
            key={m.id}
            onClick={() => navigate(`/memories/${m.id}`)}
            className="text-left bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)] active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-primary bg-secondary/50 rounded-full px-2.5 py-0.5">
                {m.type === "truth" ? "❤️ TRUTH" : "🔥 DARE"}
              </span>
              <span className="text-[11px] text-text-soft">{formatDate(m.createdAt)}</span>
            </div>
            <p className="text-[14px] font-medium leading-snug line-clamp-2">{m.prompt}</p>
            {m.type === "truth" ? (
              <p className="text-[13px] text-text-soft mt-1.5 line-clamp-1">
                {m.player1Name}: {m.player1Answer} · {m.player2Name}: {m.player2Answer}
              </p>
            ) : (
              <p className="text-[13px] text-text-soft mt-1.5">
                {m.dareCompleted ? "Selesai dilakukan ✅" : "Dilewati"}
              </p>
            )}
          </button>
        ))}
      </div>
    </Screen>
  );
}
