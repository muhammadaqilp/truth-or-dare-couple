import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home", { replace: true }), 1400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF0F5] to-bg">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-6xl mb-4"
      >
        ❤️
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="font-display text-2xl font-semibold text-text"
      >
        Truth or Dare
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-text-soft text-sm mt-2"
      >
        buat kamu &amp; pasangan
      </motion.p>
    </div>
  );
}
