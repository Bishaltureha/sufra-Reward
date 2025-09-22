import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SearchIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7.111 14.223a7.111 7.111 0 1 1 7.112-7.112 7.12 7.12 0 0 1-7.112 7.112m0-12.445a5.333 5.333 0 1 0 0 10.667 5.333 5.333 0 0 0 0-10.667"
      fill="#017851"
    />
    <Path
      d="M15.111 16a.9.9 0 0 1-.628-.26l-3.556-3.556a.89.89 0 0 1 1.257-1.257l3.556 3.556A.889.889 0 0 1 15.11 16"
      fill="#017851"
    />
  </Svg>
);
export default SearchIcon;
