"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          role
        })
      });

      if (response.ok) {
        const data = await response.json();

        setMessage(`✅ Login successful! Welcome ${data.name || "User"}`);

        // Save user locally
        localStorage.setItem("loggedInUser", JSON.stringify(data));
        localStorage.setItem("userRole", role);

        setTimeout(() => {
          if (role === "MENTOR") {
            router.push("/mentor-dashboard");
          } else {
            router.push("/student-dashboard");
          }
        }, 1200);
      } else {
        setMessage("❌ Invalid email, password, or role");
      }
    } catch (error) {
      setMessage("❌ Backend connection failed");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-yellow-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Login to continue to MentorConnect
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 mb-4 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full p-3 mb-5 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">STUDENT</option>
          <option value="MENTOR">MENTOR</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-purple-700 text-white py-3 rounded-xl font-semibold hover:bg-purple-800 transition shadow-md"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-800 font-medium">
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link href="/register" className="text-purple-700 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center space-x-4">
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            ← Home
          </Link>

          <Link href="/student-dashboard" className="text-yellow-600 hover:underline font-medium">
            Student
          </Link>

          <Link href="/mentor-dashboard" className="text-purple-600 hover:underline font-medium">
            Mentor
          </Link>
        </div>
      </div>
    </main>
  );
}