import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRole } from "../features/poll/pollSlice";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelect = (role) => {
        dispatch(setRole(role));
        navigate(role === "teacher" ? "/teacher" : "/student");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white font-sora">
            <span className="px-4 py-2 rounded-[24px] flex items-center justify-between gap-1 primary-gradient text-white text-sm font-medium mb-6">
                <img src="/star.svg" alt="star" /> Intervue Poll
            </span>

            <h1 className="text-3xl md:text-4xl font-normal text-dark text-center">
                Welcome to the{" "}
                <span className="font-bold">Live Polling System</span>
            </h1>
            <p className="text-[#00000080] mt-2 text-center max-w-xl">
                Please select the role that best describes you to begin using
                the live polling system.
            </p>

            {/* Role Selection */}
            <div className="flex flex-col md:flex-row gap-6 mt-10">
                <button
                    onClick={() => handleSelect("student")}
                    className="w-72 cursor-pointer p-6 border border-[#D9D9D9] hover:border-2 hover:border-primary rounded-lg shadow hover:hover-primary-gradient transition text-left"
                >
                    <h3 className="font-semibold text-lg">I’m a Student</h3>
                    <p className="text-sm mt-1">
                        Participate in polls and view results in real-time.
                    </p>
                </button>

                <button
                    onClick={() => handleSelect("teacher")}
                    className="w-72 cursor-pointer p-6 border border-[#D9D9D9] hover:border-2 hover:border-primary rounded-lg shadow  transition text-left"
                >
                    <h3 className="font-semibold text-lg">I’m a Teacher</h3>
                    <p className="text-sm mt-1">
                        Create polls, ask questions, and monitor live responses.
                    </p>
                </button>
            </div>

            {/* Continue Button */}
            <button
                onClick={() => navigate("/")}
                className="mt-10 px-12 py-3 btn-grad cursor-pointer text-white rounded-full shadow-md hover:bg-secondary transition"
            >
                Continue
            </button>
        </div>
    );
}
