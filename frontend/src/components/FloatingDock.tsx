import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/data";
import { ease } from "@/components/motion-primitives";

export default function FloatingDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          data-testid="floating-wa-button"
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ duration: 0.5, ease }}
          href={waLink("Halo Anez Creative! Saya ingin konsultasi tanggal & paket dokumentasi pernikahan.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat WhatsApp Anez Creative"
          className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-gold py-3.5 pl-4 pr-5 text-[#0B0C0E] shadow-[0_16px_40px_-8px_rgba(212,175,55,0.45)]"
        >
          <span className="relative grid place-items-center">
            <span className="animate-ping-soft absolute h-8 w-8 rounded-full bg-gold" />
            <MessageCircle size={20} className="relative" />
          </span>
          <span className="text-sm font-semibold">Chat Kami</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
