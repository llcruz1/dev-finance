import { configureStore } from "@reduxjs/toolkit";
import equitiesReducer from "./equitiesSlice";

export const store = configureStore({
  reducer: {
    equities: equitiesReducer,
  },
});
