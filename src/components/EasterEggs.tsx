import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import type { BirthdayData } from "../types";

interface EasterEggsProps {
  data: BirthdayData;
  activeModal: "search" | "profile" | null;
  onClose: () => void;
}

export default function EasterEggs({ data, activeModal, onClose }: EasterEggsProps) {
  const [query, setQuery] = useState("");
  const [keyPresses, setKeyPresses] = useState(0);
  const [showKeyboardSecret, setShowKeyboardSecret] = useState(false);

  // Hidden keyboard shortcut: press "b" three times in a row
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "b") return;
      setKeyPresses((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          setShowKeyboardSecret(true);
          return 0;
        }
        return next;
      });
      clearTimeout(timeout);
      timeout = setTimeout(() => setKeyPresses(0), 1200);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-void/85 backdrop-blur-sm px-5 pt-24 md:pt-5"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-charcoal border border-white/10 rounded-md p-6 md:p-8"
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 text-smoke hover:text-parchment transition-colors"
              >
                <X size={18} />
              </button>

              {activeModal === "profile" && (
                <div>
                  <p className="text-ember font-mono text-xs tracking-widest2 uppercase mb-4">
                    Profile
                  </p>
                  <p className="font-serif italic text-parchment text-lg leading-relaxed">
                    {data.secretProfileMessage}
                  </p>
                </div>
              )}

              {activeModal === "search" && (
                <div>
                  <p className="text-ember font-mono text-xs tracking-widest2 uppercase mb-4">
                    Search
                  </p>
                  <div className="flex items-center gap-2 bg-ash rounded-sm px-3 py-2.5 mb-5 border border-white/10">
                    <Search size={16} className="text-smoke" />
                    <input
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={`Try searching "${data.name}"`}
                      className="bg-transparent outline-none text-parchment text-sm flex-1 placeholder:text-smoke/70"
                    />
                  </div>
                  {query.trim().length > 0 && (
                    <ul className="space-y-3">
                      {data.searchEasterEggs.map((result, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="text-parchment/80 text-sm font-serif italic"
                        >
                          {result}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showKeyboardSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowKeyboardSecret(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-sm px-6 cursor-pointer"
          >
            <p className="font-serif italic text-parchment text-xl md:text-2xl text-center max-w-md">
              {data.secretKeyboardMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
