import * as React from "react";
import Svg, { Path } from "react-native-svg";
const MyFavoritesLogo = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16.73 4.37A4.34 4.34 0 0 0 13.53 3c-.923 0-1.769.287-2.514.853A5.1 5.1 0 0 0 10 4.897q-.451-.614-1.016-1.044A4.07 4.07 0 0 0 6.47 3a4.34 4.34 0 0 0-3.2 1.37C2.45 5.243 2 6.436 2 7.73c0 1.33.504 2.548 1.587 3.833.968 1.15 2.36 2.316 3.972 3.667.55.461 1.175.984 1.822 1.541a.95.95 0 0 0 1.237 0c.648-.556 1.272-1.08 1.823-1.541 1.612-1.351 3.004-2.518 3.972-3.667C17.496 10.278 18 9.06 18 7.729c0-1.293-.45-2.486-1.27-3.359"
      fill="#F6B01F"
    />
  </Svg>
);
export default MyFavoritesLogo;
