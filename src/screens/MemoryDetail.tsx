import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackHeader } from "../components/BackHeader";
import { Screen } from "../components/Screen";
import { CATEGORY_META } from "../data/cards";
import { storage } from "../lib/storage";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function MemoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const memory = storage.getMemories().find((m) => m.id === id);
  const [note, setNote] = useState(memory?.note ?? "");
  const [photoUri, setPhotoUri] = useState(memory?.photoUri);
  const [savedNote, setSavedNote] = useState(false);

  if (!memory) {
    navigate("/memories", { replace: true });
    return null;
  }

  const meta = CATEGORY_META[memory.category];

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const uri = reader.result as string;
      setPhotoUri(uri);
      storage.updateMemory(memory.id, { photoUri: uri });
    };
    reader.readAsDataURL(file);
  };

  const saveNote = () => {
    storage.updateMemory(memory.id, { note });
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 1500);
  };

  return (
    <Screen>
      <BackHeader />

      <p className="text-text-soft text-sm mb-1">{formatDate(memory.createdAt)}</p>
      <span className="inline-block text-[11px] font-semibold text-primary bg-secondary/50 rounded-full px-2.5 py-0.5 mb-4 w-fit">
        {memory.type === "truth" ? "❤️ TRUTH" : "🔥 DARE"} · {meta.emoji} {meta.label}
      </span>

      <div className="bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)] mb-4">
        <p className="text-[16px] font-medium leading-relaxed">{memory.prompt}</p>
      </div>

      {memory.type === "truth" ? (
        <div className="flex flex-col gap-3 mb-5">
          <div className="bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-semibold text-primary mb-1">{memory.player1Name}</p>
            <p className="text-[15px] leading-relaxed">{memory.player1Answer}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-semibold text-primary mb-1">{memory.player2Name}</p>
            <p className="text-[15px] leading-relaxed">{memory.player2Answer}</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)] mb-5">
          <p className="text-[15px]">{memory.dareCompleted ? "Selesai dilakukan ✅" : "Dilewati saat itu"}</p>
        </div>
      )}

      {photoUri && (
        <img src={photoUri} alt="Kenangan" className="w-full rounded-2xl mb-4 object-cover max-h-64" />
      )}

      <button
        onClick={() => fileInputRef.current?.click()}
        className="text-sm text-primary font-medium mb-5 text-left active:opacity-60"
      >
        📸 {photoUri ? "Ganti foto" : "Tambahkan foto"}
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />

      <p className="text-sm font-medium text-text-soft mb-2">📝 Catatan</p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onBlur={saveNote}
        placeholder="Tambahkan catatan..."
        rows={3}
        className="w-full rounded-2xl bg-white border border-line px-4 py-3 text-[14px] outline-none focus:border-primary transition-colors resize-none mb-2"
      />
      {savedNote && <p className="text-xs text-text-soft">Tersimpan.</p>}
    </Screen>
  );
}
