import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const X = (props) => (
  <Svg
    width={42}
    height={42}
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M6 0C2.69 0 0 2.69 0 6v30c0 3.31 2.69 6 6 6h30c3.31 0 6-2.69 6-6V6c0-3.31-2.69-6-6-6zm27.853 7.875-9.731 11.119 11.447 15.131h-8.963l-7.012-9.178-8.035 9.178H7.106l10.407-11.897L6.534 7.875h9.188l6.347 8.39 7.331-8.39zM30.31 31.463 14.381 10.397h-2.653l16.106 21.066z"
        fill="#000"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h42v42H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default X;
