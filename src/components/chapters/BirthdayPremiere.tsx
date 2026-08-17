import { motion } from "framer-motion";
import type { BirthdayData } from "../../types";
import ContinueButton from "../ContinueButton";

interface PremiereProps {
  data: BirthdayData;
  onContinue: () => void;
}

export default function BirthdayPremiere({ data, onContinue }: PremiereProps) {
  return (
    <div className="relative min-h-full w-full flex flex-col items-center justify-center px-5 md:px-12 py-24 text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${data.finalPhoto})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/85 to-void" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-ember text-xs md:text-sm tracking-widest2 uppercase mb-4"
        >
          Today
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-8xl text-parchment uppercase leading-[0.95] mb-3"
        >
          {data.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="font-display text-xl md:text-2xl text-ember tracking-cinema uppercase mb-2"
        >
          Birthday Premiere
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="font-mono text-smoke text-xs tracking-wide uppercase mb-14"
        >
          Available for one day only
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-ember/60 shadow-2xl shadow-crimson/20 mb-10"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${data.finalPhoto})` }}
          />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="font-serif text-3xl md:text-5xl text-parchment mb-2"
        >
          Happy Birthday
        </motion.h3>

        {data.age && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.7 }}
            className="font-mono text-smoke text-xs tracking-widest2 uppercase"
          >
            {data.birthday}
          </motion.p>
        )}
      </div>

      <div className="relative z-10">
        <ContinueButton onClick={onContinue} label="Continue" />
      </div>
    </div>
  );
}
