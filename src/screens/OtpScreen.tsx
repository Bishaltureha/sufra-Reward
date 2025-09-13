import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OtpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>OtpScreen</Text>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
