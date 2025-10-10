import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const PaymentCreditCardLogo = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M26.758 30H3.242A3.24 3.24 0 0 1 0 26.758V3.242A3.24 3.24 0 0 1 3.242 0h23.516A3.24 3.24 0 0 1 30 3.242v23.516A3.24 3.24 0 0 1 26.758 30"
        fill="#017851"
      />
      <Path
        d="M21.54 8.34H11.352a2.06 2.06 0 0 0-2.058 2.058v1.07H8.46c-1.134 0-2.054.92-2.058 2.058v6.084c0 1.135.92 2.055 2.058 2.059h10.188c1.134 0 2.054-.92 2.058-2.059v-1.413h.834c1.134 0 2.054-.92 2.054-2.058v-5.741c0-1.134-.92-2.058-2.054-2.058m-3.31 11.154h-3.78a.644.644 0 1 1 0-1.288h3.781a.644.644 0 1 1 0 1.288m1.186-3.643H7.695v-.877h11.722zm0-2.166H7.695v-.163c0-.425.344-.765.77-.77h10.187c.426 0 .765.345.77.77v.163zm2.888 2.45a.77.77 0 0 1-.765.768h-.834v-3.377c0-1.134-.92-2.054-2.058-2.058h-8.065v-1.07c0-.425.344-.765.769-.77H21.54c.425 0 .765.345.765.77z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h30v30H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PaymentCreditCardLogo;
