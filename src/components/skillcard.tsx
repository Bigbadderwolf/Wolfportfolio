"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

interface SkillCardProps {
  title: string;
  color: string;
  image?: string;
  rotatingTitles?: string[];
  variant?: "card" | "tab";
}

export default function SkillCard({ title, color, image, rotatingTitles, variant = "card" }: SkillCardProps) {
  const titles = rotatingTitles && rotatingTitles.length > 0 ? rotatingTitles : [title];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (titles.length <= 1) return;
    const id = window.setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, [titles.length]);

  const displayTitle = titles[titleIndex] ?? title;

  const innerClassName =
    variant === "tab"
      ? "relative z-10 flex items-center justify-between gap-4 px-6 h-24 rounded-2xl bg-black/40 backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:bg-black/65"
      : "relative z-10 flex flex-col items-center justify-center h-48 rounded-2xl bg-black/50 backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:bg-black/70";

  return (
    <motion.div
      whileHover={variant === "tab" ? { scale: 1.02, x: 6 } : { scale: 1.07, rotateY: 5 }}
      whileTap={variant === "tab" ? { scale: 0.99 } : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className={`relative group p-[2px] rounded-2xl bg-gradient-to-br ${color} shadow-lg hover:shadow-cyan-500/30`}
    >
      <div className={innerClassName}>
        {variant === "tab" ? (
          <div className="flex items-center justify-between w-full">
            {/* Left: Icon + Static Title */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {image && (
                <img
                  src={image}
                  alt={title}
                  className="w-12 h-12 object-contain opacity-90 group-hover:opacity-100 transition duration-300 flex-shrink-0"
                />
              )}
              <h3 className="text-xl font-semibold text-white tracking-wide group-hover:text-cyan-300 transition-all duration-300">
                {title}
              </h3>
            </div>

            {/* Center: Rotating Text */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={displayTitle}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-xl font-semibold text-white tracking-wide group-hover:text-cyan-300 transition-all duration-300"
                >
                  {displayTitle}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Right: Chevron */}
            <motion.div
              initial={{ opacity: 0.7, x: 0 }}
              whileHover={{ opacity: 1, x: 4 }}
              className="shrink-0 text-white/80 group-hover:text-cyan-300 transition-colors duration-300"
            >
              <ChevronRight size={22} />
            </motion.div>
          </div>
        ) : (
          <>
            {image && (
              <img
                src={image}
                alt={title}
                className="w-16 h-16 object-contain mb-3 opacity-90 group-hover:opacity-100 transition duration-300"
              />
            )}
            <AnimatePresence mode="wait">
              <motion.h3
                key={displayTitle}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-lg font-semibold text-white tracking-wide group-hover:text-cyan-300 transition-all duration-300"
              >
                {displayTitle}
              </motion.h3>
            </AnimatePresence>
          </>
        )}

        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500 bg-gradient-to-br ${color}`}
        ></div>
      </div>
    </motion.div>
  );
}
