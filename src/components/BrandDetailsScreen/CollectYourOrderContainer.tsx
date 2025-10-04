import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "../../utils/dimen";
import LocationLogoOfBranddetails from "../../../assets/svg/LocationLogoOfBranddetails";

type Props = {
  style?: object;
};

const CollectYourOrderContainer = ({ style }: Props) => {
  return (
    <View style={styles.container}>
      {/* Left Icon Box */}
      <View style={styles.iconBox}>
        <LocationLogoOfBranddetails width={scale(24)} hight={scale(30)} />
      </View>

      {/* Right Content */}
      <View style={styles.contentBox}>
        <Text style={styles.title}>Collect your order from Branch Name</Text>

        <Text style={styles.address}>
          Unnamed Road, Al Shifa, Dammam 32236...
        </Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Get Directions</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <TouchableOpacity>
            <Text style={styles.linkText}>Change Branch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CollectYourOrderContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: scale(84),
    backgroundColor: "#E6EAF1",
    padding: scale(8),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: scale(10),
  },
  iconBox: {
    backgroundColor: "#D9D9D9",
    width: scale(60),
    height: scale(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
    marginRight: scale(10), // spacing from text side
  },
  contentBox: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    color: "#4A4A4A",
    fontSize: scale(14),
  },
  address: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    color: "#717171",
    fontSize: scale(12),
    marginTop: scale(2),
    marginBottom: scale(4),
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: scale(5),
  },
  linkText: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(13),
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  orText: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(13),
  },
});
