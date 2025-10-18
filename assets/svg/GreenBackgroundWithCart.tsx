import * as React from "react";
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg";
const GreenBackgroundWithCart = (props) => (
  <Svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#017851" />
    <G clipPath="url(#a)">
      <Path
        d="m25.04 24.359-1.403-9.846a1.45 1.45 0 0 0-1.428-1.23h-1.132v-.206a3.077 3.077 0 1 0-6.154 0v.205h-1.132a1.45 1.45 0 0 0-1.428 1.23L10.96 24.36a1.47 1.47 0 0 0 .336 1.149A1.45 1.45 0 0 0 12.38 26h11.24a1.44 1.44 0 0 0 1.083-.492 1.47 1.47 0 0 0 .337-1.149m-8.886-11.282a1.846 1.846 0 0 1 3.692 0v.205h-3.692zm4.923 4.103a3.077 3.077 0 1 1-6.154 0v-.821a.616.616 0 1 1 1.23 0v.82a1.846 1.846 0 0 0 3.693 0v-.82a.616.616 0 1 1 1.23 0z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M10 10h16v16H10z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default GreenBackgroundWithCart;
