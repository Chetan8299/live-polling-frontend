// src/components/StudentDashboard.jsx
import { useSelector } from "react-redux";
import { socket } from "../utils/socket";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const { studentName } = useSelector((state) => state.poll);
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    socket.emit("register_student", studentName);

    socket.on("new_question", (data) => setPoll(data));
    return () => {
      socket.off("new_question");
    };
  }, [studentName]);

  const submitAnswer = () => {
    socket.emit("submit_answer", { pollId: poll.id, option: selected });
    setPoll(null);
  };

  return (
    <div className="p-10 flex flex-col items-center">
      {!poll ? (
        <p className="text-gray">Wait for the teacher to ask questions...</p>
      ) : (
        <div className="w-full max-w-md border p-6 rounded shadow">
          <h3 className="font-bold text-lg">{poll.question}</h3>
          {poll.options.map((opt, i) => (
            <label
              key={i}
              className="block mt-2 p-2 border rounded cursor-pointer hover:bg-light"
            >
              <input
                type="radio"
                name="answer"
                value={opt.text}
                onChange={(e) => setSelected(e.target.value)}
                className="mr-2"
              />
              {opt.text}
            </label>
          ))}
          <button
            onClick={submitAnswer}
            className="bg-primary text-white px-4 py-2 rounded mt-4 w-full"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
