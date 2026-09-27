import { BackHeader } from "../components/BackHeader";
import { Screen } from "../components/Screen";

const steps = [
  { emoji: "🃏", title: "Ambil kartu", body: "Setiap giliran, ambil satu kartu dari deck. Bisa Truth, bisa Dare." },
  { emoji: "🤫", title: "Jawab diam-diam", body: "Kalau Truth, jawab sendiri dulu. Jangan kasih lihat ke pasanganmu." },
  { emoji: "🔄", title: "Gantian device", body: "Setelah submit, kasih HP ke pasangan. Dia jawab pertanyaan yang sama." },
  { emoji: "✨", title: "Buka bareng", body: "Setelah dua-duanya jawab, buka jawaban bareng-bareng. Baru di sini seru-nya." },
  { emoji: "📖", title: "Tersimpan otomatis", body: "Pertanyaan dan jawaban kalian otomatis masuk ke Kenangan Kita." },
  { emoji: "🔥", title: "Kalau Dare", body: "Lakukan tantangannya. Kalau nggak nyaman, boleh dilewati kapan saja." },
];

export default function HowToPlay() {
  return (
    <Screen>
      <BackHeader title="Cara Main" />
      <div className="flex-1 flex flex-col gap-4">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-4 items-start bg-white rounded-2xl p-4 shadow-[var(--shadow-soft)]">
            <div className="text-2xl shrink-0">{s.emoji}</div>
            <div>
              <h3 className="font-semibold text-[15px]">{s.title}</h3>
              <p className="text-text-soft text-sm mt-0.5 leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}
