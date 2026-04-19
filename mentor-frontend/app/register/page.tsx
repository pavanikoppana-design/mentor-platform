"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ User registered successfully! ID: ${data.id}`);
        setName("");
        setEmail("");
        setPassword("");
        setRole("STUDENT");
      } else {
        setMessage("❌ Failed to register user");
      }
    } catch (error) {
      setMessage("❌ Backend connection failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Register User
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Create your mentor or student account
        </p>

        <input
          type="text"
          placeholder="Enter name"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full p-3 mb-5 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">STUDENT</option>
          <option value="MENTOR">MENTOR</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Register
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-800 font-medium">
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <a href="/" className="text-blue-600 hover:underline font-medium">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}