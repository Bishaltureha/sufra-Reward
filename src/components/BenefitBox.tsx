import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BenefitBox = ({ text }: { text: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#F4F4F4",
    flex: 1,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#717171",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default BenefitBox;
