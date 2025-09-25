import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const MyFavoritesScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MyFavorites</Text>
    </View>
  );
};

export default MyFavoritesScreen;

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
