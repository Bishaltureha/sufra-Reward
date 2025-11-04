import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BackArrow = (props) => (
  <Svg
    width={13}
    height={20}
    viewBox="0 0 13 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M11.888 19.414a2.146 2.146 0 0 1-2.948 0L.61 11.418a1.95 1.95 0 0 1-.553-1.88c.085-.35.27-.683.555-.956L8.942.586a2.147 2.147 0 0 1 2.948 0 1.945 1.945 0 0 1 0 2.83l-6.86 6.585 6.858 6.583a1.945 1.945 0 0 1 0 2.83"
      fill="#979797"
    />
  </Svg>
);
export default BackArrow;
