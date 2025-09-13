import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";

type Props = {};

const Language = (props: Props) => {
  return (
    <View style={styles.container}>
      <Header
        onBackPress={undefined}
        titleStyle={undefined}
        containerStyle={undefined}
        title="Language"
      />
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
  },
});
