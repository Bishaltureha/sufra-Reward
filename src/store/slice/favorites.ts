// src/store/slice/favorites.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteItem {
  id: number;
  type: "brand" | "restaurant" | "order-again";
  name: string;
  image: any;
  addedAt: number;
}

interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id && item.type === action.payload.type
      );

      if (existingIndex !== -1) {
        // Remove from favorites
        state.items.splice(existingIndex, 1);
      } else {
        // Add to favorites
        state.items.push({
          ...action.payload,
          addedAt: Date.now(),
        });
      }
    },

    removeFavorite: (
      state,
      action: PayloadAction<{ id: number; type: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.type === action.payload.type)
      );
    },

    clearAllFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearAllFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
