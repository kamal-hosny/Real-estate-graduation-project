import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer, { RootState } from "./rootReducer";


const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["wishlist", "darkMode"],
};


const persistedReducer = persistReducer<RootState>(rootPersistConfig, rootReducer as any);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export default store;