// src/store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import { storage } from "../utils/storage"; // Your existing MMKV storage
import userReducer from "./slice/user";
import locationReducer from "./slice/location";
import favoritesReducer from "./slice/favorites";

// MMKV Storage Adapter for Redux Persist
const mmkvStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

// Persist configuration
const persistConfig = {
  key: "sufra-root",
  version: 1,
  storage: mmkvStorage,
  whitelist: ["user", "location", "favorites"], // Persist all three
};

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer,
  favorites: favoritesReducer,
  // Add more reducers here as needed
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
