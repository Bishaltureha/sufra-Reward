import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BellIcon = (props) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m16.544 13.163-1.069-1.538a1.25 1.25 0 0 1-.225-.713V6.5a6.25 6.25 0 0 0-12.5 0v4.413c0 .254-.08.503-.225.712l-1.069 1.537a1.25 1.25 0 0 0 .925 2.088h3.557a3.125 3.125 0 0 0 6.125 0h3.556a1.25 1.25 0 0 0 .925-2.088ZM9 16.5a1.875 1.875 0 0 1-1.762-1.25h3.524A1.87 1.87 0 0 1 9 16.5ZM2.381 14a.5.5 0 0 0 .075-.088l1.094-1.575A2.5 2.5 0 0 0 4 10.914V6.5a5 5 0 1 1 10 0v4.413a2.5 2.5 0 0 0 .45 1.425l1.094 1.575a.5.5 0 0 0 .075.087z"
      fill="#017851"
      stroke="#017851"
      strokeWidth={0.3}
    />
  </Svg>
);
export default BellIcon;
