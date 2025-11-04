import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

interface PointsTwowheelerGreenProps {
  backgroundColor?: string;
  strokeColor?: string;
  strokeOpacity?: number;
  iconColor?: string;
}

const PointsTwowheelerGreen = ({
  backgroundColor = "#f7f7f8",
  strokeColor = "#cc5b41",
  strokeOpacity = 0.2,
  iconColor = "#017851",
  ...props
}: PointsTwowheelerGreenProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect width={24} height={24} rx={6} fill={backgroundColor} />
    <Rect
      x={0.5}
      y={0.5}
      width={23}
      height={23}
      rx={5.5}
      stroke={strokeColor}
      strokeOpacity={strokeOpacity}
    />
    <Path
      d="M17.833 7.833a1.667 1.667 0 0 0-1.666-1.666h-2.5v1.666h2.5v2.208l-2.917 3.625h-2.917V9.5H7a3.33 3.33 0 0 0-3.333 3.333v2.5h1.666c0 1.383 1.117 2.5 2.5 2.5s2.5-1.116 2.5-2.5h3.75l3.75-4.708zm-10 8.334A.836.836 0 0 1 7 15.333h1.666a.836.836 0 0 1-.833.833m.833-2.5H5.333v-.834c0-.917.75-1.667 1.667-1.667h1.666zm9.167-.834a2.497 2.497 0 0 0-2.5 2.5c0 1.383 1.117 2.5 2.5 2.5s2.5-1.116 2.5-2.5-1.116-2.5-2.5-2.5m0 3.333a.836.836 0 0 1-.833-.833c0-.458.375-.833.833-.833.459 0 .834.375.834.833a.836.836 0 0 1-.834.833m-7.5-7.5H6.167V7h4.166z"
      fill={iconColor}
    />
  </Svg>
);

export default PointsTwowheelerGreen;
