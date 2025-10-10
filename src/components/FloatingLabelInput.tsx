import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  DimensionValue,
  Text,
} from "react-native";
import { scale } from "../utils/dimen";
import RTLText from "./RTLText";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  width?: DimensionValue;
  borderColor?: string; // optional border color prop
  labelColor?: string; // optional label color prop
  errorText?: string; // optional error text
  containerStyle?: any; // optional container style
}

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  width = "100%",
  borderColor = "#E6E6E6",
  labelColor = "#717171",
  errorText = "",
  containerStyle,
  ...props
}: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        { width, minHeight: scale(75) }, // fixed height reserve for error
        containerStyle,
      ]}
    >
      <RTLText
        style={[
          styles.label,
          { color: labelColor },
          (isFocused || value) && styles.labelFocused,
        ]}
      >
        {label}
      </RTLText>

      <TextInput
        style={[
          styles.input,
          { borderColor },
          isFocused && !errorText && { borderColor: "#000" }, // black only if no error
          errorText && { borderColor: "#FF617E" },
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        {...props}
      />

      {/* Error Text */}
      <View style={{ height: scale(16), justifyContent: "center" }}>
        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
      </View>
    </View>
  );
};

export default FloatingLabelInput;

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    left: scale(12),
    top: scale(18),
    fontSize: scale(16),
  },
  labelFocused: {
    top: scale(4),
    fontSize: scale(10),
    fontWeight: "400",
    fontFamily: "Rubik-Regular",
    backgroundColor: "#fff",
    paddingHorizontal: scale(4),
  },
  input: {
    height: scale(55),
    borderWidth: scale(1),
    borderRadius: scale(6),
    paddingHorizontal: scale(12),
    fontSize: scale(16),
    color: "#000",
    justifyContent: "center",
    paddingVertical: 0,
  },
  errorText: {
    color: "#FF617E",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(12),
    textAlign: "left",
  },
});
