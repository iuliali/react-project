import { createSlice } from '@reduxjs/toolkit';

const moodSlice = createSlice({
    name: 'mood',
    initialState: {
        currentMood: null,
        moodHistory: [],
    },
    reducers: {
        setMood: (state, action) => {
            if (state.currentMood && state.currentMood.date &&
                state.currentMood.date.toDateString() == action.payload.date.toDateString()){ 
                state.moodHistory.pop(); 
                console.log('pop');
            }
            state.currentMood = action.payload;
            state.moodHistory.push(action.payload);
        },
        updateMood: (state, action) => {
            state.currentMood = action.payload;
            state.moodHistory= state.moodHistory.filter((mood) => mood.date.toDateString() !== action.payload.date.toDateString());
            state.moodHistory.push(action.payload);
        },
        setMoodHistory: (state, action) => {
            state.moodHistory = action.payload;
        },
        clearCurrentMood: (state) => {
            state.currentMood = {};
        },
        clearMood: (state) => {
            state.currentMood = {};
            state.moodHistory = [];
        },
    },
});

export const { setMood, setMoodHistory, updateMood, clearMood, clearCurrentMood } = moodSlice.actions;
export default moodSlice.reducer;