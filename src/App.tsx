import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NowStreaming from "./components/NowStreaming";
import Episodes from "./components/Episodes";
import BirthdaySpecial from "./components/BirthdaySpecial";
import EasterEggs from "./components/EasterEggs";
import { birthdayData } from "./data/birthdayData";

export default function App() {
  const [cinemaOpen, setCinemaOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"search" | "profile" | null>(null);

  return (
    <div className="relative min-h-screen bg-void text-parchment">
      <div className="film-grain" />
      <div className="vignette" />

      <Navbar
        name={birthdayData.name}
        onSearchClick={() => setActiveModal("search")}
        onProfileClick={() => setActiveModal("profile")}
      />

      <main>
        <Hero data={birthdayData} onPlay={() => setCinemaOpen(true)} />
        <NowStreaming data={birthdayData} onStart={() => setCinemaOpen(true)} />
        <Episodes data={birthdayData} />

        <section id="memories" className="px-5 md:px-12 py-10 md:py-16">
          <h3 className="font-display text-2xl md:text-3xl text-parchment uppercase tracking-wide mb-6">
            Memories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {[...birthdayData.originPhotos, ...birthdayData.personalityPhotos].map((photo, i) => (
              <motion.div
                key={photo.src + i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 8) * 0.06, duration: 0.5 }}
                className="relative aspect-square rounded-sm overflow-hidden border border-white/10 group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${photo.src})` }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="about-her" className="px-5 md:px-12 py-16 md:py-24 max-w-2xl">
          <p className="font-mono text-ember text-xs tracking-widest2 uppercase mb-4">
            About Her
          </p>
          <p className="font-serif italic text-parchment/85 text-xl md:text-2xl leading-relaxed">
            {birthdayData.nowStreamingDescription}
          </p>
        </section>
      </main>

      <footer className="px-5 md:px-12 py-10 border-t border-white/10 text-smoke text-xs font-mono tracking-wide">
        THE {birthdayData.name.toUpperCase()} SPECIAL — Streaming for one day only.
      </footer>

      <AnimatePresence>
        {cinemaOpen && (
          <BirthdaySpecial data={birthdayData} onClose={() => setCinemaOpen(false)} />
        )}
      </AnimatePresence>

      <EasterEggs
        data={birthdayData}
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
