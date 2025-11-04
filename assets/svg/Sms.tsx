import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Sms = (props) => (
  <Svg
    width={38}
    height={38}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.25 13.75H26m-15.75 7H26m-15.75 7H19M36.5 19c0 9.665-7.835 17.5-17.5 17.5H1.5V19C1.5 9.335 9.335 1.5 19 1.5S36.5 9.335 36.5 19"
      stroke="#2a5637"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Sms;
