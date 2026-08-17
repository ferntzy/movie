import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface ContinueButtonProps {
  onClick: () => void;
  label?: string;
}

export default function ContinueButton({ onClick, label = "Continue" }: ContinueButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      onClick={onClick}
      className="group flex items-center gap-1.5 mx-auto mt-14 md:mt-16 text-parchment/75 hover:text-parchment font-mono text-xs tracking-widest2 uppercase transition-colors duration-200"
    >
      {label}
      <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
    </motion.button>
  );
}
