import React, { useState } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { scale } from "../utils/dimen";
import RTLText from "./RTLText";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  value: string; // value comes from parent
  onChangeText: (text: string) => void; // callback to parent
}

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  ...props
}: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <RTLText
        style={[styles.label, (isFocused || value) && styles.labelFocused]}
      >
        {label}
      </RTLText>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText} // pass to parent
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

export default FloatingLabelInput;

const styles = StyleSheet.create({
  container: { width: "100%" },
  label: {
    position: "absolute",
    left: scale(12),
    top: scale(18),
    fontSize: scale(16),
    color: "#717171",
  },
  labelFocused: {
    top: scale(5),
    fontSize: scale(12),
    color: "#717171",
    backgroundColor: "#ffffff",
  },
  input: {
    height: scale(55),
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    borderRadius: scale(6),
    paddingHorizontal: scale(12),
    fontSize: scale(16),
    color: "#000",
    justifyContent: "center",
    paddingVertical: 0,
  },
});
