import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const AddLocationLogo = (props) => {
  const iconColor = props.color || "#007A3D"; // ✅ default green

  return (
    <Svg
      viewBox="0 0 24 24"
      width={props.width || 20}
      height={props.height || 20}
      fill="none"
      {...props}
    >
      {/* Outer ring */}
      <Path
        d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 
        4.069 11H2v2h2.069A8.01 8.01 0 0 0 
        11 19.931V22h2v-2.069A8.01 8.01 0 0 0 
        19.931 13H22v-2h-2.069A8.01 8.01 0 0 0 
        13 4.069"
        stroke={iconColor} // ✅ stroke visible now
        strokeWidth={2}
      />

      {/* Center dot */}
      <Circle
        cx={12}
        cy={12}
        r={3}
        fill={iconColor} // ✅ fill visible now
      />
    </Svg>
  );
};

export default AddLocationLogo;
