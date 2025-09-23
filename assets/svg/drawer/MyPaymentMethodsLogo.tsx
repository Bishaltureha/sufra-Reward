import * as React from "react";
import Svg, { Path } from "react-native-svg";
const MyPaymentMethodsLogo = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.75 7.5V5.625a1.875 1.875 0 0 0-1.875-1.875H3.125A1.875 1.875 0 0 0 1.25 5.625V7.5zM1.25 8.75v5.625a1.875 1.875 0 0 0 1.875 1.875h13.75a1.875 1.875 0 0 0 1.875-1.875V8.75zm7.5 4.375H5.557a.625.625 0 1 1 0-1.25H8.75a.625.625 0 1 1 0 1.25"
      fill="#F6B01F"
    />
  </Svg>
);
export default MyPaymentMethodsLogo;
