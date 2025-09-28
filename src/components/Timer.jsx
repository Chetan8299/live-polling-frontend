import { useEffect, useState } from "react";

export default function Timer({ timeRemaining, totalTime = 60, onTimeUp }) {
    const [displayTime, setDisplayTime] = useState(timeRemaining);

    useEffect(() => {
        setDisplayTime(timeRemaining);
    }, [timeRemaining]);

    useEffect(() => {
        if (displayTime <= 0 && onTimeUp) {
            onTimeUp();
        }
    }, [displayTime, onTimeUp]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="flex items-center justify-center">
            <img src="/timer.svg" alt="timer" />
            <span
                className={`text-lg font-bold ${
                    displayTime <= 10 ? "text-red-500" : "text-gray-800"
                }`}
            >
                {formatTime(displayTime)}
            </span>
        </div>
    );
}
