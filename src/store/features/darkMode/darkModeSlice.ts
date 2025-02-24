import { createSlice } from "@reduxjs/toolkit";

interface IDarkModeState {
  isDarkMode: boolean;
}

const initialState: IDarkModeState = {
  isDarkMode: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
