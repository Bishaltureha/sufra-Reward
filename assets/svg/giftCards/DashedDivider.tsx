import React from "react";
import { View } from "react-native";
import Svg, { Line } from "react-native-svg";

const DashedDivider = () => {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <Svg height="1" width="100%">
        <Line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#DEE1E9"
          strokeWidth="10"
          strokeDasharray="6,6"
        />
      </Svg>
    </View>
  );
};

export default DashedDivider;
