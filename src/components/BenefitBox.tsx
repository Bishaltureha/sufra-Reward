import React from "react";
import { View, StyleSheet } from "react-native";
import { scale } from "../utils/dimen";
import RTLText from "./RTLText";

const BenefitBox = ({ text }: { text: string }) => (
  <View style={styles.container}>
    <RTLText style={styles.text}>{text}</RTLText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: scale(1),
    borderColor: "#F4F4F4",
    flex: 1,
    height: scale(62),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#717171",
    fontSize: scale(12),
    fontWeight: "500",
    textAlign: "center",
  },
});

export default BenefitBox;
