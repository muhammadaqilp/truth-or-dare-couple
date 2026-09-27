import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackHeader } from "../components/BackHeader";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Screen } from "../components/Screen";
import { storage } from "../lib/storage";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 rounded-full relative transition-colors ${checked ? "bg-primary" : "bg-line"}`}
      aria-pressed={checked}
    >
      <motion.div
        animate={{ x: checked ? 22 : 2 }}
        transition={{ duration: 0.2 }}
        className="absolute top-1 left-0 w-5 h-5 rounded-full bg-white shadow"
      />
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(storage.getSettings());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const update = (patch: Partial<typeof settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    storage.setSettings(next);
    if ("reducedMotion" in patch) {
      document.documentElement.classList.toggle("reduce-motion", next.reducedMotion);
    }
  };

  return (
    <Screen>
      <BackHeader title="Pengaturan" />

      <div className="flex flex-col gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)] flex items-center justify-between">
          <div>
            <p className="font-medium text-[15px]">Suara</p>
            <p className="text-text-soft text-xs mt-0.5">Bunyi lembut saat main</p>
          </div>
          <Toggle checked={settings.sound} onChange={(v) => update({ sound: v })} />
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)] flex items-center justify-between">
          <div>
            <p className="font-medium text-[15px]">Getar</p>
            <p className="text-text-soft text-xs mt-0.5">Haptic feedback</p>
          </div>
          <Toggle checked={settings.haptics} onChange={(v) => update({ haptics: v })} />
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)] flex items-center justify-between">
          <div>
            <p className="font-medium text-[15px]">Kurangi Animasi</p>
            <p className="text-text-soft text-xs mt-0.5">Transisi lebih sederhana</p>
          </div>
          <Toggle checked={settings.reducedMotion} onChange={(v) => update({ reducedMotion: v })} />
        </div>
      </div>

      <button
        onClick={() => navigate("/how-to-play")}
        className="text-left bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)] mb-3 font-medium text-[15px]"
      >
        Cara Main
      </button>

      <button
        onClick={() => setConfirmDelete(true)}
        className="text-left bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)] mb-3 font-medium text-[15px] text-primary"
      >
        Hapus Semua Kenangan
      </button>

      <div className="bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)] mb-3">
        <p className="font-medium text-[15px] mb-1">Tentang</p>
        <p className="text-text-soft text-xs leading-relaxed">
          Truth or Dare buat kamu dan pasangan. Semua jawaban tersimpan di device kamu sendiri — nggak ada yang
          dikirim ke mana-mana.
        </p>
      </div>

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        {deleted ? (
          <p className="text-center text-[15px] font-medium py-2">Semua kenangan sudah dihapus. 🤍</p>
        ) : (
          <>
            <h3 className="font-display text-lg font-semibold mb-2 text-center">Hapus semua kenangan?</h3>
            <p className="text-text-soft text-sm text-center mb-6">
              Semua pertanyaan dan jawaban yang tersimpan bakal hilang permanen. Nggak bisa dibalikin.
            </p>
            <div className="flex flex-col gap-2.5">
              <Button
                variant="primary"
                onClick={() => {
                  storage.clearMemories();
                  setDeleted(true);
                  setTimeout(() => {
                    setConfirmDelete(false);
                    setDeleted(false);
                  }, 1200);
                }}
              >
                Ya, Hapus
              </Button>
              <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
                Batal
              </Button>
            </div>
          </>
        )}
      </Modal>
    </Screen>
  );
}
