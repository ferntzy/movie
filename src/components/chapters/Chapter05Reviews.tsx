import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { BirthdayData } from "../../types";
import ContinueButton from "../ContinueButton";

interface ChapterProps {
  data: BirthdayData;
  onContinue: () => void;
}

export default function Chapter05Reviews({ data, onContinue }: ChapterProps) {
  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center px-5 md:px-12 py-24 text-center">
      <p className="font-mono text-ember text-xs tracking-widest2 uppercase mb-2">Chapter 05</p>
      <h2 className="font-display text-4xl md:text-6xl text-parchment uppercase mb-12">
        Critics' Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl">
        {data.reviews.map((review, i) => (
          <motion.figure
            key={review.quote + i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="bg-charcoal border border-white/10 rounded-md p-6 flex flex-col items-center"
          >
            <div className="flex gap-0.5 mb-4 text-ember">
              {Array.from({ length: 5 }).map((_, star) => (
                <Star
                  key={star}
                  size={14}
                  fill={star < review.rating ? "currentColor" : "none"}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <blockquote className="font-serif italic text-parchment text-lg mb-4">
              "{review.quote}"
            </blockquote>
            <figcaption className="font-mono text-[11px] tracking-widest2 uppercase text-smoke">
              — {review.source}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <ContinueButton onClick={onContinue} />
    </div>
  );
}
