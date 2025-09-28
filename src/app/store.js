import { configureStore } from "@reduxjs/toolkit";
import pollReducer from "../features/poll/pollSlice";

export const store = configureStore({
  reducer: {
    poll: pollReducer,
  },
});
