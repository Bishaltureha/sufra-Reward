import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LocationofCart = (props) => (
  <Svg
    width={24}
    height={30}
    viewBox="0 0 24 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 0A12.014 12.014 0 0 0 0 12c0 9.147 11.225 17.549 11.703 17.902a.5.5 0 0 0 .594 0C12.775 29.55 24 21.147 24 12A12.014 12.014 0 0 0 12 0m0 21a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9"
      fill="#027851"
    />
    <Path
      d="M9.229 8.646A2.65 2.65 0 0 1 11.875 6a2.65 2.65 0 0 1 2.646 2.646 2.65 2.65 0 0 1-2.646 2.647 2.65 2.65 0 0 1-2.646-2.647m4.317 3.483h-3.342A3.21 3.21 0 0 0 7 15.332c0 .845.687 1.532 1.532 1.532h6.686c.845 0 1.532-.687 1.532-1.532a3.21 3.21 0 0 0-3.204-3.203"
      fill="#027851"
    />
  </Svg>
);
export default LocationofCart;
