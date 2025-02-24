import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./auth/authSlice";
import darkModeReducer from "./features/darkMode/darkModeSlice";
import menuReducer from "./features/menu/menuSlice";
import mobileWidthReducer from "./features/mobileWidth/mobileWidthSlice";
import wishlistReducer from "./wishlist/wishlistReducer";
import toastsReducer from "./toasts/toastsSlice"
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "test"], 
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  darkMode: darkModeReducer,
  menu: menuReducer,
  mobileWidth: mobileWidthReducer,
  wishlist: wishlistReducer,
  toasts: toastsReducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;