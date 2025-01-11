import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: JSON.parse(localStorage.getItem('mode')) || 'light',
};

const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        toggleMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('mode', JSON.stringify(state.mode));
        },
    },
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;