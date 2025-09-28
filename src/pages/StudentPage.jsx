// src/pages/StudentPage.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../utils/socket";
import {
    setStudentName,
    setCurrentPoll,
    setPollResults,
    setTimeRemaining,
    setHasAnswered,
    setLiveStudentResults,
    addQuestion,
    clearPoll,
} from "../features/poll/pollSlice";
import QuestionCard from "../components/QuestionCard";
import ResultCard from "../components/ResultCard";
import ChatBox from "../components/ChatBox";
import Timer from "../components/Timer";

export default function StudentPage() {
    const dispatch = useDispatch();
    const {
        studentName,
        currentPoll,
        pollResults,
        timeRemaining,
        hasAnswered,
        liveStudentResults,
    } = useSelector((state) => state.poll);
    const [nameInput, setNameInput] = useState(studentName);
    const [joined, setJoined] = useState(!!studentName);

    useEffect(() => {
        if (joined) {
            socket.emit("register_student", studentName);

            socket.on("new_question", (data) => {
                dispatch(setCurrentPoll(data));
                dispatch(addQuestion(data));
                dispatch(setTimeRemaining(data.timeRemaining));
            });

            socket.on("timer_update", (data) => {
                dispatch(setTimeRemaining(data.timeRemaining));
            });

            socket.on("poll_result", (data) => {
                // Only show results if student has answered
                if (hasAnswered) {
                    dispatch(setPollResults(data));
                }
            });

            socket.on("answer_submitted", () => {
                dispatch(setHasAnswered(true));
            });

            socket.on("live_student_update", (data) => {
                // Receive live poll updates after submitting answer
                if (hasAnswered) {
                    dispatch(setLiveStudentResults(data));
                }
            });

            socket.on("poll_ended", (data) => {
                dispatch(setPollResults(data));
                dispatch(clearPoll());
            });

            return () => {
                socket.off("new_question");
                socket.off("poll_result");
                socket.off("timer_update");
                socket.off("answer_submitted");
                socket.off("live_student_update");
                socket.off("poll_ended");
            };
        }
    }, [joined, studentName, dispatch, hasAnswered]);

    const joinStudent = () => {
        if (!nameInput.trim()) return;
        dispatch(setStudentName(nameInput));
        setJoined(true);
    };

    const submitAnswer = (answer) => {
        if (!hasAnswered) {
            socket.emit("submit_answer", {
                pollId: currentPoll.id,
                option: answer,
            });
        }
    };

    return (
        <div className="flex flex-col items-center p-10 min-h-screen bg-white font-sora">
            {!joined ? (
                <div className="h-full w-full flex flex-col items-center justify-center translate-y-1/3">
                    <span className="px-4 py-2 rounded-[24px] flex items-center justify-between gap-1 primary-gradient text-white text-sm font-medium mb-6">
                        <img src="/star.svg" alt="star" /> Intervue Poll
                    </span>
                    <div className="w-screen  h-full flex items-center justify-center flex-col">
                        <h1 className="text-2xl md:text-3xl font-normal text-dark mb-2">
                            Let’s <span className="font-bold">Get Started</span>
                        </h1>
                        <p className="text-black/50 mb-10 text-center max-w-2xl">
                            If you’re a student, you’ll be able to{" "}
                            <span className="font-semibold text-black">
                                submit your answers,
                            </span>{" "}
                            participate in live polls, and see how your
                            responses compare with your classmates
                        </p>
                        <div className="w-full max-w-xl flex flex-col items-center">
                            <div className="max-w-full self-start">
                                Enter Your Name
                            </div>
                            <input
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                placeholder="Name"
                                className="w-full p-3 outline-none mb-4 bg-light  max-w-xl"
                            />
                        </div>

                        <button
                            onClick={joinStudent}
                            className="mt-10 px-12 py-3 btn-grad cursor-pointer text-white rounded-full shadow-md hover:bg-secondary transition"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {!currentPoll && !pollResults && (
                        <div className="text-center mt-20 flex flex-col items-center justify-center gap-6 translate-y-1/3">
                            <span className="px-4 py-2 rounded-[24px] flex items-center justify-between gap-1 primary-gradient text-white text-sm font-medium mb-6">
                                <img src="/star.svg" alt="star" /> Intervue Poll
                            </span>
                            <span className="loader"></span>
                            <p className="text-black text-3xl font-semibold">
                                Wait for the teacher to ask a new question...
                            </p>
                        </div>
                    )}

                    {currentPoll && (
                        <div className="w-full h-full flex flex-col items-center justify-center translate-y-1/2">
                            <div className="flex items-center justify-start gap-2 mb-2 w-full max-w-xl">
                                <h2 className="text-lg font-semibold text-dark">
                                    Question
                                </h2>
                                <Timer
                                    timeRemaining={timeRemaining}
                                    onTimeUp={() => console.log("Time is up!")}
                                />
                            </div>

                            {!hasAnswered ? (
                                <QuestionCard
                                    question={currentPoll.question}
                                    options={currentPoll.options}
                                    onSubmit={submitAnswer}
                                    disabled={hasAnswered}
                                />
                            ) : (
                                <div className="space-y-4 w-full max-w-xl">
                                    {/* Show live results if available */}
                                    {liveStudentResults && (
                                        <div className="bg-white w-full">
                                            <ResultCard
                                                question={
                                                    liveStudentResults.question
                                                }
                                                results={
                                                    liveStudentResults.percentages
                                                }
                                            />
                                        </div>
                                    )}

                                    <div className="font-semibold text-2xl w-full max-w-xl">
                                        Wait for the teacher to ask a new
                                        question..
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {!currentPoll && pollResults && (
                        <ResultCard
                            question={pollResults.question}
                            results={pollResults.percentages}
                        />
                    )}
                </>
            )}

            {/* {joined && <ChatBox />} */}
        </div>
    );
}
