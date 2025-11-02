import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// iPhone 16 Pro baseline (points)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 907;

const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

// /**
//  * Scale font size
//  */
// export const scaleFont = (size: number) => {
//   return Math.round(PixelRatio.roundToNearestPixel(size * scale));
// };

// /**
//  * Scale width
//  */
// export const scaleWidthSize = (size: number) => {
//   return Math.round(PixelRatio.roundToNearestPixel(size * scaleWidth));
// };

// /**
//  * Scale height
//  */
// export const scaleHeightSize = (size: number) => {
//   return Math.round(PixelRatio.roundToNearestPixel(size * scaleHeight));
// };

// /**
//  * Scale spacing (margin & padding)
//  */
// export const scaleSpacing = (size: number) => {
//   return scaleWidthSize(size);
// };

// Mobile
// Tablet
// Website
