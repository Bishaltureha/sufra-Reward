import * as React from "react";
import Svg, { Path } from "react-native-svg";
const NewBadge = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="m28.441 21.393-21.75-7.377V1.23l21.75 7.377z" fill="#F7A334" />
    <Path d="m1.559 8.607 21.75 7.377V28.77l-21.75-7.377z" fill="#F7A334" />
    <Path d="M1.559 8.607H28.44v12.791H1.56z" fill="#FBB03B" />
    <Path
      d="m8.08 15.2-2.63-3.188H4.054v5.976h1.658v-3.187l2.637 3.187h1.388v-5.976H8.08zm4.524.386h2.654v-1.26h-2.654v-1.008h3.011v-1.306h-4.681v5.976h4.793v-1.306h-3.123zm11.73-3.574-1.254 3.85-1.207-3.85H20.32l-1.26 3.814-1.2-3.814h-1.74l1.933 5.976h1.81l1.19-3.638 1.148 3.638h1.805l1.94-5.976z"
      fill="#026947"
    />
  </Svg>
);
export default NewBadge;
