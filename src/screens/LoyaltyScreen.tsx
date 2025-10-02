import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const LoyaltyScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loyalty Screen</Text>
    </View>
  );
};

export default LoyaltyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});
