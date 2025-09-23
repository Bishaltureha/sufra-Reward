import * as React from "react";
import Svg, { Path } from "react-native-svg";
const MyAddressesLogo = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.765 2.54A7.55 7.55 0 0 0 8.495.98a7.5 7.5 0 0 0-3.06 13.298 12.7 12.7 0 0 1 3.268 3.514l.584.97a.834.834 0 0 0 1.428 0l.56-.932a10.6 10.6 0 0 1 2.98-3.333 7.49 7.49 0 0 0 .51-11.96zM10 11.668A3.333 3.333 0 1 1 10 5a3.333 3.333 0 0 1 0 6.667"
      fill="#F6B01F"
    />
  </Svg>
);
export default MyAddressesLogo;
