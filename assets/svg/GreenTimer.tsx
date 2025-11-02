import * as React from "react";
import Svg, { Path } from "react-native-svg";
const GreenTimer = (props) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.667 0a6.667 6.667 0 1 0 6.666 6.667A6.674 6.674 0 0 0 6.667 0m2.368 8.596L6.368 7.263A.67.67 0 0 1 6 6.667V3.333a.667.667 0 1 1 1.333 0v2.922l2.299 1.149a.667.667 0 0 1-.597 1.192"
      fill="#017851"
    />
  </Svg>
);
export default GreenTimer;
