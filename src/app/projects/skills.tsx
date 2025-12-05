"use client";
import { useEffect, useState } from "react";

export default function SkillProjects({ params }: { params: { skill: string } }) {
  const { skill } = params;
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/projects/${skill}/`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, [skill]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8 capitalize">{skill} Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="p-6 bg-gray-800 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{proj.title}</h2>
              <p className="text-gray-300 text-sm mb-3">{proj.short_description}</p>
              {proj.demo_link && (
                <a
                  href={proj.demo_link}
                  target="_blank"
                  className="text-blue-400 underline"
                >
                  View Demo
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
