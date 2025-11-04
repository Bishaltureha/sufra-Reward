import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const ProfileInformationLogo = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M18.217.481H5.652c-2.844 0-5.15 1.73-5.15 3.863V5.68a.3.3 0 0 0 .3.3h22.266a.3.3 0 0 0 .3-.3V4.345c0-2.134-2.306-3.864-5.151-3.864"
        fill="#ffab00"
      />
      <Path
        d="M23.068 7.182H.802a.3.3 0 0 0-.3.3v12.24c0 2.133 2.306 3.862 5.15 3.862h12.565c2.844 0 5.15-1.73 5.15-3.863V7.482a.3.3 0 0 0-.299-.3M7.197 9.9a2.455 2.455 0 1 1 0 4.91 2.455 2.455 0 0 1 0-4.91m4.587 8.706H2.609v-.875c0-1.14.925-2.067 2.067-2.067h5.042c1.141 0 2.067.925 2.067 2.067zm8.492.034h-6.593a.75.75 0 0 1 0-1.5h6.593a.75.75 0 0 1 0 1.5m0-2.93h-6.593a.75.75 0 0 1 0-1.5h6.593a.75.75 0 0 1 0 1.5m0-3.114h-6.593a.75.75 0 0 1 0-1.5h6.593a.75.75 0 0 1 0 1.5"
        fill="#d86542"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ProfileInformationLogo;
