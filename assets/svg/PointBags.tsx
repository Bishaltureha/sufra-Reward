import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const PointBags = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={24} height={24} rx={6} fill="#f7f7f8" />
    <Rect
      x={0.5}
      y={0.5}
      width={23}
      height={23}
      rx={5.5}
      stroke="#cc5b41"
      strokeOpacity={0.2}
    />
    <Path
      d="M7 20.333q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177v-10q0-.687.49-1.177.491-.49 1.177-.49h1.667q0-1.374.979-2.353A3.2 3.2 0 0 1 12 3.666a3.2 3.2 0 0 1 2.354.98A3.2 3.2 0 0 1 15.334 7H17q.688 0 1.178.49t.489 1.176v10q0 .688-.49 1.178-.491.49-1.177.49zm0-1.666h10v-10h-1.666v1.666q0 .354-.24.594a.8.8 0 0 1-.594.24.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.594V8.666h-3.332v1.667q0 .354-.24.594a.8.8 0 0 1-.594.24.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.594V8.666H7zM10.334 7h3.333q0-.687-.49-1.178A1.6 1.6 0 0 0 12 5.333q-.687 0-1.177.49-.49.491-.49 1.177"
      fill="#017851"
    />
  </Svg>
);
export default PointBags;
