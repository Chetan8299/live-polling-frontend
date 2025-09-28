import { useState } from "react";
import { socket } from "../utils/socket";

export default function TeacherDashboard() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [timeLimit, setTimeLimit] = useState(60);

  const handleAddOption = () => setOptions([...options, ""]);
  const handleChange = (i, val) => {
    const updated = [...options];
    updated[i] = val;
    setOptions(updated);
  };

  const askQuestion = () => {
    socket.emit("ask_question", { question, options, timeLimit });
    setQuestion("");
    setOptions(["", ""]);
  };

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold">Let’s Get Started</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
        className="w-full p-2 border rounded mt-4"
      />
      {options.map((opt, i) => (
        <input
          key={i}
          value={opt}
          onChange={(e) => handleChange(i, e.target.value)}
          placeholder={`Option ${i + 1}`}
          className="w-full p-2 border rounded mt-2"
        />
      ))}
      <button onClick={handleAddOption} className="text-primary mt-2">
        + Add More Option
      </button>

      <div className="mt-6 flex justify-between">
        <select
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          className="border p-2 rounded"
        >
          <option value={30}>30 seconds</option>
          <option value={60}>60 seconds</option>
          <option value={90}>90 seconds</option>
        </select>
        <button
          onClick={askQuestion}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Ask Question
        </button>
      </div>
    </div>
  );
}
