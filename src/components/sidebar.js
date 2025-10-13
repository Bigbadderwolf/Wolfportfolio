import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen">
      <h2 className="text-xl font-bold mb-6">BadWolf Portfolio</h2>
      <ul className="space-y-4">
        <li><Link href="/skills">Skills</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/auth/login">Login</Link></li>
      </ul>
    </aside>
  );
}
