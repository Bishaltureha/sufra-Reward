// src/store/slice/location.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface LocationAddress {
  street?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  name?: string;
  district?: string;
}

interface LocationState {
  isEnabled: boolean;
  isLoading: boolean;
  coords: LocationCoords | null;
  address: LocationAddress | null;
  formattedAddress: string | null; // "Al Barsha, Dubai"
  error: string | null;
  lastUpdated: number | null;
}

const initialState: LocationState = {
  isEnabled: false,
  isLoading: false,
  coords: null,
  address: null,
  formattedAddress: null,
  error: null,
  lastUpdated: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocationLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setLocationEnabled: (state, action: PayloadAction<boolean>) => {
      state.isEnabled = action.payload;
      if (!action.payload) {
        // Location disabled - clear data
        state.coords = null;
        state.address = null;
        state.formattedAddress = null;
      }
    },

    setLocationData: (
      state,
      action: PayloadAction<{
        coords: LocationCoords;
        address: LocationAddress;
      }>
    ) => {
      state.coords = action.payload.coords;
      state.address = action.payload.address;
      state.isEnabled = true;
      state.error = null;
      state.lastUpdated = Date.now();

      // Format address for display
      const { district, city, region } = action.payload.address;
      if (district && city) {
        state.formattedAddress = `${district}, ${city}`;
      } else if (city && region) {
        state.formattedAddress = `${city}, ${region}`;
      } else if (city) {
        state.formattedAddress = city;
      } else {
        state.formattedAddress = "Current Location";
      }
    },

    setLocationError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isEnabled = false;
    },

    clearLocation: (state) => {
      state.coords = null;
      state.address = null;
      state.formattedAddress = null;
      state.isEnabled = false;
      state.error = null;
    },
  },
});

export const {
  setLocationLoading,
  setLocationEnabled,
  setLocationData,
  setLocationError,
  clearLocation,
} = locationSlice.actions;

export default locationSlice.reducer;
