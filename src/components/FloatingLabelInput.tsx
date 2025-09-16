import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
}

const FloatingLabelInput = ({ label, ...props }: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={[styles.label, (isFocused || value) && styles.labelFocused]}>
        {label}
      </Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

export default FloatingLabelInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    position: "absolute",
    left: 12,
    top: 18,
    fontSize: 16,
    color: "#717171",
  },
  labelFocused: {
    top: 5,
    fontSize: 12,
    color: "#717171",
    backgroundColor: "#ffffff",
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
    justifyContent: "center",
    paddingVertical: 0,
  },
});
