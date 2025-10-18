import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LocationfindStore = (props) => (
  <Svg
    width={9}
    height={12}
    viewBox="0 0 9 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m.75 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0"
      fill="#474749"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 4.678C0 2.094 2.015 0 4.5 0S9 2.094 9 4.678c0 4.001-4.09 7.024-4.267 7.152L4.5 12l-.233-.17C4.09 11.702 0 8.679 0 4.678m.818 0c0 3.04 2.835 5.583 3.682 6.272.847-.69 3.682-3.232 3.682-6.273C8.182 2.564 6.533.85 4.5.85S.818 2.564.818 4.677"
      fill="#474749"
    />
  </Svg>
);
export default LocationfindStore;
