"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MentorDashboard() {
  const [roomName, setRoomName] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [sessionMessage, setSessionMessage] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);

  const [studentName, setStudentName] = useState("");
  const [attendanceSessionCode, setAttendanceSessionCode] = useState("");
  const [status, setStatus] = useState("PRESENT");
  const [attendanceMessage, setAttendanceMessage] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);

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

  const handleCreateSession = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sessions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName,
          mentorName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSessionMessage(
          `✅ Session created! Code: ${data.sessionCode} | ID: ${data.id}`
        );
        setRoomName("");
        setMentorName("");
        fetchSessions();
      } else {
        setSessionMessage("❌ Failed to create session");
      }
    } catch (error) {
      setSessionMessage("❌ Backend connection failed");
    }
  };

  const handleMarkAttendance = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/attendance/mark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          sessionCode: attendanceSessionCode,
          status,
        }),
      });

      if (response.ok) {
        setAttendanceMessage("✅ Attendance marked successfully!");
        setStudentName("");
        setAttendanceSessionCode("");
        setStatus("PRESENT");
        fetchAttendance();
      } else {
        setAttendanceMessage("❌ Failed to mark attendance");
      }
    } catch (error) {
      setAttendanceMessage("❌ Backend connection failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white min-h-screen p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-10">Mentor Panel</h1>

        <nav className="space-y-4">
          <Link href="/" className="block hover:text-yellow-300 transition">
            🏠 Home
          </Link>

          <Link href="/login" className="block hover:text-yellow-300 transition">
            🔐 Login
          </Link>

          <Link
            href="/student-dashboard"
            className="block hover:text-yellow-300 transition"
          >
            🎓 Student Dashboard
          </Link>

          <Link href="/live-class" className="block hover:text-yellow-300 transition">
            🎥 Live Class
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            Mentor Dashboard
          </h1>
          <p className="text-gray-600">
            Create sessions, manage attendance, and track student activity
          </p>
        </div>

        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create Session */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">
              📚 Create Session
            </h2>

            <input
              type="text"
              placeholder="Enter session room name"
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-black"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter mentor name"
              className="w-full p-3 mb-5 rounded-lg border border-gray-300 text-black"
              value={mentorName}
              onChange={(e) => setMentorName(e.target.value)}
            />

            <button
              onClick={handleCreateSession}
              className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition"
            >
              Create Session
            </button>

            {sessionMessage && (
              <p className="mt-4 text-center text-sm text-gray-800 font-medium">
                {sessionMessage}
              </p>
            )}
          </div>

          {/* Mark Attendance */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              ✅ Mark Attendance
            </h2>

            <input
              type="text"
              placeholder="Enter student name"
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-black"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter session code"
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-black"
              value={attendanceSessionCode}
              onChange={(e) => setAttendanceSessionCode(e.target.value.toUpperCase())}
            />

            <select
              className="w-full p-3 mb-5 rounded-lg border border-gray-300 text-black"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PRESENT">PRESENT</option>
              <option value="ABSENT">ABSENT</option>
            </select>

            <button
              onClick={handleMarkAttendance}
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Mark Attendance
            </button>

            {attendanceMessage && (
              <p className="mt-4 text-center text-sm text-gray-800 font-medium">
                {attendanceMessage}
              </p>
            )}
          </div>
        </div>

        {/* Created Sessions */}
        <div className="mt-10 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">
            📋 Created Sessions
          </h2>

          {sessions.length === 0 ? (
            <p className="text-gray-600">No sessions created yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-purple-50 border border-purple-100 rounded-2xl p-5 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-purple-800 mb-2">
                    {session.roomName}
                  </h3>
                  <p className="text-gray-700">
                    Mentor:{" "}
                    <span className="font-semibold">{session.mentorName}</span>
                  </p>
                  <p className="text-gray-700 mt-1">
                    Code:{" "}
                    <span className="font-bold text-green-700">
                      {session.sessionCode}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
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

        {/* Mobile Bottom Links */}
        <div className="md:hidden mt-10 text-center space-y-3">
          <Link href="/" className="block text-blue-600 hover:underline font-medium">
            ← Home
          </Link>

          <Link href="/login" className="block text-green-600 hover:underline font-medium">
            Login
          </Link>

          <Link
            href="/student-dashboard"
            className="block text-yellow-600 hover:underline font-medium"
          >
            Student Dashboard
          </Link>

          <Link
            href="/live-class"
            className="block text-purple-600 hover:underline font-medium"
          >
            Live Class
          </Link>
        </div>
      </section>
    </main>
  );
}