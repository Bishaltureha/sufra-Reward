import * as React from "react";
import Svg, { Path } from "react-native-svg";
const FrontArrow = (props) => (
  <Svg
    width={8}
    height={14}
    viewBox="0 0 8 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M.983 1.016a.85.85 0 0 1 .448.121l.125.092.002.002 5.666 5.213A.74.74 0 0 1 7.482 7a.75.75 0 0 1-.254.553l-.002.001-5.668 5.208a.8.8 0 0 1-.575.22c-.437 0-.801-.319-.801-.76 0-.22.09-.405.23-.544l.005-.004L5.506 7 .417 2.326.412 2.32a.77.77 0 0 1-.23-.543c0-.442.364-.762.801-.762Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.3}
    />
  </Svg>
);
export default FrontArrow;
