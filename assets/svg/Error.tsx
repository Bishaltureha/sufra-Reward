import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const Error = (props) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M12.736 1.31A8.547 8.547 0 0 0 1.314 5.265 8.55 8.55 0 0 0 8.992 17.55a8.7 8.7 0 0 0 2.802-.475 8.5 8.5 0 0 0 4.893-4.343 8.55 8.55 0 0 0-3.951-11.421M9.097 13.644a1.01 1.01 0 0 1-1.01-1.011 1.007 1.007 0 1 1 1.011 1.011m.944-3.784a.947.947 0 0 1-1.888 0l-.386-4.48q-.006-.043-.005-.085a.944.944 0 0 1 .948-.942h.774q.044-.001.086.004c.52.044.904.503.858 1.024z"
        fill="#FF617E"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Error;
