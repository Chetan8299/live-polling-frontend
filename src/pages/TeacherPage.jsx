import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import TeacherResultCard from "../components/TeacherResultCard";
import PollHistory from "../components/PollHistory";

export default function TeacherPage() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
    ]);
    const [timeLimit, setTimeLimit] = useState(60);
    const [pollActive, setPollActive] = useState(false);
    const [results, setResults] = useState(null);
    const [liveResults, setLiveResults] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [pollHistory, setPollHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        if (!socket.hasRegistered) {
            socket.emit("register_teacher");
            socket.hasRegistered = true;
        }

        socket.on("teacher_rejected", (data) => {
            alert(data.msg);
        });

        socket.on("live_poll_update", (data) => {
            setLiveResults(data);
        });

        socket.on("timer_update", (data) => {
            setTimeRemaining(data.timeRemaining);
        });

        socket.on("poll_ended", (data) => {
            setResults(data);
            setPollHistory((prev) => [data, ...prev]);
            setPollActive(false);
            setCurrentQuestion("");
            setTimeRemaining(0);
        });

        return () => {
            socket.off("teacher_rejected");
            socket.off("live_poll_update");
            socket.off("timer_update");
            socket.off("poll_ended");
        };
    }, []);

    const handleAddOption = () =>
        setOptions([...options, { text: "", isCorrect: false }]);

    const handleOptionChange = (i, field, value) => {
        const updated = [...options];
        updated[i] = { ...updated[i], [field]: value };
        setOptions(updated);
    };

    const askQuestion = () => {
        if (!question.trim() || options.some((opt) => !opt.text.trim())) {
            alert("Please fill in the question and all options.");
            return;
        }

        // Check if at least one option is marked as correct
        const hasCorrectAnswer = options.some((opt) => opt.isCorrect);
        if (!hasCorrectAnswer) {
            alert("Please mark at least one option as correct.");
            return;
        }

        socket.emit("ask_question", {
            question,
            options: options.filter((opt) => opt.text.trim()),
            timeLimit: parseInt(timeLimit),
        });

        setCurrentQuestion(question);
        setTimeRemaining(parseInt(timeLimit));
        setQuestion("");
        setOptions([
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
        ]);
        setResults(null);
        setLiveResults(null);
        setPollActive(true);
    };

    return (
        <div className="relative flex flex-col items-center p-6 px-0 pb-0 min-h-screen bg-white font-sora">
            {!pollActive && !results && (
                <div className="px-24 w-full flex items-center justify-start">
                    <span className="px-4 py-2 mt-10 rounded-[24px] flex items-center justify-between self-start gap-1 primary-gradient text-white text-sm font-medium">
                        <img src="/star.svg" alt="star" /> Intervue Poll
                    </span>
                </div>
            )}

            {!pollActive && !results && (
                <div className="w-full lg:w-3/4 self-start  bg-white  p-8 px-24 py-4 max-h-4/5 h-[75vh] overflow-auto">
                    <h1 className="text-[40px] font-semibold text-dark mb-2">
                        <span className="font-normal">Let's </span>Get Started
                    </h1>
                    <p className="text-black/50 text-lg mb-8">
                        You'll have the ability to create and manage polls, ask
                        questions, and monitor your students' responses in
                        real-time.
                    </p>

                    <div className="space-y-6">
                        {/* Question Section */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-base font-semibold text-dark">
                                    Enter your question
                                </label>
                                <div className="flex items-center space-x-2 relative">
                                    <select
                                        value={timeLimit}
                                        onChange={(e) =>
                                            setTimeLimit(e.target.value)
                                        }
                                        className="text-sm bg-light pr-6 pl-2 outline-none appearance-none  py-1 text-gray-600"
                                    >
                                        <option value={30}>30 seconds</option>
                                        <option value={60}>60 seconds</option>
                                    </select>
                                    <img
                                        src="/arrow.svg"
                                        alt="arrow"
                                        className="absolute right-4 w-3"
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <textarea
                                    value={question}
                                    onChange={(e) =>
                                        setQuestion(e.target.value)
                                    }
                                    placeholder="Enter your question here..."
                                    maxLength={100}
                                    className="w-full p-4 resize-none h-20 text-base bg-light outline-none"
                                />
                                <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-light">
                                    {question.length}/100
                                </div>
                            </div>
                        </div>

                        {/* Options Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Edit Options */}
                            <div>
                                <h3 className="text-base font-semibold text-dark mb-4">
                                    Edit Options
                                </h3>
                                <div className="space-y-3">
                                    {options.map((opt, i) => {
                                        const letters = ["1", "2", "3", "4"];
                                        return (
                                            <div
                                                key={i}
                                                className="flex items-center space-x-3"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                                                    {letters[i]}
                                                </div>
                                                <input
                                                    value={opt.text}
                                                    onChange={(e) =>
                                                        handleOptionChange(
                                                            i,
                                                            "text",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Option ${letters[i]}`}
                                                    className="flex-1 p-3  text-base bg-light"
                                                />
                                            </div>
                                        );
                                    })}
                                    <button
                                        onClick={handleAddOption}
                                        className="text-primary ml-10 text-md hover:underline border border-primary px-4 py-2 rounded-lg font-semibold"
                                    >
                                        + Add More option
                                    </button>
                                </div>
                            </div>

                            {/* Is it Correct? */}
                            <div>
                                <h3 className="text-base font-semibold text-dark mb-4">
                                    Is it Correct?
                                </h3>
                                <div className="space-y-3">
                                    {options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center space-x-4 h-14"
                                        >
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`correct-${i}`}
                                                    checked={
                                                        opt.isCorrect === true
                                                    }
                                                    onChange={() =>
                                                        handleOptionChange(
                                                            i,
                                                            "isCorrect",
                                                            true
                                                        )
                                                    }
                                                    className="w-4 h-4 accent-primary"
                                                />
                                                <span className="text-sm text-gray-700 font-semibold">
                                                    Yes
                                                </span>
                                            </label>
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`correct-${i}`}
                                                    checked={
                                                        opt.isCorrect === false
                                                    }
                                                    onChange={() =>
                                                        handleOptionChange(
                                                            i,
                                                            "isCorrect",
                                                            false
                                                        )
                                                    }
                                                    className="w-4 h-4 accent-primary"
                                                />
                                                <span className="text-sm text-gray-700 font-semibold">
                                                    No
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!pollActive && !results && (
                <div className="w-full">
                    <div className="border-[#B6B6B6] w-full border"></div>
                    <div className="flex justify-end pt-4 px-10">
                        <button
                            onClick={askQuestion}
                            className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-secondary transition-all"
                        >
                            Ask Question
                        </button>
                    </div>
                </div>
            )}
            {/* View Poll History Button - positioned in top right */}
            {(pollActive || results) && (
                <div className="fixed top-6 right-6 z-40">
                    <button
                        onClick={() => setShowHistory(true)}
                        className="px-4 py-2 bg-[#8F64E1] text-white rounded-full hover:bg-secondary transition-all flex items-center gap-2 text-sm"
                    >
                        👁 View Poll history
                    </button>
                </div>
            )}

            {/* Live Poll Section for Teacher */}
            {pollActive && (
                <div className="w-full max-w-2xl mt-8">
                    {liveResults ? (
                        <TeacherResultCard
                            question={currentQuestion}
                            results={liveResults.percentages}
                        />
                    ) : (
                        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                            <div className="text-center">
                                <div className="animate-pulse">
                                    <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                                    </div>
                                    <p className="text-gray-600">
                                        Waiting for student responses...
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Final Results */}
            {results && !pollActive && (
                <div className="w-full max-w-2xl mt-8">
                    <TeacherResultCard
                        question={results.question}
                        results={results.percentages}
                        isLive={false}
                    />

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setResults(null);
                                setPollActive(false);
                            }}
                            className="px-8 py-3 btn-grad text-white font-medium rounded-full hover:bg-secondary transition-all"
                        >
                            + Ask a new question
                        </button>
                    </div>
                </div>
            )}

            {/* {pollActive && <ChatBox />} */}

            <PollHistory
                isOpen={showHistory}
                onClose={() => setShowHistory(false)}
            />
        </div>
    );
}
