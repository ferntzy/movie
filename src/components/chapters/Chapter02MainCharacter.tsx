import { motion } from "framer-motion";
import type { BirthdayData } from "../../types";
import ContinueButton from "../ContinueButton";

interface ChapterProps {
  data: BirthdayData;
  onContinue: () => void;
}

export default function Chapter02MainCharacter({ data, onContinue }: ChapterProps) {
  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center px-5 md:px-12 py-24">
      <p className="font-mono text-ember text-xs tracking-widest2 uppercase mb-2 text-center">
        Chapter 02
      </p>
      <h2 className="font-display text-4xl md:text-6xl text-parchment uppercase mb-12 text-center">
        Main Character Energy
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl mb-14">
        {data.personalityPhotos.map((photo, i) => (
          <motion.div
            key={photo.src + i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square rounded-sm overflow-hidden border border-white/10"
          >
            <div
              className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-500"
              style={{ backgroundImage: `url(${photo.src})` }}
            />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-md space-y-4">
        {data.stats.map((stat, i) => (
          <div key={stat.label}>
            <div className="flex justify-between mb-1.5 font-mono text-xs uppercase tracking-wide text-parchment/80">
              <span>{stat.label}</span>
              <span className="text-ember">{stat.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-ash rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${stat.value}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-crimson to-ember rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      <ContinueButton onClick={onContinue} />
    </div>
  );
}
