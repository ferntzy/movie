import { useState } from "react";
import { motion } from "framer-motion";
import type { BirthdayData } from "../../types";
import ContinueButton from "../ContinueButton";

interface ChapterProps {
  data: BirthdayData;
  onContinue: () => void;
}

export default function Chapter03Favorites({ data, onContinue }: ChapterProps) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center px-5 md:px-12 py-24">
      <p className="font-mono text-ember text-xs tracking-widest2 uppercase mb-2 text-center">
        Chapter 03
      </p>
      <h2 className="font-display text-4xl md:text-6xl text-parchment uppercase mb-4 text-center">
        Things That Make Her Her
      </h2>
      <p className="text-smoke text-sm mb-12 text-center">Tap a card to reveal.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {data.favoriteThings.map((item, i) => {
          const isOpen = revealed.has(i);
          return (
            <motion.button
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => toggle(i)}
              className="relative text-left bg-charcoal border border-white/10 rounded-md p-5 min-h-[104px] flex flex-col justify-center hover:border-ember/50 transition-colors duration-200"
            >
              <span className="font-mono text-[10px] tracking-widest2 uppercase text-smoke mb-2">
                {isOpen ? "Answer" : "Question"}
              </span>
              <motion.span
                key={isOpen ? "a" : "q"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`font-serif text-lg ${isOpen ? "italic text-ember" : "text-parchment"}`}
              >
                {isOpen ? item.answer : item.question}
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      <ContinueButton onClick={onContinue} />
    </div>
  );
}
