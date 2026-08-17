import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { BirthdayData } from "../types";
import Chapter01Origin from "./chapters/Chapter01Origin";
import Chapter02MainCharacter from "./chapters/Chapter02MainCharacter";
import Chapter03Favorites from "./chapters/Chapter03Favorites";
import Chapter04Awards from "./chapters/Chapter04Awards";
import Chapter05Reviews from "./chapters/Chapter05Reviews";
import Chapter06Future from "./chapters/Chapter06Future";
import BirthdayPremiere from "./chapters/BirthdayPremiere";
import FinalScene from "./chapters/FinalScene";

interface BirthdaySpecialProps {
  data: BirthdayData;
  onClose: () => void;
}

const SCENES = [
  "intro",
  "chapter-01",
  "chapter-02",
  "chapter-03",
  "chapter-04",
  "chapter-05",
  "chapter-06",
  "premiere",
  "final",
] as const;

type Scene = (typeof SCENES)[number];

function IntroSequence({ data, onDone }: { data: BirthdayData; onDone: () => void }) {
  const [skipDeclined, setSkipDeclined] = useState(false);

  const lines: { text: string; delay: number; size: string }[] = [
    { text: "Tonight's feature...", delay: 0.4, size: "text-lg md:text-2xl font-serif italic text-parchment/80" },
    { text: data.name, delay: 2, size: "font-display text-5xl md:text-7xl uppercase text-parchment" },
    { text: "The Birthday Special", delay: 4, size: "font-display text-xl md:text-2xl uppercase tracking-cinema text-ember" },
    { text: `Starring: ${data.name}`, delay: 6, size: "font-mono text-xs md:text-sm uppercase tracking-wide text-smoke" },
    { text: "Genre: Impossible to categorize", delay: 6.9, size: "font-mono text-xs md:text-sm uppercase tracking-wide text-smoke" },
    { text: "Runtime: Ongoing", delay: 7.8, size: "font-mono text-xs md:text-sm uppercase tracking-wide text-smoke" },
  ];

  return (
    <div className="relative min-h-full w-full flex flex-col items-center justify-center px-6 text-center bg-void">
      <div className="flex flex-col items-center gap-5">
        <AnimatePresence>
          {lines.map((line) => (
            <motion.p
              key={line.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: line.delay, duration: 1 }}
              className={line.size}
            >
              {line.text}
            </motion.p>
          ))}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 9, duration: 0.8 }}
          onClick={onDone}
          className="flex items-center gap-2 bg-crimson hover:bg-ember text-parchment px-7 py-3.5 rounded-sm font-semibold text-sm md:text-base transition-colors duration-200 mt-6"
        >
          Begin
        </motion.button>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={() => setSkipDeclined(true)}
        className="absolute bottom-8 right-6 md:right-10 font-mono text-[11px] tracking-widest2 uppercase text-smoke hover:text-parchment transition-colors duration-200"
      >
        {skipDeclined ? "Absolutely not. You deserve the full experience." : "Skip Intro"}
      </motion.button>
    </div>
  );
}

export default function BirthdaySpecial({ data, onClose }: BirthdaySpecialProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const scene: Scene = SCENES[sceneIndex];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const goTo = (index: number) => setSceneIndex(Math.max(0, Math.min(SCENES.length - 1, index)));
  const next = () => goTo(sceneIndex + 1);

  const chapterScenes: Scene[] = [
    "chapter-01",
    "chapter-02",
    "chapter-03",
    "chapter-04",
    "chapter-05",
    "chapter-06",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-void overflow-y-auto"
    >
      {/* progress dots */}
      {chapterScenes.includes(scene) && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[110] flex gap-1.5">
          {chapterScenes.map((s) => (
            <span
              key={s}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                s === scene ? "bg-ember" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      )}

      <button
        onClick={onClose}
        aria-label="Close special"
        className="fixed top-5 right-5 md:right-8 z-[110] w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-parchment/70 hover:text-parchment transition-colors duration-200"
      >
        <X size={18} />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-full w-full"
        >
          {scene === "intro" && <IntroSequence data={data} onDone={next} />}
          {scene === "chapter-01" && <Chapter01Origin data={data} onContinue={next} />}
          {scene === "chapter-02" && <Chapter02MainCharacter data={data} onContinue={next} />}
          {scene === "chapter-03" && <Chapter03Favorites data={data} onContinue={next} />}
          {scene === "chapter-04" && <Chapter04Awards data={data} onContinue={next} />}
          {scene === "chapter-05" && <Chapter05Reviews data={data} onContinue={next} />}
          {scene === "chapter-06" && <Chapter06Future data={data} onContinue={next} />}
          {scene === "premiere" && <BirthdayPremiere data={data} onContinue={next} />}
          {scene === "final" && <FinalScene data={data} onExit={onClose} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
