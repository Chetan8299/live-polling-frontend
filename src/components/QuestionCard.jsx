import { useState } from "react";

export default function QuestionCard({
    question,
    options,
    onSubmit,
    disabled = false,
    // timeRemaining = 0,
    // questionNumber = 1,
}) {
    const [selected, setSelected] = useState("");

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const optionLetters = ["1", "2", "3", "4"];
    const activeColor = "#7C3AED"; // purple

    return (
        <div className="w-full max-w-xl  overflow-hidden">
            {/* Header */}
            {/* <div className="flex items-center justify-between p-6 pb-4">
                <h2 className="text-lg font-semibold text-dark">
                    Question {questionNumber}
                </h2>
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-red-500 font-medium">
                        {formatTime(timeRemaining)}
                    </span>
                </div>
            </div> */}

            {/* Question */}
            <div className="pb-6 w-full max-w-xl">
                <div className="border border-primary rounded-lg">
                    <div className="question-grad text-white p-4 rounded-t-lg mb-6">
                        <p className="text-base font-medium">{question}</p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 px-4 pb-4">
                        {options.map((opt, i) => {
                            const isSelected = selected === opt.text;

                            return (
                                <label
                                    key={i}
                                    className={`flex items-center p-4 rounded-lg border relative cursor-pointer transition-all ${
                                        isSelected
                                            ? "border-primary bg-purple-50"
                                            : "border-[#8D8D8D30] bg-[#F6F6F6] hover:border-gray-300"
                                    } ${
                                        disabled
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                >
                                    {/* Circle number */}
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 transition-colors`}
                                        style={{
                                            backgroundColor: isSelected
                                                ? activeColor
                                                : "#8D8D8D",
                                            color: isSelected
                                                ? "white"
                                                : "white",
                                        }}
                                    >
                                        {optionLetters[i]}
                                    </div>

                                    {/* Hidden radio input */}
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={opt.text}
                                        checked={isSelected}
                                        onChange={(e) =>
                                            !disabled &&
                                            setSelected(e.target.value)
                                        }
                                        className="sr-only"
                                        disabled={disabled}
                                    />

                                    {/* Option text */}
                                    <span
                                        className={`text-base font-medium flex-1 ${
                                            isSelected
                                                ? "text-dark"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {opt.text}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end w-full">
                    <button
                        disabled={!selected || disabled}
                        onClick={() => onSubmit(selected)}
                        className="w-40 mt-6 py-3 px-6 bg-primary text-white font-medium rounded-full hover:bg-secondary disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
