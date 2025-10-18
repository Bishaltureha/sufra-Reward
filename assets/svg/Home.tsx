import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Home = (props) => (
  <Svg
    width={15}
    height={13}
    viewBox="0 0 15 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M.833 1.625V0h13.334v1.625zM.833 13V8.125H0V6.5l.833-4.062h13.334L15 6.5v1.625h-.833V13H12.5V8.125H9.167V13zM2.5 11.375h5v-3.25h-5zM1.708 6.5h11.584l-.5-2.437H2.208z"
      fill="#FFAB00"
    />
  </Svg>
);
export default Home;
