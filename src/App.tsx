import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { storage } from "./lib/storage";
import Game from "./screens/Game";
import Home from "./screens/Home";
import HowToPlay from "./screens/HowToPlay";
import MemoryDetail from "./screens/MemoryDetail";
import Memories from "./screens/Memories";
import PlayerSetup from "./screens/PlayerSetup";
import Settings from "./screens/Settings";
import Splash from "./screens/Splash";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", storage.getSettings().reducedMotion);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/home" element={<Home />} />
      <Route path="/setup" element={<PlayerSetup />} />
      <Route path="/how-to-play" element={<HowToPlay />} />
      <Route path="/play" element={<Game />} />
      <Route path="/memories" element={<Memories />} />
      <Route path="/memories/:id" element={<MemoryDetail />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
