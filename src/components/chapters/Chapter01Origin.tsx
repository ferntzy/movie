import { motion } from "framer-motion";
import type { BirthdayData } from "../../types";
import ContinueButton from "../ContinueButton";

interface ChapterProps {
  data: BirthdayData;
  onContinue: () => void;
}

export default function Chapter01Origin({ data, onContinue }: ChapterProps) {
  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center px-5 md:px-12 py-24 text-center">
      <p className="font-mono text-ember text-xs tracking-widest2 uppercase mb-2">Chapter 01</p>
      <h2 className="font-display text-4xl md:text-6xl text-parchment uppercase mb-12">
        The Origin Story
      </h2>

      <div className="flex flex-col gap-2 mb-14 max-w-lg">
        {data.originText.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.5, duration: 0.6 }}
            className="font-serif italic text-parchment/85 text-lg md:text-xl"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-5 w-full max-w-2xl">
        {data.originPhotos.map((photo, i) => (
          <motion.figure
            key={photo.src + i}
            initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
            animate={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -2 : 2 }}
            transition={{ delay: 1.8 + i * 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-xl shadow-black/40"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${photo.src})` }}
            />
            {photo.caption && (
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-void/90 to-transparent px-2 py-2 text-[10px] text-parchment/80 font-mono">
                {photo.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>

      <ContinueButton onClick={onContinue} />
    </div>
  );
}
