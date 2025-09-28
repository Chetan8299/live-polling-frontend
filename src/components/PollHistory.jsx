import { useEffect, useState } from "react";
import { socket } from "../utils/socket";

export default function PollHistory({ isOpen, onClose }) {
    const [pollHistory, setPollHistory] = useState([]);

    useEffect(() => {
        if (isOpen) {
            socket.emit("get_poll_history");

            socket.on("poll_history", (data) => {
                setPollHistory(data);
            });

            return () => {
                socket.off("poll_history");
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white  p-8 w-full mx-4 h-full overflow-y-auto ">
                <div className="flex items-center justify-between mb-6">
                    <div></div>
                    <h2 className="text-2xl font-bold text-dark">
                        View Poll History
                    </h2>
                    <div></div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {pollHistory.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No polls created yet</p>
                    </div>
                ) : (
                    <div className="space-y-8 flex flex-col items-center">
                        {pollHistory.map((poll, index) => (
                            <div
                                key={index}
                                className="border-b border-gray-100 pb-6 last:border-b-0 max-w-2xl w-full"
                            >
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-dark mb-1">
                                        Question {index + 1}
                                    </h3>
                                </div>

                                <div className="border pb-4  rounded-md border-primary">
                                    <div className="question-grad text-white p-2 rounded-t-lg mb-6">
                                        <p className="text-base font-medium">
                                            {poll.question}
                                        </p>
                                    </div>
                                    <div className="space-y-3  px-4">
                                        {(
                                            poll.options ||
                                            Object.keys(poll.percentages || {})
                                        ).map((option, optIndex) => {
                                            // Handle both new format (with options array) and old format (just percentages)
                                            const optionText =
                                                typeof option === "object"
                                                    ? option.text
                                                    : option;
                                            const percentage =
                                                poll.percentages[optionText] ||
                                                "0.0";
                                            const color = "#7C3AED";
                                            const letters = [
                                                "A",
                                                "B",
                                                "C",
                                                "D",
                                            ];

                                            return (
                                                <div
                                                    key={optIndex}
                                                    className="flex items-center"
                                                >
                                                    <div className="flex-1">
                                                        <div className="w-full bg-transparent rounded-lg h-8 border border-primary relative">
                                                            <div className="absolute w-full h-8 flex items-center px-2 py-2">
                                                                <div
                                                                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                                                        percentage >
                                                                        10
                                                                            ? "text-primary bg-white"
                                                                            : "bg-primary text-white"
                                                                    } text-sm font-medium mr-3 flex-shrink-0`}
                                                                >
                                                                    {
                                                                        letters[
                                                                            optIndex
                                                                        ]
                                                                    }
                                                                </div>
                                                                <div className="w-full flex items-center justify-between">
                                                                    <span
                                                                        className={`text-base font-medium ${
                                                                            percentage >
                                                                            40
                                                                                ? "text-white"
                                                                                : "text-black"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            optionText
                                                                        }
                                                                    </span>
                                                                    <span
                                                                        className={`text-base font-bold ${
                                                                            percentage >
                                                                            95
                                                                                ? "text-white"
                                                                                : "text-black"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            percentage
                                                                        }
                                                                        %
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="h-8 rounded-lg transition-all duration-700"
                                                                style={{
                                                                    width: `${percentage}%`,
                                                                    backgroundColor:
                                                                        color,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
