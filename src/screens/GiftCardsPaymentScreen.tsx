import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";

type Props = {};

const GiftCardsPaymentScreen = (props: Props) => {
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.drawerButton}
          onPress={handleDrawerToggle}
        >
          <Drawerlogo />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Sufra Gift Cards</Text>
        </View>
      </View>{
    </View>
  );
};

export default GiftCardsPaymentScreen;

const styles = StyleSheet.create({});
