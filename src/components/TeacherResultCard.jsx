export default function TeacherResultCard({ question, results }) {
    const optionLetters = ["A", "B", "C", "D"];

    return (
        <div className="w-full bg-white overflow-hidden">
            <div className="p-6 pb-4">
                <h2 className="text-xl font-bold text-dark mb-4">Question</h2>

                {/* Question */}
                <div className="border pb-4 rounded-lg border-primary">
                    <div className="question-grad text-white p-2 rounded-t-lg mb-6">
                        <p className="text-base font-medium">{question}</p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 px-4">
                        {Object.entries(results).map(
                            ([option, percentage], index) => {
                                const color = "#7C3AED"; // teacher purple

                                return (
                                    <div
                                        key={index}
                                        className="relative w-full rounded-lg border border-primary overflow-hidden"
                                    >
                                        {/* Progress bar behind */}
                                        <div
                                            className="absolute top-0 left-0 h-full transition-all duration-700"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: color,
                                            }}
                                        ></div>

                                        {/* Option content with padding (similar to QuestionCard) */}
                                        <div className="relative z-10 flex items-center p-4">
                                            {/* Circle letter */}
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm font-bold transition-colors ${
                                                    percentage > 10
                                                        ? "bg-white text-primary border border-primary"
                                                        : "bg-primary text-white"
                                                }`}
                                            >
                                                {optionLetters[index]}
                                            </div>

                                            {/* Text + percentage */}
                                            <div className="flex justify-between items-center w-full">
                                                <span
                                                    className={`text-base font-medium ${
                                                        percentage > 40
                                                            ? "text-white"
                                                            : "text-dark"
                                                    }`}
                                                >
                                                    {option}
                                                </span>
                                                <span
                                                    className={`text-base font-bold ${
                                                        percentage > 95
                                                            ? "text-white"
                                                            : "text-dark"
                                                    }`}
                                                >
                                                    {percentage}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
