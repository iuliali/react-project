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
            state.pages[action.payload.id].sort((a, b) => b.date - a.date);
        },

        clearPages: (state) => {
            state.pages = {};
        },

        addPage: (state, action) => {
            if (!state.pages[action.payload.id]) {
                state.pages[action.payload.id] = [];
            }
            state.pages[action.payload.id].push(action.payload.page);
            state.pages[action.payload.id].sort((a, b) => b.date - a.date);
        },

        deletePage: (state, action) => {
            state.pages[action.payload.id] = state.pages[action.payload.id].filter(page => page.id !== action.payload.pageId);
        },

        updatePage: (state, action) => {
            const { id:id, page:updatedPage } = action.payload;
            state.pages[id] = state.pages[id].filter(page => page.id !== updatedPage.id);
            state.pages[id].push(updatedPage);
            state.pages[id].sort((a, b) => b.date - a.date);
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

export const { setPages, addPage, setJournals, addJournal, removeJournal, clearPages,
     updateJournal, deletePage, updatePage } = journalSlice.actions;

export default journalSlice.reducer;