import { motion } from "framer-motion";
import type { BirthdayData } from "../../types";
import ContinueButton from "../ContinueButton";

interface ChapterProps {
  data: BirthdayData;
  onContinue: () => void;
}

const LEAD_LINES = [
  "There's still so much ahead.",
  "Places you haven't seen.",
  "Things you haven't tried.",
  "Dreams that haven't happened yet.",
  "Versions of yourself you haven't met yet.",
];

export default function Chapter06Future({ data, onContinue }: ChapterProps) {
  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center px-5 md:px-12 py-24 text-center">
      <p className="font-mono text-ember text-xs tracking-widest2 uppercase mb-2">Chapter 06</p>
      <h2 className="font-display text-4xl md:text-6xl text-parchment uppercase mb-12">
        What's Next?
      </h2>

      <div className="flex flex-col gap-2.5 mb-14 max-w-lg">
        {LEAD_LINES.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.5, duration: 0.7 }}
            className="font-serif italic text-parchment/85 text-lg md:text-xl"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mb-16">
        {data.futureGoals.map((goal, i) => (
          <motion.div
            key={goal.text + i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.6 + i * 0.15, duration: 0.5 }}
            className="bg-charcoal border border-white/10 rounded-md px-5 py-4 text-left"
          >
            <p className="font-serif text-parchment text-base">{goal.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 3.2, duration: 0.8 }}
      >
        <p className="font-mono text-ember text-xs tracking-widest2 uppercase mb-2">
          Next Season
        </p>
        <p className="font-display text-2xl md:text-3xl text-parchment uppercase mb-2">
          Coming Soon
        </p>
        <p className="font-serif italic text-smoke text-sm">
          No release date. Because the best parts haven't happened yet.
        </p>
      </motion.div>

      <ContinueButton onClick={onContinue} label="Continue to Premiere" />
    </div>
  );
}
