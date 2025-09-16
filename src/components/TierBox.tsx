import React from "react";
import { View, StyleSheet } from "react-native";

const TierBox = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#fdfbfbff",
    flex: 1,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TierBox;
