import SkillCard from "@/components/skillcard";

const skills = [
  {
    title: "Cybersecurity",
    color: "from-cyan-500 to-blue-500",
    image: "/images/cybersecurity.png",
  },
  {
    title: "Trading & Finance",
    color: "from-green-500 to-emerald-600",
    image: "/images/trading.png",
  },
  {
    title: "AI & Programming",
    color: "from-purple-500 to-pink-500",
    image: "/images/ai.png",
  },
  {
    title: "Audio Manipulation",
    color: "from-orange-400 to-red-500",
    image: "/images/audio.png",
  },
];

export default function ProjectsPage() {
  return (
    <section className="py-16 px-6 min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <h2 className="text-4xl font-semibold text-cyan-400 mb-12 text-center drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
        Explore My Skills
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {skills.map((skill) => (
          <SkillCard
            key={skill.title}
            title={skill.title}
            color={skill.color}
            image={skill.image}
          />
        ))}
      </div>
    </section>
  );
}
