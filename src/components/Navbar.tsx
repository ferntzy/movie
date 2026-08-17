import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, User } from "lucide-react";

interface NavbarProps {
  name: string;
  onSearchClick: () => void;
  onProfileClick: () => void;
}

const LINKS = ["Home", "Birthday Special", "Episodes", "Memories", "About Her"];

export default function Navbar({ name, onSearchClick, onProfileClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 md:px-12 py-4 transition-colors duration-500 ${
        scrolled ? "bg-void/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="flex items-center gap-8">
        <span className="font-display text-xl md:text-2xl tracking-widest2 text-ember select-none">
          FERNFLIX
        </span>
        <nav className="hidden lg:flex items-center gap-6 text-sm text-parchment/80 font-body">
          {LINKS.map((link, i) => (
            <a
              key={link}
              href={i === 0 ? "#top" : `#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-parchment transition-colors duration-200 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-ember transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4 md:gap-5 text-parchment/85">
        <button
          aria-label="Search"
          onClick={onSearchClick}
          className="hover:text-ember transition-colors duration-200"
        >
          <Search size={19} />
        </button>
        <button
          aria-label="Notifications"
          onClick={() => setNotified(true)}
          className="relative hover:text-ember transition-colors duration-200"
        >
          <Bell size={19} />
          {!notified && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-ember" />
          )}
        </button>
        <button
          aria-label={`${name}'s profile`}
          onClick={onProfileClick}
          className="w-8 h-8 rounded-md bg-gradient-to-br from-crimson to-ash flex items-center justify-center hover:ring-2 hover:ring-ember/60 transition-all duration-200"
        >
          <User size={16} />
        </button>
      </div>
    </motion.header>
  );
}
