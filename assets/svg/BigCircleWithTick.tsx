import * as React from "react";
import Svg, { Rect, Circle, Path } from "react-native-svg";
const BigCircleWithTick = (props) => (
  <Svg
    width={71}
    height={71}
    viewBox="0 0 71 71"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={1}
      y={1}
      width={69}
      height={69}
      rx={34.5}
      stroke="#057A55"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    <Circle
      cx={35.499}
      cy={35.5}
      transform="rotate(-90 35.5 35.5)"
      fill="#057A55"
      r={28.98}
    />
    <Path
      d="M44.996 26.366a1.657 1.657 0 0 1 2.422 0c.608.639.664 1.637.166 2.34l-.166.202-14.99 15.726a1.654 1.654 0 0 1-2.23.174l-.192-.174-6.424-6.74a1.86 1.86 0 0 1 0-2.541 1.654 1.654 0 0 1 2.23-.175l.192.175 5.213 5.469z"
      fill="#fff"
    />
  </Svg>
);
export default BigCircleWithTick;
