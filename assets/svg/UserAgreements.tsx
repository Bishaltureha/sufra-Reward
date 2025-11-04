import * as React from "react";
import Svg, { Path } from "react-native-svg";
const UserAgreements = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M19.047 20.801H6.625a.966.966 0 0 1-.966-.965V2h-1.6C3.473 2 3 2.474 3 3.058v18.92c0 .585.474 1.059 1.058 1.059h13.93c.585 0 1.059-.474 1.059-1.058z"
      fill="#f6b01f"
    />
    <Path
      d="M20.562 21.037H6.727a1.06 1.06 0 0 1-1.059-1.058V1.059A1.06 1.06 0 0 1 6.728 0h10.701l4.19 4.287v15.692c0 .584-.473 1.058-1.058 1.058"
      fill="#eaddaa"
    />
    <Path
      d="M21.717 4.287h-3.23a1.06 1.06 0 0 1-1.057-1.058V0zm-3.191 3.91H8.86a.362.362 0 0 1 0-.725h9.666a.362.362 0 0 1 0 .725m0 2.683H8.86a.362.362 0 0 1 0-.724h9.666a.362.362 0 0 1 0 .725m0 2.684H8.86a.362.362 0 0 1 0-.724h9.666a.362.362 0 0 1 0 .724"
      fill="#d86642"
    />
  </Svg>
);
export default UserAgreements;
