import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { scale } from "../utils/dimen";
import { Ionicons } from "@expo/vector-icons";

interface CustomCheckboxProps {
  checked: boolean; // controlled by parent
  onChange: (checked: boolean) => void; // callback to parent
}

const CustomCheckbox = ({ checked, onChange }: CustomCheckboxProps) => {
  const toggleCheckbox = () => onChange(!checked);

  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checkedContainer]}
      onPress={toggleCheckbox}
    >
      {checked && <Ionicons name="checkmark" size={scale(18)} color="#fff" />}
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
