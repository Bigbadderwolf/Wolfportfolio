"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => {
        // fallback dummy projects
        setProjects([
          {
            id: 1,
            title: "Cyber Defense Simulator",
            description: "A cybersecurity training platform",
          },
          {
            id: 2,
            title: "Trading Bot",
            description: "Algorithmic trading system with risk management",
          },
        ]);
      });
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">💻 My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="p-6 bg-white rounded shadow">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="mb-3 rounded"
                />
              )}
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
