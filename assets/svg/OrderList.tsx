import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const OrderList = (props) => (
  <Svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={24} cy={24} r={24} fill="#F6B01F" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m30 10.875 2 1 2-1v24a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2v-24l2 1 2-1 2 1 2-1 2 1 2-1 2 1zm-12 20a1 1 0 0 0 1 1h6a1 1 0 0 0 0-2h-6a1 1 0 0 0-1 1m0-4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2h-4a1 1 0 0 1-1-1m1-3h6a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2m10 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-1-5a1 1 0 1 0 2 0 1 1 0 0 0-2 0m1-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-10-6h10a1 1 0 0 0 0-2H19a1 1 0 0 0 0 2"
      fill="#fff"
    />
  </Svg>
);
export default OrderList;
