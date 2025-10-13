"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

type Skill = {
  id: number;
  name: string;
  level: string;
  icon?: string;
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/skills/")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch(() => {
        // fallback dummy skills
        setSkills([
          { id: 1, name: "Cybersecurity", level: "Advanced" },
          { id: 2, name: "Trading Analysis", level: "Intermediate" },
          { id: 3, name: "Full-Stack Dev", level: "Advanced" },
        ]);
      });
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">⚡ My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill.id} className="p-4 bg-white rounded shadow">
              {skill.icon && (
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="h-12 w-12 mb-2"
                />
              )}
              <h3 className="font-semibold">{skill.name}</h3>
              <p className="text-sm text-gray-600">{skill.level}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
