import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const OrderConfirmed = (props) => (
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
      d="M19.912 14.133A4.99 4.99 0 0 1 24 12c1.693 0 3.183.846 4.088 2.133a4.985 4.985 0 0 1 5.78 5.78A4.99 4.99 0 0 1 36 24a4.99 4.99 0 0 1-2.133 4.088 4.985 4.985 0 0 1-5.78 5.78A4.99 4.99 0 0 1 24 36a4.99 4.99 0 0 1-4.088-2.133 4.985 4.985 0 0 1-5.78-5.78A4.99 4.99 0 0 1 12 24c0-1.693.846-3.183 2.133-4.088a4.985 4.985 0 0 1 5.78-5.78m10.795 5.16a.996.996 0 0 0-1.414 0l-6.853 6.854-2.747-2.747a.999.999 0 1 0-1.414 1.415l3.453 3.453a1 1 0 0 0 1.415 0l7.56-7.561a1 1 0 0 0 0-1.414"
      fill="#fff"
    />
  </Svg>
);
export default OrderConfirmed;
