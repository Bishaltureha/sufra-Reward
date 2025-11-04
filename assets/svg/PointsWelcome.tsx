import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const PointsWelcome = (props) => (
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.25 5c-.597 0-1.169.221-1.591.615A2.03 2.03 0 0 0 9 7.1v9.8c0 .557.237 1.091.659 1.485s.994.615 1.591.615h4.5c.597 0 1.169-.221 1.591-.615S18 17.457 18 16.9V7.1c0-.557-.237-1.091-.659-1.485A2.33 2.33 0 0 0 15.75 5zm.97 4.405a.78.78 0 0 1 .53-.205c.199 0 .39.074.53.205l2.25 2.1c.14.131.22.31.22.495a.68.68 0 0 1-.22.495l-2.25 2.1a.78.78 0 0 1-.527.196.78.78 0 0 1-.524-.205.68.68 0 0 1-.22-.489.68.68 0 0 1 .21-.492l.97-.905H6.75a.78.78 0 0 1-.53-.205A.68.68 0 0 1 6 12c0-.186.079-.364.22-.495a.78.78 0 0 1 .53-.205h6.44l-.97-.905A.68.68 0 0 1 12 9.9c0-.186.08-.364.22-.495"
      fill="#017851"
    />
  </Svg>
);
export default PointsWelcome;
