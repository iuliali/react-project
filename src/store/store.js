import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import journalsReducer from "./journals.reducer";
import moodReducer from "./moodtracker.reducer";
import quotesReducer from './quotes.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    journals: journalsReducer,
    mood: moodReducer,
    quotes: quotesReducer,
  },
});

