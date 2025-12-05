"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      alert("✅ Login successful!");
    } else {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar visible={true} />
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4">🔐 Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 mb-4 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
