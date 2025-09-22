import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { scale } from "../utils/dimen";
import { MaterialIcons } from "@expo/vector-icons";
import RTLText from "./RTLText";

const LanguageButton = ({
  flagSource,
  label,
  onPress,
  style,
  textStyle = undefined,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.row}>
        <Image source={flagSource} style={styles.flag} />
        <RTLText style={[styles.text, textStyle]}>{label}</RTLText>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={scale(18)}
          color="#000"
          style={{ marginStart: scale(3) }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LanguageButton;

const styles = StyleSheet.create({
  button: {
    height: scale(35),
    backgroundColor: "#ffffff",
    borderRadius: scale(5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    left: scale(10),
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(3),

    // Android Shadow
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flag: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    resizeMode: "cover",
    overflow: "hidden",
  },
  text: {
    marginStart: scale(5),
    fontSize: scale(12),
    fontWeight: "600",
  },
});
