import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale, screenWidth, screenHeight } from "../utils/dimen";

type Props = {};

const Register = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register</Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: screenWidth * 0.05,
  },
  text: {
    fontSize: scale(18),
    fontWeight: "bold",
  },
});
