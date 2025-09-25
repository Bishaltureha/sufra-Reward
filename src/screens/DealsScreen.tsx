import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DealsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deals Screen</Text>
    </View>
  );
};

export default DealsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A4A4A",
  },
});
