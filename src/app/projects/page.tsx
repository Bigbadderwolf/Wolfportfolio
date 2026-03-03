import SkillCard from "@/components/skillcard";
import Link from "next/link";

const skills = [
  {
    title: "CYBERSECURITY",
    color: "from-cyan-500 to-blue-500",
    image: "/images/cybersecurity.svg",
    slug: "cybersecurity",
    rotatingTitles: ["Cybersecurity", "Pentesting", "SOC", "Networking"],
  },
  {
    title: "FINANCIAL ANALYSIS",
    color: "from-green-500 to-emerald-600",
    image: "/images/trading.svg",
    slug: "trading",
    rotatingTitles: ["Trading", "Quant", "Risk Mgmt", "Backtesting"],
  },
  {
    title: "AI ENGINERING",
    color: "from-purple-500 to-pink-500",
    image: "/images/ai.svg",
    slug: "ai",
    rotatingTitles: ["AI Engineering", "LLMs", "ML", "MLOps"],
  },
  {
    title: "AUDIO MANIPULATION",
    color: "from-orange-400 to-red-500",
    image: "/images/audio.svg",
    slug: "audio",
    rotatingTitles: ["Audio", "DSP", "Mixing", "Synthesis"],
  },
  {
    title: "PROGRAMMING",
    color: "from-fuchsia-500 to-violet-600",
    image: "/images/programming.svg",
    slug: "programming",
    rotatingTitles: ["Programming", "TypeScript", "Python", "APIs"],
  },
];

export default function ProjectsPage() {
  return (
    <section className="py-16 px-6 min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <h2 className="text-4xl font-semibold text-cyan-400 mb-12 text-center drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
        Projects
      </h2>

      <div className="flex flex-col gap-5 max-w-5xl mx-auto">
        {skills.map((skill) => (
          <Link
            key={skill.title}
            href={`/projects/${skill.slug}`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-2xl"
          >
            <SkillCard
              title={skill.title}
              color={skill.color}
              image={skill.image}
              rotatingTitles={skill.rotatingTitles}
              variant="tab"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
