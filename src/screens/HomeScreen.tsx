import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { SafeAreaView } from "react-native-safe-area-context";
import Delivery from "../../assets/svg/Delivery";
import Dine_in from "../../assets/svg/Dine_in";
import { scaleHeightSize, scaleWidthSize } from "../utils/responsive";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Drawerlogo />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.svgButton}
          onPress={() => console.log("Delivery tapped!")}
        >
          <Delivery width={scaleWidthSize(173)} height={scaleHeightSize(175)} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.svgButton}
          onPress={() => console.log("Dine-in tapped!")}
        >
          <Dine_in width={scaleWidthSize(173)} height={scaleHeightSize(175)} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  // buttonRow: {
  //   flexDirection: "row",
  //   width: "100%",
  //   justifyContent: "space-between",
  //   marginTop: 20,
  // },
  // svgButton: {
  //   flex: 1,
  //   marginHorizontal: 5,
  //   alignItems: "center",
  // },
  buttonRow: {
    width: scaleWidthSize(358),

    flexDirection: "row",
    justifyContent: "center", // evenly distribute space
    alignItems: "center",
    marginTop: scaleHeightSize(0), // add more breathing room
  },

  svgButton: {
    width: scaleWidthSize(175), // set fixed width
    aspectRatio: 1, // keep it square
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
