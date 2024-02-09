import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import journalsReducer from "./journals.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    journals: journalsReducer,
  },
});

