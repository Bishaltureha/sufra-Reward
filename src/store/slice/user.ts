import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  token?: string;
  isProfileComplete?: boolean;
}

interface UserState {
  data: UserData | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  phoneNumber: string | null;
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
    // 1️⃣ During login — save phone temporarily
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },

    // 2️⃣ After OTP verification — set full user data
    setUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.phoneNumber = null;
    },

    // 3️⃣ After info form — merge user profile
    updateUserProfile: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.data) {
        state.data = {
          ...state.data,
          ...action.payload,
          isProfileComplete: true,
        };
      }
    },

    // 4️⃣ For onboarding completion (once user has seen welcome)
    completeOnboarding: (state) => {
      state.hasCompletedOnboarding = true;
    },

    // 5️⃣ Logout
    logout: (state) => {
      state.data = null;
      state.isAuthenticated = false;
      state.phoneNumber = null;
    },

    // 🔧 For testing or reset
    resetOnboarding: (state) => {
      state.hasCompletedOnboarding = false;
    },
  },
});

export const {
  setPhoneNumber,
  setUser,
  updateUserProfile,
  completeOnboarding,
  logout,
  resetOnboarding,
} = userSlice.actions;

export default userSlice.reducer;
