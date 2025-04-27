import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./auth/authSlice";
import darkModeReducer from "./features/darkMode/darkModeSlice";
import menuReducer from "./features/menu/menuSlice";
import mobileWidthReducer from "./features/mobileWidth/mobileWidthSlice";
import wishlistReducer from "./wishlist/wishlistReducer";
import toastsReducer from "./toasts/toastsSlice";
import modal from "./modal/modalSlice"
import usersSlice from "./user/usersSlice";
import propertySlice from "./property/propertySlice";
import deepSeekSlice from "./AIModleDeepSeek/deepSeekSlice";
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"], 
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  darkMode: darkModeReducer,
  menu: menuReducer,
  mobileWidth: mobileWidthReducer,
  wishlist: wishlistReducer,
  toasts: toastsReducer,
  property: propertySlice,
  modal,
  deepSeek: deepSeekSlice,
  user: usersSlice
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;