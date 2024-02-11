import { createSlice } from '@reduxjs/toolkit';

const quotesSlice = createSlice({
    name: 'quotes',
    initialState: {quotes: []},
    reducers: {
        addQuote: (state, action) => {
            state.quotes.push(action.payload);
        },

        setQuotes: (state, action) => {
            console.log('setting quotes');
            state.quotes = action.payload;
        },
    },
});

export const { addQuote, setQuotes } = quotesSlice.actions;
export default quotesSlice.reducer;