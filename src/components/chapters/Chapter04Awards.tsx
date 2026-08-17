import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import type { BirthdayData } from "../../types";
import ContinueButton from "../ContinueButton";
interface ChapterProps {
  data: BirthdayData;
  onContinue: () => void;
}

export default function Chapter04Awards({ data, onContinue }: ChapterProps) {
  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center px-5 md:px-12 py-24 text-center">
      <p className="font-mono text-ember text-xs tracking-widest2 uppercase mb-2">Chapter 04</p>
      <h2 className="font-display text-4xl md:text-6xl text-parchment uppercase mb-3">
        Her Awards
      </h2>
      <p className="text-smoke text-sm mb-12">Awarded, by unanimous decision.</p>

      <ul className="space-y-4 mb-16 w-full max-w-md">
        {data.awards.map((award, i) => (
          <motion.li
            key={award.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="flex items-center gap-4 bg-charcoal border border-white/10 rounded-md px-5 py-4 text-left"
          >
            <span className="flex-none w-9 h-9 rounded-full bg-crimson/15 border border-ember/30 flex items-center justify-center">
              <Trophy size={17} className="text-ember" strokeWidth={1.75} />
            </span>
            <span className="font-serif text-parchment text-base md:text-lg">{award.title}</span>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="border border-ember/40 rounded-md px-8 py-8 max-w-md bg-gradient-to-b from-crimson/10 to-transparent"
      >
        <p className="font-mono text-ember text-xs tracking-widest2 uppercase mb-3">
          Special Award
        </p>
        <p className="font-serif italic text-parchment text-xl mb-4">
          "Best Person To Ever Exist"
        </p>
        <p className="font-mono text-xs tracking-widest2 uppercase text-smoke mb-1">Recipient</p>
        <p className="font-display text-2xl text-parchment uppercase">
          {data.specialAwardRecipientNote}
        </p>
      </motion.div>

      <ContinueButton onClick={onContinue} />
    </div>
  );
}
