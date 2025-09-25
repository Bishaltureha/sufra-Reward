import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BookCateringScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Catering Screen</Text>
    </View>
  );
};

export default BookCateringScreen;

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
