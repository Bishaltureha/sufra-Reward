// src/store/slice/user.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  isProfileComplete?: boolean; // Track if user completed profile info
  // Add more user properties
}

interface UserState {
  data: UserData | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean; // For first-time welcome screens
  phoneNumber: string | null; // Temporary phone storage during registration
}

const initialState: UserState = {
  data: null,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  phoneNumber: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Save phone number temporarily during OTP flow
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },

    // After OTP verification - set user data
    setUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.phoneNumber = null; // Clear temporary phone
    },

    // Update user profile (after InformationScreen)
    updateUserProfile: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },

    // Logout
    logout: (state) => {
      state.data = null;
      state.isAuthenticated = false;
      state.phoneNumber = null;
      // Keep onboarding status
    },

    // Mark onboarding completed (after DiscoverSufraBenefits)
    completeOnboarding: (state) => {
      state.hasCompletedOnboarding = true;
    },

    // For testing - reset onboarding
    resetOnboarding: (state) => {
      state.hasCompletedOnboarding = false;
    },
  },
});

export const {
  setPhoneNumber,
  setUser,
  updateUserProfile,
  logout,
  completeOnboarding,
  resetOnboarding,
} = userSlice.actions;

export default userSlice.reducer;
