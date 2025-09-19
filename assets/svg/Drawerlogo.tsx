import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Drawerlogo = (props) => (
  <Svg
    width={24}
    height={18}
    viewBox="0 0 24 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.333 0h21.334a1.333 1.333 0 0 1 0 2.667H1.333a1.333 1.333 0 0 1 0-2.667"
      fill="#017851"
    />
    <Path
      opacity={0.8}
      d="M1.333 7.667h16a1.333 1.333 0 0 1 0 2.666h-16a1.333 1.333 0 1 1 0-2.666"
      fill="#017851"
    />
    <Path
      opacity={0.6}
      d="M1.333 15.333h21.334a1.333 1.333 0 0 1 0 2.667H1.333a1.333 1.333 0 1 1 0-2.667"
      fill="#017851"
    />
  </Svg>
);
export default Drawerlogo;
