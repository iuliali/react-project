import { createSlice } from '@reduxjs/toolkit';

const moodSlice = createSlice({
    name: 'mood',
    initialState: {
        currentMood: {},
        moodHistory: [],
    },
    reducers: {
        setMood: (state, action) => {
            console.log(state.currentMood.date.toDateString() == action.payload.date.toDateString());
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
            console.log('updateMood', state.moodHistory.length);
            state.moodHistory= state.moodHistory.filter((mood) => mood.date.toDateString() !== action.payload.date.toDateString());
            console.log('updateMood', state.moodHistory.length);
            state.moodHistory.push(action.payload);
        },
        setMoodHistory: (state, action) => {
            console.log('setMoodHistory');
            state.moodHistory = action.payload;
            state.moodHistory.sort((a, b) => a.date - b.date);
            if (state.moodHistory.length > 0) {
                if ( new Date().toDateString() === state.moodHistory[state.moodHistory.length - 1].date.toDateString()) {
                        state.currentMood = state.moodHistory[state.moodHistory.length - 1];
                    }
            }
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