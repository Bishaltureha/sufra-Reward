import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { isRTL } from "../utils/dimen";

interface RTLTextProps extends TextProps {
  children: React.ReactNode;
}

const RTLText = ({ children, style, ...props }: RTLTextProps) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: isRTL ? "right" : "left",
  },
});

export default RTLText;
