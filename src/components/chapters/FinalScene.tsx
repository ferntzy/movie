import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BirthdayData } from "../../types";

interface FinalSceneProps {
  data: BirthdayData;
  onExit: () => void;
}

type Stage = "lines" | "button" | "loading" | "done";

export default function FinalScene({ data, onExit }: FinalSceneProps) {
  const [stage, setStage] = useState<Stage>("lines");

  const lines = [
    "Another year has been completed.",
    "Another one is beginning.",
    "Whatever comes next...",
    "Lets face it together",
  ];

  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center px-6 py-24 text-center bg-void">
      <AnimatePresence mode="wait">
        {stage === "lines" && (
          <motion.div
            key="lines"
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6 max-w-lg"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="font-mono text-ember text-xs tracking-widest2 uppercase mb-4"
            >
              Next Season
            </motion.p>

            {lines.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 1.4, duration: 1 }}
                className="font-serif italic text-parchment/85 text-lg md:text-xl"
              >
                {line}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + lines.length * 1.4, duration: 1 }}
              className="font-serif italic text-parchment text-lg md:text-xl mt-2"
            >
              {data.birthdayMessage}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + (lines.length + 1.6) * 1.4, duration: 1 }}
              className="font-display text-3xl md:text-5xl text-parchment uppercase mt-4"
            >
              Happy Birthday, {data.nickname}.
            </motion.h2>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + (lines.length + 3) * 1.4, duration: 1 }}
              onClick={() => setStage("button")}
              className="flex items-center gap-2 bg-crimson hover:bg-ember text-parchment px-7 py-3.5 rounded-sm font-semibold text-sm md:text-base transition-colors duration-200 mt-8"
            >
              Start Another Year
            </motion.button>
          </motion.div>
        )}

        {stage === "button" && (
          <motion.div
            key="button-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setTimeout(() => setStage("loading"), 400)}
          />
        )}

        {stage === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setTimeout(() => setStage("done"), 1600)}
            className="font-mono text-smoke text-sm tracking-widest2 uppercase"
          >
            Loading<span className="animate-pulse">...</span>
          </motion.div>
        )}

        {stage === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="font-serif italic text-parchment text-xl md:text-2xl max-w-md">
              Your next chapter is already in progress.
            </p>
            <button
              onClick={onExit}
              className="font-mono text-xs tracking-widest2 uppercase text-parchment/70 hover:text-parchment border border-white/15 hover:border-white/30 rounded-sm px-6 py-3 transition-colors duration-200"
            >
              Back to the Special
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
