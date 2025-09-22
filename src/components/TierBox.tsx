import React from "react";
import { View, StyleSheet } from "react-native";
import { scale } from "../utils/dimen";

const TierBox = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: scale(1),
    borderColor: "#fdfbfbff",
    flex: 1,
    height: scale(62),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TierBox;
