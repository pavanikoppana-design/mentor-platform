"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-yellow-100">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800">
          MentorConnect
        </h1>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-5 py-2 rounded-lg text-purple-700 font-semibold hover:bg-purple-100 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <p className="text-purple-700 font-semibold mb-4 uppercase tracking-wide">
            Smart Learning Platform
          </p>

          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Learn, Teach & Connect in One Powerful Platform
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            MentorConnect helps mentors and students collaborate through live
            sessions, attendance tracking, and smart classroom experiences.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 transition shadow-md"
            >
              Get Started
            </Link>

            <Link
              href="/mentor-dashboard"
              className="bg-white border border-purple-200 text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition shadow-sm"
            >
              Mentor Dashboard
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-10">
          <h3 className="text-2xl font-bold text-purple-800 mb-6">
            Platform Highlights
          </h3>

          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
              <h4 className="text-lg font-semibold text-purple-700">
                🎥 Live Mentoring Sessions
              </h4>
              <p className="text-gray-600 mt-1">
                Join and host live class sessions with an interactive classroom experience.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-100">
              <h4 className="text-lg font-semibold text-yellow-700">
                📚 Session Management
              </h4>
              <p className="text-gray-600 mt-1">
                Create sessions, share unique session codes, and manage student participation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <h4 className="text-lg font-semibold text-blue-700">
                📝 Attendance Tracking
              </h4>
              <p className="text-gray-600 mt-1">
                Easily mark and review student attendance records in one place.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
              <h4 className="text-lg font-semibold text-green-700">
                💬 Live Chat Support
              </h4>
              <p className="text-gray-600 mt-1">
                Students and mentors can communicate instantly during live sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Quick Access
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <Link
            href="/mentor-dashboard"
            className="bg-white rounded-3xl shadow-md border border-gray-200 p-8 hover:shadow-xl transition"
          >
            <h4 className="text-2xl font-bold text-purple-700 mb-3">
              👩‍🏫 Mentor Dashboard
            </h4>
            <p className="text-gray-600">
              Create and manage sessions, mark attendance, and guide students effectively.
            </p>
          </Link>

          <Link
            href="/student-dashboard"
            className="bg-white rounded-3xl shadow-md border border-gray-200 p-8 hover:shadow-xl transition"
          >
            <h4 className="text-2xl font-bold text-yellow-600 mb-3">
              🎓 Student Dashboard
            </h4>
            <p className="text-gray-600">
              Join sessions, check attendance, and access your learning space easily.
            </p>
          </Link>

          <Link
            href="/live-class"
            className="bg-white rounded-3xl shadow-md border border-gray-200 p-8 hover:shadow-xl transition"
          >
            <h4 className="text-2xl font-bold text-blue-700 mb-3">
              🎥 Live Class Room
            </h4>
            <p className="text-gray-600">
              Experience a modern virtual classroom with chat, session info, and more.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}