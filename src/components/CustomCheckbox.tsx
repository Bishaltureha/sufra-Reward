import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { scale } from "../utils/dimen";
import { Ionicons } from "@expo/vector-icons"; // or react-native-vector-icons

interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CustomCheckbox = ({ checked = false, onChange }: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheckbox = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <TouchableOpacity
      style={[styles.container, isChecked && styles.checkedContainer]}
      onPress={toggleCheckbox}
    >
      {isChecked && <Ionicons name="checkmark" size={scale(18)} color="#fff" />}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(3),
    borderWidth: scale(1),
    borderColor: "#E6EAF1",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkedContainer: {
    backgroundColor: "#017851",
    borderColor: "#017851",
  },
});
