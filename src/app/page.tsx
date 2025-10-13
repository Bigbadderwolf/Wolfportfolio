"use client";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">🚀 Welcome to My Portfolio</h1>
        <p className="text-gray-700">
          Showcasing my expertise in <span className="font-semibold">Cybersecurity</span>,{" "}
          <span className="font-semibold">Financial Market Trading</span>, and{" "}
          <span className="font-semibold">Full-Stack Development</span>.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">⚡ Skills</h2>
            <p className="text-sm mt-2">Explore my technical expertise</p>
          </div>
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">💻 Projects</h2>
            <p className="text-sm mt-2">Discover my professional work</p>
          </div>
        </div>
      </main>
    </div>
  );
}
