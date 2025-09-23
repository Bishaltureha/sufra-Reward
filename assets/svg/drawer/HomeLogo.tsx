import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";
const HomeLogo = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="a"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={16}
      height={16}
    >
      <Path d="M0 0h16v16H0z" fill="#fff" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.006 7.636c0-.43.177-.842.49-1.137L6.931.426a1.56 1.56 0 0 1 2.144 0l6.435 6.073c.313.295.49.706.49 1.137l-.006 6.802c0 .862-.7 1.562-1.562 1.562H9.996v-4.375a.937.937 0 0 0-.937-.937H6.935a.937.937 0 0 0-.937.937V16H1.562C.699 16 0 15.3 0 14.438z"
        fill="#F6B01F"
      />
    </G>
  </Svg>
);
export default HomeLogo;
