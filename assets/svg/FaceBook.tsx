import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const FaceBook = (props) => (
  <Svg
    width={42}
    height={42}
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={42} height={42} rx={8} fill="#1877f2" />
    <Path
      d="m29.174 27.316.931-6.07h-5.824v-3.939c0-1.661.814-3.28 3.423-3.28h2.648V8.86s-2.404-.41-4.701-.41c-4.797 0-7.932 2.907-7.932 8.17v4.627h-5.332v6.07h5.332v14.675h6.562V27.316z"
      fill="#fff"
    />
  </Svg>
);
export default FaceBook;
