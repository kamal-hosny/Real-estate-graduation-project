import { createSlice } from "@reduxjs/toolkit";

interface IMobileWidthState {
  isMobileWidth: boolean;
}

const initialState: IMobileWidthState = {
  isMobileWidth: window.innerWidth > 768,
};

const mobileWidthSlice = createSlice({
  name: "mobileWidth",
  initialState,
  reducers: {
    setMobileWidth: (state, action) => {
      state.isMobileWidth = action.payload;
    },
  },
});

export const { setMobileWidth } = mobileWidthSlice.actions;
export default mobileWidthSlice.reducer;
