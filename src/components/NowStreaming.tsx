import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { BirthdayData } from "../types";

interface NowStreamingProps {
  data: BirthdayData;
  onStart: () => void;
}

export default function NowStreaming({ data, onStart }: NowStreamingProps) {
  return (
    <section id="birthday-special" className="relative px-5 md:px-12 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-lg overflow-hidden border border-white/10"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />

        <div className="relative z-10 px-6 md:px-16 py-16 md:py-24 max-w-xl">
          <p className="text-ember font-mono text-xs tracking-widest2 uppercase mb-4">
            Now Streaming
          </p>
          <h3 className="font-display text-4xl md:text-6xl text-parchment uppercase leading-[0.95] mb-3">
            {data.name}
          </h3>
          <p className="text-smoke font-mono text-xs tracking-wide uppercase mb-6">
            Birthday Special — Available Today
          </p>
          <p className="text-parchment/80 font-serif italic text-lg mb-8">
            {data.nowStreamingDescription}
          </p>
          <button
            onClick={onStart}
            className="flex items-center gap-2 bg-crimson hover:bg-ember text-parchment px-7 py-3.5 rounded-sm font-semibold text-sm md:text-base transition-colors duration-200"
          >
            <Play size={18} fill="currentColor" />
            Start Special
          </button>
        </div>
      </motion.div>
    </section>
  );
}
