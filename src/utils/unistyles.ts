import { StyleSheet } from "react-native-unistyles";

// const lightTheme = {
//   colors: {
//     primary: "#ff1ff4",
//     secondary: "#1ff4ff",
//   },
//   gap: (v: number) => v * 8,
// };

// const otherTheme = {
//   colors: {
//     primary: "#aa12ff",
//     secondary: "pink",
//   },
//   gap: (v: number) => v * 8,
// };

// const appThemes = {
//   light: lightTheme,
//   other: otherTheme,
// };

const breakpoints = {
  xs: 0, // Extra small: phones in portrait (default)
  sm: 360, // Small: larger phones (Pixel, iPhone Pro Max)
  md: 768, // Medium: tablets (iPad Mini, portrait)
  lg: 1024, // Large: tablets in landscape, small laptops
  xl: 1280, // Extra large: desktop or large tablet screens
};

type AppBreakpoints = typeof breakpoints;
// type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  //   export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  //   settings: {
  //     initialTheme: "light",
  //   },
  breakpoints,
  //   themes: appThemes,
});
