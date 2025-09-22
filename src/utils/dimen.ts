import { Dimensions, I18nManager, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("screen");
export const { width: windowWidth, height: windowHeight } =
  Dimensions.get("window");
export const isSmallDevice = width <= 375 && height <= 667;

const BASE_WIDTH = 375;
const SMALL_DEVICE_SCALE_FACTOR = 0.92;

/* eslint-disable no-unreachable */
const scale = (size: number) => {
  return size;
  // if (Platform.OS === "ios") {
  //   return size;
  // }

  const scaleFactor = width / BASE_WIDTH;
  let dim = size * scaleFactor;
  dim = Math.round(PixelRatio.roundToNearestPixel(dim));

  return isSmallDevice ? dim * SMALL_DEVICE_SCALE_FACTOR : dim;
};

const isAndroid = Platform.OS === "android";
const isWeb = Platform.OS === "web";
const isRTL = I18nManager.isRTL;

export {
  isAndroid,
  isWeb,
  scale,
  isRTL,
  height as screenHeight,
  width as screenWidth,
};
