import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const CircularRightArrow = ({
  size = 20,
  color = "#007852",
  backgroundColor = "#ffffff",
  style = undefined,
}) => (
  <View style={[styles.container, style]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" style={styles.svg}>
      <Circle
        cx="12"
        cy="12"
        r="11"
        fill={backgroundColor}
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M10 8l4 4-4 4"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  svg: {
    alignSelf: "center",
  },
});

export default CircularRightArrow;
