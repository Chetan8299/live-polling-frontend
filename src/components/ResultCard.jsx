export default function ResultCard({ question, results }) {
    const optionNumbers = ["1", "2", "3", "4"];
    const colors = {
        Mars: "#7765DA",
        Venus: "#FF6B6B",
        Jupiter: "#4ECDC4",
        Saturn: "#FFE66D",
    };

    return (
        <div className="w-full bg-white overflow-hidden">
            {/* Question block */}
            <div className="border pb-4 rounded-lg border-primary">
                <div className="question-grad text-white p-2 rounded-t-lg mb-6">
                    <p className="text-base font-medium">{question}</p>
                </div>

                {/* Options */}
                <div className="space-y-3 px-4">
                    {Object.entries(results).map(
                        ([option, percentage], index) => {
                            const color = colors[option] || "#7765DA";
                            const textColor =
                                percentage > 40 ? "text-white" : "text-dark";

                            return (
                                <div
                                    key={index}
                                    className="relative w-full rounded-lg border border-gray-200 overflow-hidden"
                                >
                                    {/* Progress bar behind */}
                                    <div
                                        className="absolute top-0 left-0 h-full transition-all duration-700"
                                        style={{
                                            width: `${percentage}%`,
                                            backgroundColor: color,
                                        }}
                                    ></div>

                                    {/* Option content with padding (same as QuestionCard) */}
                                    <div className="relative z-10 flex items-center p-4">
                                        {/* Circle number */}
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-4 flex-shrink-0 ${
                                                percentage > 30
                                                    ? "text-primary bg-white"
                                                    : "bg-primary text-white"
                                            } `}
                                        >
                                            {optionNumbers[index]}
                                        </div>

                                        {/* Text + percentage */}
                                        <div className="flex justify-between items-center w-full">
                                            <span
                                                className={`text-base font-medium ${textColor}`}
                                            >
                                                {option}
                                            </span>
                                            <span
                                                className={`text-base font-semibold ${textColor}`}
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
    );
}
