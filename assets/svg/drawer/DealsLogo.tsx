import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const DealsLogo = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M14.073 3.78C12.255 1.604 10.46.191 10.385.132a.625.625 0 0 0-1.01.493v2.748c0 1.42-1.878 1.919-2.582.685a.626.626 0 0 0-1.026-.086c-1.892 2.308-3.58 5.218-3.58 8.215C2.188 16.495 5.693 20 10 20s7.812-3.505 7.812-7.812c0-3.074-1.775-6.06-3.74-8.409M6.563 10a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0m1.743 5.384a.625.625 0 1 1-.987-.767l4.375-5.625a.625.625 0 1 1 .987.767zm3.881.241a1.251 1.251 0 0 1 0-2.5 1.25 1.25 0 0 1 0 2.5"
        fill="#F6B01F"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default DealsLogo;
