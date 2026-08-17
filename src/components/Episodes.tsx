import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Play } from "lucide-react";
import type { BirthdayData } from "../types";

interface EpisodesProps {
  data: BirthdayData;
}

export default function Episodes({ data }: EpisodesProps) {
  const [lockedMessage, setLockedMessage] = useState<string | null>(null);

  return (
    <section id="episodes" className="relative px-5 md:px-12 py-10 md:py-16">
      <h3 className="font-display text-2xl md:text-3xl text-parchment uppercase tracking-wide mb-6">
        Episodes
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-none">
        {data.episodes.map((ep, i) => (
          <motion.button
            key={ep.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            onClick={() => ep.locked && setLockedMessage(ep.lockedMessage ?? "This episode hasn't happened yet.")}
            className="relative flex-none w-64 md:w-72 snap-start rounded-md overflow-hidden border border-white/10 text-left group"
          >
            <div className="relative h-40 md:h-44 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${ep.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
              {ep.locked ? (
                <div className="absolute inset-0 flex items-center justify-center bg-void/60 backdrop-blur-[1px]">
                  <Lock className="text-parchment/80" size={26} />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-11 h-11 rounded-full bg-parchment/90 flex items-center justify-center">
                    <Play size={16} className="text-void ml-0.5" fill="currentColor" />
                  </div>
                </div>
              )}
              <span className="absolute top-2 left-2 font-mono text-[10px] tracking-widest2 text-parchment/70 uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="bg-charcoal px-4 py-3">
              <p className="font-body font-semibold text-parchment text-sm mb-1">{ep.title}</p>
              <p className="text-smoke text-xs">{ep.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {lockedMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setLockedMessage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm px-6 cursor-pointer"
        >
          <p className="font-serif italic text-parchment text-xl md:text-2xl text-center max-w-md">
            {lockedMessage}
          </p>
        </motion.div>
      )}
    </section>
  );
}
