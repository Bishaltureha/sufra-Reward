import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { isRTL } from "../utils/dimen";

export interface RTLTextInputProps extends TextInputProps {}

const RTLTextInput = React.forwardRef<TextInput, RTLTextInputProps>(
  ({ style, ...props }, ref) => {
    return <TextInput ref={ref} {...props} style={[styles.input, style]} />;
  }
);

const styles = StyleSheet.create({
  input: {
    textAlign: isRTL ? "right" : "left",
  },
});

export default RTLTextInput;
