import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
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
      {isChecked && <Ionicons name="checkmark" size={18} color="#fff" />}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    borderRadius: 3,
    borderWidth: 1,
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
