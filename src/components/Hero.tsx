import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus } from "lucide-react";
import type { BirthdayData } from "../types";

interface HeroProps {
  data: BirthdayData;
  onPlay: () => void;
}

export default function Hero({ data, onPlay }: HeroProps) {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [inMyList, setInMyList] = useState(false);

  useEffect(() => {
    setTaglineIndex(Math.floor(Math.random() * data.taglines.length));
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % data.taglines.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [data.taglines.length]);

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${data.heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/20 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-12 pb-24 md:pb-32 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-ember font-mono text-xs md:text-sm tracking-widest2 uppercase mb-4"
        >
          Original Special
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.92] text-parchment mb-2 uppercase"
        >
          {data.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="font-display text-2xl md:text-3xl text-ember tracking-cinema mb-5 uppercase"
        >
          The Birthday Special
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-smoke font-mono text-xs md:text-sm tracking-wide mb-3"
        >
          {data.metadataLine}
        </motion.p>

        <div className="h-7 mb-6 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-parchment/90 italic font-serif text-base md:text-lg"
            >
              "{data.taglines[taglineIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap items-center gap-3"
        >
          <button
            onClick={onPlay}
            className="flex items-center gap-2 bg-parchment text-void px-6 md:px-7 py-3 rounded-sm font-semibold text-sm md:text-base hover:bg-white transition-colors duration-200"
          >
            <Play size={18} fill="currentColor" />
            Play
          </button>
          <button
            onClick={() => setInMyList((v) => !v)}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-parchment px-6 md:px-7 py-3 rounded-sm font-semibold text-sm md:text-base hover:bg-white/20 transition-colors duration-200 border border-white/10"
          >
            <Plus size={18} className={inMyList ? "rotate-45 transition-transform duration-300" : "transition-transform duration-300"} />
            {inMyList ? "In My List" : "My List"}
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-6 text-parchment/70 font-serif italic text-base md:text-lg max-w-lg"
        >
          {data.synopsis}
        </motion.p>
      </div>
    </section>
  );
}
