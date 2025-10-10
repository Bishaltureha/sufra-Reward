import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Double = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M26.758 30H3.242A3.24 3.24 0 0 1 0 26.758V3.242A3.24 3.24 0 0 1 3.242 0h23.516A3.24 3.24 0 0 1 30 3.242v23.516A3.24 3.24 0 0 1 26.758 30"
      fill="#017851"
    />
    <Path d="M11 7h6l-6 16H5zm8 0h6l-6 16h-6z" fill="#fff" />
  </Svg>
);
export default Double;
