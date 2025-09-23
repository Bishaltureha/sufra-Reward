import { View, Text, StyleSheet } from "react-native";
import React from "react";

type Props = {};

const DineInContent = () => (
  <View style={styles.tabContent}>
    <Text style={styles.contentText}>This is Dine-in screen</Text>
    <Text style={styles.subText}>Reserve a table for dining in</Text>
  </View>
);

export default DineInContent;

const styles = StyleSheet.create({
  contentText: {
    fontSize: 18,
    fontWeight: "500",
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
    textAlign: "center",
  },
});
