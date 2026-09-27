import { storage } from "./storage";

export function haptic(pattern: number | number[] = 10) {
  if (!storage.getSettings().haptics) return;
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* not supported on this device */
    }
  }
}
