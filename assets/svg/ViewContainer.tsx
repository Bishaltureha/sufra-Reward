// assets/svg/ViewContainer.tsx
import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const ViewContainer = (props) => (
  <Svg
    width={width} // ✅ makes it responsive
    height={50}
    viewBox="0 0 348 50"
    fill="none"
    preserveAspectRatio="none" // ✅ ensures it stretches properly
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    }}
    {...props}
  >
    <Path
      opacity={0.07}
      d="M192.533 15.5L348 0V40C348 45.5228 343.523 50 338 50H10C4.47715 50 0 45.5228 0 40L0 15.5H192.533Z"
      fill="black"
    />
  </Svg>
);

export default ViewContainer;
