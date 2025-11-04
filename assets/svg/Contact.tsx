import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Contact = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.859 5.98H20.01a.5.5 0 0 0 .5-.5V3.109A2.626 2.626 0 0 0 17.885.482h-11.9a2.626 2.626 0 0 0-2.626 2.626V5.48a.5.5 0 0 0 .5.5"
      fill="#ffab00"
    />
    <Path
      d="M3.859 23.584H20.01a.5.5 0 0 0 .5-.5V7.682a.5.5 0 0 0-.5-.5H3.859a.5.5 0 0 0-.5.5v15.402a.5.5 0 0 0 .5.5m8.076-14.4a2.85 2.85 0 1 1 0 5.7 2.85 2.85 0 0 1 0-5.7M6.61 18.271a2.4 2.4 0 0 1 2.399-2.399h5.853a2.4 2.4 0 0 1 2.399 2.4v1.015H6.61z"
      fill="#d86542"
    />
  </Svg>
);
export default Contact;
