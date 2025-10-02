import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const FindStoresScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Find Stores</Text>
    </View>
  );
};

export default FindStoresScreen;

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
