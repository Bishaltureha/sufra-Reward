import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { MaterialIcons } from "@expo/vector-icons";
import BellIcon from "../../assets/svg/BellIcon";
import SearchIcon from "../../assets/svg/SearchIcon";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { scale } from "../utils/dimen";
import LocationModal from "./LocationModal";
import { useLocation } from "../hooks/useLocation";

interface HeaderBoxProps {
  boxshadow?: ViewStyle;
}

const HeaderBox: React.FC<HeaderBoxProps> = ({ boxshadow }) => {
  const navigation = useNavigation<any>();
  const { isEnabled, formattedAddress, isLoading, checkLocationStatus } =
    useLocation();

  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const handleDrawerToggle = () => {
    try {
      navigation.dispatch(DrawerActions.openDrawer());
    } catch (error) {
      try {
        navigation.openDrawer();
      } catch (fallbackError) {
        console.error("Drawer not working:", fallbackError);
      }
    }
  };

  const handleLocationPress = () => {
    if (!isEnabled) {
      // Location disabled - show modal
      setLocationModalVisible(true);
    } else {
      // Location enabled - open map screen
      console.log("Opening map with location:", formattedAddress);
      // navigation.navigate("MapScreen"); // Map screen ko open karenge
    }
  };

  return (
    <View style={[styles.headerRow, boxshadow]}>
      {/* Left section - Logo and text */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={handleDrawerToggle}>
          <Drawerlogo />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.deliveryText}>Door Delivery</Text>

          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleLocationPress}
          >
            {isLoading ? (
              <Text style={styles.locationText}>Loading...</Text>
            ) : (
              <Text
                style={[
                  styles.locationText,
                  !isEnabled && styles.locationDisabled,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {isEnabled && formattedAddress
                  ? formattedAddress
                  : "Enable Location"}
              </Text>
            )}
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color="#017851"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.circularButton}
          onPress={() => navigation.navigate("Search")}
        >
          <SearchIcon />
        </TouchableOpacity>

        <View style={styles.buttonWithBadge}>
          <TouchableOpacity
            style={styles.circularButton}
            onPress={() => navigation.navigate("Notification")}
          >
            <BellIcon />
          </TouchableOpacity>
          <View style={styles.notificationDot} />
        </View>
      </View>

      {/* Location Modal */}
      <LocationModal
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
      />
    </View>
  );
};

export default HeaderBox;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    height: scale(50),
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingBottom: scale(10),
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E6EAF1",
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
    flex: 1,
    maxWidth: "70%",
  },
  deliveryText: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    fontWeight: "400",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
  },
  locationText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
    color: "#017851",
    maxWidth: 150,
  },
  locationDisabled: {
    color: "#999999",
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
