import type { AppSettings, Memory, Player } from "../types";

const KEYS = {
  players: "tod.players",
  memories: "tod.memories",
  settings: "tod.settings",
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — game still works in-memory for this session */
  }
}

export const storage = {
  getPlayers(): [Player, Player] | null {
    return read(KEYS.players, null);
  },
  setPlayers(players: [Player, Player]) {
    write(KEYS.players, players);
  },
  getMemories(): Memory[] {
    return read(KEYS.memories, []);
  },
  addMemory(memory: Memory) {
    const all = storage.getMemories();
    all.unshift(memory);
    write(KEYS.memories, all);
  },
  updateMemory(id: string, patch: Partial<Memory>) {
    const all = storage.getMemories().map((m) => (m.id === id ? { ...m, ...patch } : m));
    write(KEYS.memories, all);
  },
  clearMemories() {
    write(KEYS.memories, []);
  },
  getSettings(): AppSettings {
    return read(KEYS.settings, { sound: true, haptics: true, reducedMotion: false });
  },
  setSettings(settings: AppSettings) {
    write(KEYS.settings, settings);
  },
};
