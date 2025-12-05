"use client";
import { motion } from "framer-motion";

interface SkillCardProps {
  title: string;
  color: string;
  image?: string;
}

export default function SkillCard({ title, color, image }: SkillCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.07, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className={`relative group p-[2px] rounded-2xl bg-gradient-to-br ${color} shadow-lg hover:shadow-cyan-500/30`}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-48 rounded-2xl bg-black/50 backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:bg-black/70">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-16 h-16 object-contain mb-3 opacity-90 group-hover:opacity-100 transition duration-300"
          />
        )}
        <h3 className="text-lg font-semibold text-white tracking-wide group-hover:text-cyan-300 transition-all duration-300">
          {title}
        </h3>
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500 bg-gradient-to-br ${color}`}
        ></div>
      </div>
    </motion.div>
  );
}
