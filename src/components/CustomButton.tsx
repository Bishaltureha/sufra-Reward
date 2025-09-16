import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title: string;
  backgroundColor: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  borderColor?: string;
  borderWidth?: number;
  disabled?: boolean; // ✅ proper typing here
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
  disabled = false, // ✅ default value
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
      <Text
        style={[
          styles.text,
          textStyle,
          { color: disabled ? "#666" : textColor },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
