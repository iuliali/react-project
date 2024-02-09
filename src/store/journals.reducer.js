import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    journals: [],
    pages: {},
};

const journalSlice = createSlice({
    name: 'journals',
    initialState,
    reducers: {
        setPages: (state, action) => {
            state.pages[action.payload.id] = action.payload.pages;
        },

        addPage: (state, action) => {
            state.pages[action.payload.id].push(action.payload.page);
        },

        setJournals: (state, action) => {
            state.journals = action.payload;
        },

        addJournal: (state, action) => {
            state.journals.push(action.payload);
        },

        removeJournal: (state, action) => {
            state.journals = state.journals.filter(journal => journal.id !== action);
        },

        updateJournal: (state, action) => {
            const { id, title, content } = action.payload;
            const journal = state.journals.find(journal => journal.id === id);
            if (journal) {
                journal.title = title;
                journal.content = content;
            }
        },
    },
});

export const { setPages, addPage, setJournals, addJournal, removeJournal, updateJournal } = journalSlice.actions;

export default journalSlice.reducer;