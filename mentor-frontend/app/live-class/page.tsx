"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LiveClassPage() {
  const searchParams = useSearchParams();

  const sessionCode = searchParams.get("code") || "N/A";
  const roomName = searchParams.get("room") || "Live Session";
  const mentorName = searchParams.get("mentor") || "Mentor";

  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "Mentor", text: "Welcome to today's live class!" },
    { sender: "Student", text: "Thank you mentor!" }
  ]);

  const sendMessage = () => {
    if (chatInput.trim() === "") return;

    setMessages([...messages, { sender: "You", text: chatInput }]);
    setChatInput("");
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          🎥 Live Class Room
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Join your live mentoring session
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Video Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black rounded-2xl h-96 flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
              Mentor Video Screen
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-2xl h-48 flex items-center justify-center text-white text-lg shadow-md">
                Student Camera
              </div>

              <div className="bg-gray-800 rounded-2xl h-48 flex items-center justify-center text-white text-lg shadow-md">
                Shared Screen / Notes
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition">
                🎙️ Mute
              </button>

              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                📷 Camera
              </button>

              <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition">
                ❌ End Class
              </button>
            </div>
          </div>

          {/* Right Side - Chat + Session Info */}
          <div className="space-y-6">
            {/* Session Info */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                📘 Session Info
              </h2>

              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Topic:</span> {roomName}
              </p>

              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Mentor:</span> {mentorName}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Session Code:</span> {sessionCode}
              </p>
            </div>

            {/* Chat Box */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col h-[420px]">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                💬 Live Chat
              </h2>

              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-xl p-3 border border-gray-200"
                  >
                    <p className="text-sm font-semibold text-gray-700">
                      {msg.sender}
                    </p>
                    <p className="text-gray-800">{msg.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 p-3 rounded-lg border border-gray-300 text-black"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />

                <button
                  onClick={sendMessage}
                  className="bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center space-x-6">
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            ← Home
          </Link>

          <Link href="/mentor-dashboard" className="text-purple-600 hover:underline font-medium">
            Mentor Dashboard
          </Link>

          <Link href="/student-dashboard" className="text-yellow-600 hover:underline font-medium">
            Student Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}