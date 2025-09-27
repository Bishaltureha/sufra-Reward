import * as React from "react";
import Svg, { Rect, Circle, Path } from "react-native-svg";
const CircularTick = (props) => (
  <Svg
    width={62}
    height={62}
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={1}
      y={1}
      width={60}
      height={60}
      rx={30}
      stroke="#14CA73"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    <Circle
      cx={31}
      cy={31}
      r={25.2}
      transform="rotate(-90 31 31)"
      fill="#057A55"
    />
    <Path
      d="M39.257 23.057a1.44 1.44 0 0 1 2.107 0 1.62 1.62 0 0 1 .144 2.035l-.144.175-13.035 13.675a1.44 1.44 0 0 1-1.94.151l-.166-.151-5.586-5.86a1.62 1.62 0 0 1 0-2.21 1.44 1.44 0 0 1 1.94-.152l.166.151 4.533 4.756z"
      fill="#fff"
    />
  </Svg>
);
export default CircularTick;
