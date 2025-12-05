"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, FolderKanban } from "lucide-react";
import { useState } from "react";

export const Sidebar = ({ visible }: { visible: boolean }) => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "About", path: "/about", icon: <User size={20} /> },
    { name: "Projects", path: "/projects", icon: <FolderKanban size={20} /> },
  ];

  return (
    <motion.aside
      initial={{ x: -220, opacity: 0 }}
      animate={{ x: visible ? 0 : -220, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 15 }}
      className="fixed top-0 left-0 h-full w-60 bg-gradient-to-b from-neutral-900 to-neutral-800 border-r border-neutral-700 shadow-2xl flex flex-col items-center py-10 z-50"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-extrabold text-cyan-400 mb-14 tracking-wide select-none"
      >
        WolfPortfolio
      </motion.h1>

      <nav className="flex flex-col gap-6 w-full px-6">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const isHovered = hovered === item.name;

          return (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05, x: 5 }}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className={`rounded-xl p-3 transition-all duration-200 flex items-center gap-4 cursor-pointer ${
                isActive
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-cyan-400"
              } ${isHovered ? "bg-neutral-700/50" : ""}`}
            >
              <Link href={item.path} className="flex items-center gap-4 w-full">
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="mt-auto pb-6 text-xs text-gray-500 select-none">
        © {new Date().getFullYear()} WolfPortfolio
      </div>
    </motion.aside>
  );
};
