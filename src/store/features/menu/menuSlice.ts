import { createSlice } from "@reduxjs/toolkit";

interface IMenuState {
    isMenuOpen: boolean;
  }

const initialState: IMenuState = {
  isMenuOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
