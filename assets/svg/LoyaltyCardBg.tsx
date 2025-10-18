import * as React from "react";
import Svg, { G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const LoyaltyCardBg = (props) => (
  <Svg
    width={350}
    height={372}
    viewBox="0 0 350 372"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        d="M336 0c5.523 0 10 4.477 10 10v265c-8.442 0-15.285 7.163-15.285 16 0 8.699 6.631 15.776 14.89 15.995L346 307v43c0 5.523-4.477 10-10 10H14c-5.523 0-10-4.477-10-10v-43c8.441 0 15.284-7.164 15.284-16 0-8.699-6.63-15.776-14.89-15.995L4 275V10C4 4.477 8.477 0 14 0z"
        fill="#fff"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default LoyaltyCardBg;
