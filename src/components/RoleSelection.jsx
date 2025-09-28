import { useDispatch } from "react-redux";
import { setRole } from "../features/poll/pollSlice";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chooseRole = (role) => {
    dispatch(setRole(role));
    navigate(role === "teacher" ? "/teacher" : "/student");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-light">
      <h1 className="text-3xl font-bold text-dark">
        Welcome to the <span className="text-primary">Live Polling System</span>
      </h1>
      <p className="text-gray mt-2">Please select your role</p>

      <div className="flex gap-6 mt-6">
        <button
          onClick={() => chooseRole("student")}
          className="border border-primary rounded-lg p-6 hover:bg-primary hover:text-white transition"
        >
          I’m a Student
        </button>
        <button
          onClick={() => chooseRole("teacher")}
          className="border border-gray rounded-lg p-6 hover:bg-accent hover:text-white transition"
        >
          I’m a Teacher
        </button>
      </div>
    </div>
  );
}
