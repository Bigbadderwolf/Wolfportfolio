"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Project = {
    id: number;
    title: string;
    short_description?: string;
    detailed_description?: string;
    demo_link?: string | null;
    github_link?: string | null;
    repo_link?: string | null;
};

const allowedSkills = ["trading", "cybersecurity", "programming", "audio", "ai"] as const;

type AllowedSkill = (typeof allowedSkills)[number];

const skillTitles: Record<AllowedSkill, string> = {
    trading: "Trading & Finance",
    cybersecurity: "Cybersecurity",
    programming: "Programming",
    audio: "Audio Manipulation",
    ai: "AI Engineering",
};

export default async function SkillProjectsPage({ params }: { params: Promise<{ skill: string }> }) {
    const { skill } = await params;
    const allowedSkill = skill as AllowedSkill;

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isValidSkill = useMemo(() => allowedSkills.includes(allowedSkill), [allowedSkill]);

    useEffect(() => {
        if (!isValidSkill) {
            setLoading(false);
            setProjects([]);
            setError("Unknown project category.");
            return;
        }

        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

        setLoading(true);
        setError(null);

        fetch(`${apiBase}/api/${skill}/`)
            .then((res) => {
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                return res.json();
            })
            .then((data) => setProjects(Array.isArray(data) ? data : []))
            .catch((err) => setError(err instanceof Error ? err.message : "Failed to load projects."))
            .finally(() => setLoading(false));
    }, [isValidSkill, skill]);

    return (
        <div className="min-h-screen bg-gray-950 text-white p-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold">{isValidSkill ? skillTitles[allowedSkill] : "Projects"}</h1>
                    <Link href="/projects" className="text-cyan-400 hover:underline">
                        Back
                    </Link>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-400">{error}</p>
                ) : projects.length === 0 ? (
                    <p>No projects found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {projects.map((proj) => (
                            <div key={proj.id} className="p-6 bg-gray-800 rounded-xl shadow-lg">
                                <h2 className="text-xl font-semibold mb-2">{proj.title}</h2>
                                {proj.short_description ? (
                                    <p className="text-gray-300 text-sm mb-3">{proj.short_description}</p>
                                ) : null}

                                <div className="flex flex-col gap-2 text-sm">
                                    {proj.demo_link ? (
                                        <a href={proj.demo_link} target="_blank" className="text-blue-400 underline">
                                            View Demo
                                        </a>
                                    ) : null}

                                    {proj.github_link ? (
                                        <a href={proj.github_link} target="_blank" className="text-blue-400 underline">
                                            GitHub
                                        </a>
                                    ) : null}

                                    {proj.repo_link ? (
                                        <a href={proj.repo_link} target="_blank" className="text-blue-400 underline">
                                            Repo
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
