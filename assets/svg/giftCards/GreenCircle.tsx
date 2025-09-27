import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const GreenCircle = (props) => (
  <Svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={13} cy={13} r={13} fill="#017851" />
    <Circle cx={13} cy={13} r={7.8} fill="#fff" />
  </Svg>
);
export default GreenCircle;
