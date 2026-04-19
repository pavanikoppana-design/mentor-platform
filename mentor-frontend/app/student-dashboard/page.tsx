"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [joinCode, setJoinCode] = useState("");
  const [joinMessage, setJoinMessage] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const router = useRouter();

  const fetchSessions = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sessions");
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Failed to fetch sessions");
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/attendance");
      const data = await response.json();
      setAttendanceRecords(data);
    } catch (error) {
      console.error("Failed to fetch attendance");
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchAttendance();
  }, []);

  const handleJoinSession = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/sessions/join/${joinCode}`);

      if (response.ok) {
        const data = await response.json();

        if (data && data.id) {
          setJoinMessage(
            `✅ Joined Session: ${data.roomName} | Mentor: ${data.mentorName} | Code: ${data.sessionCode}`
          );

          setTimeout(() => {
            router.push(
              `/live-class?code=${data.sessionCode}&room=${encodeURIComponent(
                data.roomName
              )}&mentor=${encodeURIComponent(data.mentorName)}`
            );
          }, 1200);
        } else {
          setJoinMessage("❌ Session not found");
        }
      } else {
        setJoinMessage("❌ Failed to join session");
      }
    } catch (error) {
      setJoinMessage("❌ Backend connection failed");
    }
  };

  const handleQuickJoin = (code: string) => {
    setJoinCode(code);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-500 text-white min-h-screen p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-10">Student Panel</h1>

        <nav className="space-y-4">
          <Link href="/" className="block hover:text-purple-200 transition">
            🏠 Home
          </Link>

          <Link href="/login" className="block hover:text-purple-200 transition">
            🔐 Login
          </Link>

          <Link
            href="/mentor-dashboard"
            className="block hover:text-purple-200 transition"
          >
            👩‍🏫 Mentor Dashboard
          </Link>

          <Link href="/live-class" className="block hover:text-purple-200 transition">
            🎥 Live Class
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-600 mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600">
            Join sessions, explore classes, and track your attendance
          </p>
        </div>

        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Join Session */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
              🔑 Join Session
            </h2>

            <input
              type="text"
              placeholder="Enter session code"
              className="w-full p-3 mb-5 rounded-lg border border-gray-300 text-black"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            />

            <button
              onClick={handleJoinSession}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              Join Session
            </button>

            {joinMessage && (
              <p className="mt-4 text-center text-sm text-gray-800 font-medium">
                {joinMessage}
              </p>
            )}
          </div>

          {/* Available Sessions */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">
              📚 Available Sessions
            </h2>

            {sessions.length === 0 ? (
              <p className="text-gray-600">No sessions available yet.</p>
            ) : (
              <div className="space-y-4 max-h-[350px] overflow-y-auto">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-yellow-700">
                      {session.roomName}
                    </h3>
                    <p className="text-gray-700 mt-1">
                      Mentor:{" "}
                      <span className="font-semibold">{session.mentorName}</span>
                    </p>
                    <p className="text-gray-700 mt-1">
                      Code:{" "}
                      <span className="font-bold text-green-700">
                        {session.sessionCode}
                      </span>
                    </p>

                    <button
                      onClick={() => handleQuickJoin(session.sessionCode)}
                      className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
                    >
                      Use This Code
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Attendance Records */}
        <div className="mt-10 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            📝 Attendance Records
          </h2>

          {attendanceRecords.length === 0 ? (
            <p className="text-gray-600">No attendance records yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {attendanceRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    {record.studentName}
                  </h3>
                  <p className="text-gray-700">
                    Session Code:{" "}
                    <span className="font-semibold">{record.sessionCode}</span>
                  </p>
                  <p className="text-gray-700 mt-1">
                    Status:{" "}
                    <span
                      className={`font-bold ${
                        record.status === "PRESENT"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Links */}
        <div className="md:hidden mt-10 text-center space-y-3">
          <Link href="/" className="block text-blue-600 hover:underline font-medium">
            ← Home
          </Link>

          <Link href="/login" className="block text-green-600 hover:underline font-medium">
            Login
          </Link>

          <Link
            href="/mentor-dashboard"
            className="block text-purple-600 hover:underline font-medium"
          >
            Mentor Dashboard
          </Link>

          <Link
            href="/live-class"
            className="block text-yellow-600 hover:underline font-medium"
          >
            Live Class
          </Link>
        </div>
      </section>
    </main>
  );
}