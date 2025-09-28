import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: null,
    studentName: "",
    currentPoll: null,
    pollResults: null,
    history: [],
    timeRemaining: 0,
    hasAnswered: false,
    liveResults: null,
    liveStudentResults: null,
    allQuestions: [],
};

const pollSlice = createSlice({
    name: "poll",
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setStudentName: (state, action) => {
            state.studentName = action.payload;
        },
        setCurrentPoll: (state, action) => {
            state.currentPoll = action.payload;
            state.hasAnswered = false;
            state.pollResults = null;
            state.timeRemaining = action.payload?.timeRemaining || 0;
        },
        setPollResults: (state, action) => {
            state.pollResults = action.payload;
        },
        addToHistory: (state, action) => {
            state.history.push(action.payload);
        },
        setTimeRemaining: (state, action) => {
            state.timeRemaining = action.payload;
        },
        setHasAnswered: (state, action) => {
            state.hasAnswered = action.payload;
        },
        setLiveResults: (state, action) => {
            state.liveResults = action.payload;
        },
        setLiveStudentResults: (state, action) => {
            state.liveStudentResults = action.payload;
        },
        addQuestion: (state, action) => {
            state.allQuestions.push(action.payload);
        },
        clearPoll: (state) => {
            state.currentPoll = null;
            state.pollResults = null;
            state.hasAnswered = false;
            state.timeRemaining = 0;
            state.liveStudentResults = null;
        },
    },
});

export const {
    setRole,
    setStudentName,
    setCurrentPoll,
    setPollResults,
    addToHistory,
    setTimeRemaining,
    setHasAnswered,
    setLiveResults,
    setLiveStudentResults,
    addQuestion,
    clearPoll,
} = pollSlice.actions;

export default pollSlice.reducer;
