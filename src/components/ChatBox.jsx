// src/components/ChatBox.jsx
import { useEffect, useState } from "react";
import { socket } from "../utils/socket";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState("chat");
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    socket.on("chat_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    socket.on("participants_list", (data) => setParticipants(data));

    return () => {
      socket.off("chat_message");
      socket.off("participants_list");
    };
  }, []);

  const sendMessage = () => {
    if (!msg.trim()) return;
    socket.emit("chat_message", msg);
    setMsg("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-72 bg-white shadow-lg rounded border">
      <div className="flex border-b">
        <button
          onClick={() => setTab("chat")}
          className={`flex-1 py-2 ${tab === "chat" ? "bg-primary text-white" : "bg-light"}`}
        >
          Chat
        </button>
        <button
          onClick={() => setTab("participants")}
          className={`flex-1 py-2 ${tab === "participants" ? "bg-primary text-white" : "bg-light"}`}
        >
          Participants
        </button>
      </div>

      {tab === "chat" ? (
        <div className="p-3">
          <div className="h-40 overflow-y-auto border p-2 rounded mb-2">
            {messages.map((m, i) => (
              <p key={i} className="text-sm">
                <span className="font-bold">{m.user}: </span>
                {m.text}
              </p>
            ))}
          </div>
          <div className="flex">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type a message"
              className="flex-1 border p-1 rounded"
            />
            <button onClick={sendMessage} className="ml-2 px-3 bg-primary text-white rounded">
              Send
            </button>
          </div>
        </div>
      ) : (
        <ul className="p-3">
          {participants.map((p, i) => (
            <li key={i} className="flex justify-between">
              {p.name}
              {p.role === "student" && (
                <button
                  onClick={() => socket.emit("kick_student", p.id)}
                  className="text-red-500 text-sm"
                >
                  Kick out
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
