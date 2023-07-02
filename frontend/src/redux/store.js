import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
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

// Konfigurasi untuk redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Menggabungkan semua reducer menjadi satu root reducer
const rootReducer = combineReducers({
  user: userReducer,
});

// Menerapkan persistensi pada rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Membuat store Redux
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Membuat persistor Redux
export let persistor = persistStore(store);
