import * as React from "react";
import Svg, { Path } from "react-native-svg";
const YellowCard = (props) => (
  <Svg
    width={35}
    height={35}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M34.48 16.262 18.73.512a1.743 1.743 0 0 0-2.467 0L.513 16.262a1.753 1.753 0 0 0 0 2.476l15.75 15.741v.01a1.753 1.753 0 0 0 2.476 0l15.75-15.75a1.746 1.746 0 0 0-.009-2.477M20.996 21.87v-4.375h-7v5.25h-3.5v-7c0-.972.779-1.75 1.75-1.75h8.75V9.62l6.125 6.125z"
      fill="#F6B01F"
    />
  </Svg>
);
export default YellowCard;
