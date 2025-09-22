import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import {
  scaleHeightSize,
  scaleSpacing,
  scaleWidthSize,
} from "../utils/responsive";
import { MaterialIcons } from "@expo/vector-icons";
import BellIcon from "../../assets/svg/BellIcon";
import SearchIcon from "../../assets/svg/SearchIcon";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// Drawer param list (adjust names as per your app)
type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

const HeaderBox: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={styles.headerRow}>
      {/* Left section - Logo and text */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Drawerlogo />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.deliveryText}>Door Delivery</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationText}>Enable Location</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color="#017851"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Right section - Buttons with notification dot */}
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.circularButton}>
          <SearchIcon />
        </TouchableOpacity>

        <View style={styles.buttonWithBadge}>
          <TouchableOpacity style={styles.circularButton}>
            <BellIcon />
          </TouchableOpacity>
          {/* Notification dot */}
          <View style={styles.notificationDot} />
        </View>
      </View>
    </View>
  );
};

export default HeaderBox;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    height: scaleHeightSize(40),
    alignItems: "center",
    paddingHorizontal: scaleSpacing(16),
    paddingBottom: scaleHeightSize(10),
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    // Down shadow only for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 4,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    marginLeft: 24,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  deliveryText: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    fontWeight: "400",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  circularButton: {
    width: scaleWidthSize(40),
    height: scaleHeightSize(40),
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWithBadge: {
    position: "relative",
  },
  notificationDot: {
    backgroundColor: "#F6B01F",
    width: scaleWidthSize(10),
    height: scaleHeightSize(10),
    borderRadius: 5,
    position: "absolute",
    right: 3,
    top: -2,
  },
});
