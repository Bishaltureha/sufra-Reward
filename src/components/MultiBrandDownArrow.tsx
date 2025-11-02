import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const MultiBrandDownArrow = (props) => (
  <Svg
    width={34}
    height={34}
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="m19.018 33.163 14.143-14.142a2.857 2.857 0 0 0-4.04-4.04L17 27.102 4.878 14.98a2.857 2.857 0 0 0-4.04 4.04l14.143 14.143a2.854 2.854 0 0 0 4.037 0m.857-17.005L31.709 4.93a2.786 2.786 0 0 0 0-4.084c-1.188-1.128-3.114-1.128-4.303 0l-9.683 9.187L8.041.846C6.853-.282 4.925-.282 3.737.846a2.786 2.786 0 0 0 0 4.084l11.835 11.228c1.187 1.128 3.114 1.128 4.303 0"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M34 0v34H0V0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default MultiBrandDownArrow;
