import { storage } from "./storage";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, duration: number, volume = 0.05, type: OscillatorType = "sine", delay = 0) {
  if (!storage.getSettings().sound) return;
  const context = getCtx();
  if (!context) return;
  try {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(context.destination);
    const start = context.currentTime + delay;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  } catch {
    /* audio unavailable on this device */
  }
}

export const sound = {
  pickup: () => tone(340, 0.12, 0.045),
  flip: () => tone(520, 0.16, 0.05),
  tap: () => tone(600, 0.05, 0.03),
  submit: () => tone(720, 0.18, 0.05),
  countdown: () => tone(440, 0.08, 0.04),
  reveal: () => {
    tone(660, 0.22, 0.06);
    tone(880, 0.28, 0.05, "sine", 0.12);
  },
  saved: () => tone(560, 0.14, 0.04, "triangle"),
};
