import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { MaterialIcons } from "@expo/vector-icons";
import BellIcon from "../../assets/svg/BellIcon";
import SearchIcon from "../../assets/svg/SearchIcon";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { scale } from "../utils/dimen";
import { DrawerParamList } from "../types";

const HeaderBox: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const handleDrawerToggle = () => {
    try {
      // First try DrawerActions
      navigation.dispatch(DrawerActions.openDrawer());
    } catch (error) {
      try {
        // Fallback to direct method
        navigation.openDrawer();
      } catch (fallbackError) {
        console.error("Drawer not working:", fallbackError);
      }
    }
  };

  return (
    <View style={styles.headerRow}>
      {/* Left section - Logo and text */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={handleDrawerToggle}>
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
    height: scale(40),
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingBottom: scale(10),
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
    width: scale(40),
    height: scale(40),
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
    width: scale(10),
    height: scale(10),
    borderRadius: 5,
    position: "absolute",
    right: 3,
    top: -2,
  },
});
