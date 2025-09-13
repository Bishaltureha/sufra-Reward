import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";

const DiscoverSufraBenefits = () => {
  return (
    <View style={styles.container}>
      <Header
        onBackPress={undefined}
        titleStyle={{ color: "#000000" }}
        containerStyle={undefined}
        title="Tiers"
      />
    </View>
  );
};

export default DiscoverSufraBenefits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
