import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const ShowMorePlusLogo = (props) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)" fill="#99A1B7">
      <Path
        opacity={0.1}
        d="M11.95.975H6.125A5.075 5.075 0 0 0 1.05 6.05v5.825a5.075 5.075 0 0 0 5.075 5.075h5.825a5.075 5.075 0 0 0 5.075-5.075V6.05A5.075 5.075 0 0 0 11.95.975"
      />
      <Path d="M11.94 1.988a4.073 4.073 0 0 1 4.073 4.072v5.88a4.07 4.07 0 0 1-4.073 4.073H6.06a4.073 4.073 0 0 1-4.072-4.073V6.06A4.073 4.073 0 0 1 6.06 1.988zm-6.442 7.71h2.805v2.804a.697.697 0 1 0 1.394 0V9.698h2.806a.697.697 0 1 0 0-1.394H9.697V5.497a.698.698 0 0 0-1.394 0v2.806H5.497a.698.698 0 0 0 0 1.394M11.94.938H6.06A5.12 5.12 0 0 0 .938 6.06v5.88a5.123 5.123 0 0 0 5.122 5.123h5.88a5.123 5.123 0 0 0 5.123-5.123V6.06A5.123 5.123 0 0 0 11.94.938" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ShowMorePlusLogo;
