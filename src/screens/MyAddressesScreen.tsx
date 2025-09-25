import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const MyAddressesScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MyAddressesScreen</Text>
    </View>
  );
};

export default MyAddressesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
