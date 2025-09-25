import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LocationLogo = (props) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13.5 2.279a6.75 6.75 0 1 0-8.877 10.166 16.4 16.4 0 0 1 3.881 4.698.562.562 0 0 0 .991-.001l.046-.087a16.6 16.6 0 0 1 3.876-4.645A6.743 6.743 0 0 0 13.5 2.28M9 10.125A2.812 2.812 0 1 1 9 4.5a2.812 2.812 0 0 1 0 5.625"
      fill="#017851"
    />
  </Svg>
);
export default LocationLogo;
