"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [message, setMessage] = useState("");

  const [roomName, setRoomName] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [sessionMessage, setSessionMessage] = useState("");

  const [joinCode, setJoinCode] = useState("");
  const [joinMessage, setJoinMessage] = useState("");

  const [sessions, setSessions] = useState<any[]>([]);

  const fetchSessions = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sessions");
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Failed to fetch sessions");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

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

  const handleCreateSession = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sessions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roomName,
          mentorName
        })
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

  const handleJoinSession = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/sessions/join/${joinCode}`);

      if (response.ok) {
        const data = await response.json();

        if (data && data.id) {
          setJoinMessage(
            `✅ Joined Session: ${data.roomName} | Mentor: ${data.mentorName} | Code: ${data.sessionCode}`
          );
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

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">
          1-on-1 Mentor–Student Platform
        </h1>

        <p className="text-center text-gray-700 mb-8 text-lg">
          A simple mentorship platform for private learning sessions.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Register User */}
          <div className="bg-blue-100 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              👤 Register User
            </h2>

            <input
              type="text"
              placeholder="Enter name"
              className="w-full p-3 mb-3 rounded-lg border border-gray-300 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 mb-3 rounded-lg border border-gray-300 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 mb-3 rounded-lg border border-gray-300 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <select
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="STUDENT">STUDENT</option>
              <option value="MENTOR">MENTOR</option>
            </select>

            <button
              onClick={handleRegister}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800"
            >
              Register
            </button>

            {message && (
              <p className="mt-4 text-sm font-medium text-gray-800">{message}</p>
            )}
          </div>

          {/* Create Session */}
          <div className="bg-green-100 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              📚 Create Session
            </h2>

            <input
              type="text"
              placeholder="Enter session room name"
              className="w-full p-3 mb-3 rounded-lg border border-gray-300 text-black"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter mentor name"
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-black"
              value={mentorName}
              onChange={(e) => setMentorName(e.target.value)}
            />

            <button
              onClick={handleCreateSession}
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800"
            >
              Create Session
            </button>

            {sessionMessage && (
              <p className="mt-4 text-sm font-medium text-gray-800">{sessionMessage}</p>
            )}
          </div>

          {/* Join Session */}
          <div className="bg-yellow-100 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-yellow-900 mb-4">
              🔑 Join Session
            </h2>

            <input
              type="text"
              placeholder="Enter session code"
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-black"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            />

            <button
              onClick={handleJoinSession}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600"
            >
              Join Session
            </button>

            {joinMessage && (
              <p className="mt-4 text-sm font-medium text-gray-800">{joinMessage}</p>
            )}
          </div>

          {/* Future Features */}
          <div className="bg-purple-100 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-purple-900 mb-2">
              💬 Future Features
            </h2>
            <p className="text-gray-800">
              Real-time chat, video calling, attendance tracking, notes sharing,
              and collaborative code editor.
            </p>
          </div>
        </div>

        {/* Available Sessions */}
        <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📋 Available Sessions
          </h2>

          {sessions.length === 0 ? (
            <p className="text-gray-600">No sessions available yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-blue-700">
                    {session.roomName}
                  </h3>
                  <p className="text-gray-700 mt-1">
                    Mentor: <span className="font-medium">{session.mentorName}</span>
                  </p>
                  <p className="text-gray-700 mt-1">
                    Code: <span className="font-bold text-green-700">{session.sessionCode}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}