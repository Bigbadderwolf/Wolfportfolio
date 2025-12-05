
"use client";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { useState, useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  // detect when mouse is near the left edge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX < 80) setShowSidebar(true);
      else if (e.clientX > 300) setShowSidebar(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <html lang="en">
      <body className="bg-neutral-900 text-gray-200 font-poppins">
        <Sidebar visible={showSidebar} />
        <main className={`transition-all duration-300 ${showSidebar ? "ml-56" : "ml-0"} p-8`}>
          {children}
        </main>
      </body>
    </html>
  );
}

