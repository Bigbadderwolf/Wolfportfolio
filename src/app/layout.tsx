import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BadWolf Portfolio",
  description: "Cybersecurity • Financial Trading • Coding Skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
