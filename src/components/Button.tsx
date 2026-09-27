import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { haptic } from "../lib/haptics";
import { sound } from "../lib/sound";

type Variant = "primary" | "secondary" | "ghost";

interface Props {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_8px_20px_-6px_rgba(233,30,99,0.55)] active:shadow-none",
  secondary:
    "bg-white text-primary border border-secondary",
  ghost: "bg-transparent text-text-soft",
};

export function Button({ children, variant = "primary", onClick, fullWidth = true, className = "", disabled }: Props) {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.96 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        haptic(8);
        sound.tap();
        onClick?.();
      }}
      className={`${fullWidth ? "w-full" : ""} rounded-2xl px-6 py-4 text-[15px] font-semibold tracking-tight transition-colors disabled:opacity-40 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
