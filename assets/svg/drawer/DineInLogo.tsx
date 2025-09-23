import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DineInLogo = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.286 0a.71.71 0 0 0-.709.714h-.006V6.43a.714.714 0 1 1-1.428 0V.714h-.006A.71.71 0 0 0 6.43 0a.71.71 0 0 0-.71.714h-.005V6.43a.714.714 0 1 1-1.428 0V.714A.71.71 0 0 0 3.577 0a.71.71 0 0 0-.709.714h-.01v7.143c0 .879.88 1.634 2.142 1.965v8.75a1.429 1.429 0 0 0 2.857 0v-8.75C9.118 9.49 10 8.736 10 7.857V.714h-.006A.71.71 0 0 0 9.286 0m7.5 0c-2.564 0-4.643 4.477-4.643 10q0 .728.047 1.429h2.096v7.142a1.429 1.429 0 1 0 2.857 0V.03a2 2 0 0 0-.357-.03"
      fill="#F6B01F"
    />
  </Svg>
);
export default DineInLogo;
