"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/skills/")
      .then(res => res.json())
      .then(data => setSkills(data));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map(skill => (
            <div key={skill.id} className="p-4 bg-white rounded shadow">
              {skill.icon && (
                <img src={skill.icon} alt={skill.name} className="h-12 w-12 mb-2" />
              )}
              <h3 className="font-semibold">{skill.name}</h3>
              <p className="text-sm">{skill.level}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
