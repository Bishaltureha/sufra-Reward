import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const LanguageButton = ({ flagSource, label, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.row}>
        <Image source={flagSource} style={styles.flag} />
        <Text style={[styles.text, textStyle]}>{label}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={18}
          color="#000"
          style={{ marginLeft: 3 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LanguageButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    left: 10,
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // Android Shadow
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flag: {
    height: 20,
    width: 20,
    borderRadius: 10,
    resizeMode: "cover",
    overflow: "hidden",
  },
  text: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "600",
  },
});
