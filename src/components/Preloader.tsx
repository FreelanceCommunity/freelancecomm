import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const waitForImages = async () => {
      // Wait a tick so DOM images get attached
      await new Promise((r) => setTimeout(r, 50));
      const imgs = Array.from(document.images);
      if (imgs.length === 0) {
        setProgress(100);
        return;
      }
      let loaded = 0;
      const total = imgs.length;
      const update = () => {
        loaded += 1;
        if (!cancelled) setProgress(Math.round((loaded / total) * 100));
      };
      await Promise.all(
        imgs.map((img) =>
          img.complete && img.naturalWidth > 0
            ? (update(), Promise.resolve())
            : new Promise<void>((res) => {
                img.addEventListener("load", () => (update(), res()), { once: true });
                img.addEventListener("error", () => (update(), res()), { once: true });
              })
        )
      );
    };

    const start = async () => {
      await waitForImages();
      // Small grace period for fonts/layout
      await new Promise((r) => setTimeout(r, 350));
      if (!cancelled) setLoading(false);
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display-bold text-3xl text-dark md:text-4xl"
          >
            freelanccomm<span className="text-gold">.in</span>
          </motion.div>

          <div className="mt-8 h-[2px] w-56 overflow-hidden bg-dark/10">
            <motion.div
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--gold-light)), hsl(var(--gold)), hsl(var(--gold-deep)))",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <div className="mt-3 font-mono-tag text-[10px] tracking-[0.3em] text-dark/55">
            Loading · {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
