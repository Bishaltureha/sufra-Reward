import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import RTLText from "./RTLText";
import { scale } from "../utils/dimen";

type Props = {
  title: string;
  backgroundColor: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  borderColor?: string;
  borderWidth?: number;
  disabled?: boolean;
  textColor: string;
};

const CustomButton = ({
  title,
  backgroundColor,
  onPress,
  style,
  textStyle,
  borderColor,
  borderWidth,
  textColor,
  disabled = false,
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? "#ccc" : backgroundColor },
        borderColor && { borderColor, borderWidth },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <RTLText
        style={[
          styles.text,
          textStyle,
          { color: disabled ? "#666" : textColor },
        ]}
      >
        {title}
      </RTLText>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: scale(4),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(12),
  },
  text: {
    fontSize: scale(16),
    fontWeight: "600",
  },
});
