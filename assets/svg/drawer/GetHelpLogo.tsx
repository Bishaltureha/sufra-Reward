import * as React from "react";
import Svg, { Path } from "react-native-svg";
const GetHelpLogo = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16.85 3.858C15.658 2.5 13.1 1.667 10 1.667S4.342 2.5 3.15 3.858c-1.983 2.3-1.983 10 0 12.284C4.342 17.5 6.9 18.333 10 18.333s5.658-.833 6.85-2.191c1.983-2.3 1.983-9.984 0-12.284M10 14.583a.834.834 0 1 1 0-1.667.834.834 0 0 1 0 1.667m.833-4.066v.733a.834.834 0 0 1-1.666 0v-.775a1.575 1.575 0 0 1 1.108-1.525.95.95 0 1 0-1.225-.917.833.833 0 1 1-1.667 0A2.625 2.625 0 0 1 12.5 7.35a2.625 2.625 0 0 1-1.667 3.167"
      fill="#F6B01F"
    />
  </Svg>
);
export default GetHelpLogo;
