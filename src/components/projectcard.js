"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div key={project.id} className="p-4 bg-white rounded shadow">
              {project.image && (
                <img src={project.image} alt={project.title} className="mb-2 rounded" />
              )}
              <h3 className="font-semibold">{project.title}</h3>
              <p>{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  className="text-blue-500"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
