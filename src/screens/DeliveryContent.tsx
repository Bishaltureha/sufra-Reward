import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const DeliveryContent = () => (
  <View style={styles.tabContent}>
    <Text style={styles.contentText}>This is Delivery & Pickup screen</Text>
    <Text style={styles.subText}>Order food for delivery or pickup</Text>
  </View>
);
export default DeliveryContent;

const styles = StyleSheet.create({
  contentText: {
    fontSize: 18,
    fontWeight: "500",
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
    textAlign: "center",
  },
});
