import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Linking,
} from "react-native";
import { scale } from "../../utils/dimen";
import * as Location from "expo-location";
import Error from "../../../assets/svg/Error";
import LocationModal from "../LocationModal";
import BrandDetailsDeliveryBox from "./BrandDetailsDeliveryBox";
import CollectYourOrderContainer from "./CollectYourOrderContainer";

type TabType = "Delivery" | "Pick-up";

interface DeliveryPickupTabsProps {
  minOrder?: string;
  deliveryTime?: string;
  deliveryFee?: string;
  prepTime?: string;
  distance?: number;
}

const DeliveryPickupTabs: React.FC<DeliveryPickupTabsProps> = ({
  minOrder = "15 SR",
  deliveryTime = "15-20 min",
  deliveryFee = "18 SR",
  prepTime = "15-20 min",
  distance = 2,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("Delivery");
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);

  React.useEffect(() => {
    checkLocation();
  }, []);

  const checkLocation = async () => {
    try {
      setLocationError(null);
      const { status } = await Location.getForegroundPermissionsAsync();
      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (status === "granted" && servicesEnabled) {
        setIsLocationEnabled(true);
      } else {
        setIsLocationEnabled(false);
        if (!servicesEnabled) {
          setLocationError("Location services disabled");
        } else if (status !== "granted") {
          setLocationError("Location permission not granted");
        }
      }
    } catch (error) {
      console.error("Error checking location:", error);
      setIsLocationEnabled(false);
      setLocationError("Failed to check location");
    }
  };

  const handleEnableLocationPress = () => {
    setLocationModalVisible(true);
  };

  const handleEnableLocation = async (locationData: any) => {
    try {
      setIsLoadingLocation(true);
      setLocationError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationError("Location permission denied");
        Alert.alert(
          "Location Access Required",
          "Please enable location services in your device settings to calculate distance.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
        setLocationModalVisible(false);
        return;
      }

      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        setLocationError("Location services disabled");
        Alert.alert(
          "Location Services Disabled",
          "Please enable location services in your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
        setLocationModalVisible(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
      });

      setCurrentLocation(location);
      setIsLocationEnabled(true);
      setLocationModalVisible(false);
      console.log("Location Data:", location);
    } catch (error: any) {
      console.error("Error handling location:", error);

      let errorMessage = "Failed to get location. Please try again.";
      if (error.message?.includes("timeout")) {
        errorMessage = "Location request timed out. Please try again.";
      } else if (error.message?.includes("permission")) {
        errorMessage = "Location permission denied.";
      }

      setLocationError(errorMessage);
      Alert.alert("Location Error", errorMessage, [{ text: "OK" }]);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleManualAddress = () => {
    setLocationModalVisible(false);
    setIsLocationEnabled(true);
    console.log("Manual address pressed");
  };

  const renderPickupDistance = () => {
    if (isLoadingLocation) {
      return (
        <View style={styles.distanceContainer}>
          <Text style={styles.deliveryText}>Distance</Text>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    if (!isLocationEnabled || locationError) {
      return (
        <TouchableOpacity
          style={styles.distanceContainer}
          onPress={handleEnableLocationPress}
        >
          <Text style={styles.deliveryText}>Distance</Text>
          <View style={styles.enableLocationRowInline}>
            <Error />
            <Text style={styles.enableLocationTextSmall}>Enable Location</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.distanceContainer}>
        <Text style={styles.deliveryText}>
          Distance{"\n"}
          <Text style={styles.deliveryTextBold}>{distance} km</Text>
        </Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.tabBarContainer}>
        <TouchableOpacity
          style={
            activeTab === "Delivery"
              ? styles.tabButton
              : styles.tabButtonInactive
          }
          activeOpacity={0.8}
          onPress={() => setActiveTab("Delivery")}
        >
          <Text
            style={
              activeTab === "Delivery"
                ? styles.tabButtonText
                : styles.tabButtonTextInactive
            }
          >
            Delivery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeTab === "Pick-up"
              ? styles.tabButton
              : styles.tabButtonInactive
          }
          activeOpacity={0.8}
          onPress={() => setActiveTab("Pick-up")}
        >
          <Text
            style={
              activeTab === "Pick-up"
                ? styles.tabButtonText
                : styles.tabButtonTextInactive
            }
          >
            Pick-up
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContent}>
        {activeTab === "Delivery" ? (
          <View>
            <View style={styles.deliveryInfoRow}>
              <Text style={styles.deliveryText}>
                Min. Order{"\n"}
                <Text style={styles.deliveryTextBold}>{minOrder}</Text>
              </Text>
              <View style={styles.divider} />
              <Text style={styles.deliveryText}>
                Delivery Time{"\n"}
                <Text style={styles.deliveryTextBold}>{deliveryTime}</Text>
              </Text>
              <View style={styles.divider} />
              <Text style={styles.deliveryText}>
                Delivery Fee{"\n"}
                <Text style={styles.deliveryTextBold}>{deliveryFee}</Text>
              </Text>
            </View>
            <BrandDetailsDeliveryBox />
          </View>
        ) : (
          <View>
            <View
              style={[
                styles.deliveryInfoRow,
                { justifyContent: "space-evenly" },
              ]}
            >
              {renderPickupDistance()}
              <View style={styles.divider} />
              <Text style={styles.deliveryText}>
                Prep Time{"\n"}
                <Text style={styles.deliveryTextBold}>{prepTime}</Text>
              </Text>
            </View>
            <CollectYourOrderContainer />
          </View>
        )}
      </View>

      <LocationModal
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        onEnableLocation={handleEnableLocation}
        onManualAddress={handleManualAddress}
      />
    </>
  );
};

export default DeliveryPickupTabs;

const styles = StyleSheet.create({
  tabBarContainer: {
    width: "100%",
    height: scale(44),
    backgroundColor: "#F4F4F4",
    marginTop: scale(16),
    borderRadius: scale(10),
    flexDirection: "row",
    padding: scale(5),
  },
  tabButton: {
    flex: 1,
    height: scale(34),
    backgroundColor: "#017851",
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  tabButtonInactive: {
    flex: 1,
    height: scale(34),
    backgroundColor: "transparent",
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  tabButtonText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  tabButtonTextInactive: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  tabContent: {
    marginTop: scale(10),
    backgroundColor: "#ffffff",
  },
  deliveryInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(16),
  },
  deliveryText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#4A4A4A",
    textAlign: "center",
  },
  deliveryTextBold: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#4A4A4A",
    textAlign: "center",
  },
  divider: {
    height: scale(39),
    width: scale(2),
    backgroundColor: "#E6EAF1",
  },
  distanceContainer: {
    alignItems: "center",
    gap: scale(4),
  },
  enableLocationRowInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    justifyContent: "center",
    marginStart: scale(-10),
  },
  enableLocationTextSmall: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#FF617E",
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  loadingText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#4A4A4A",
    textAlign: "center",
  },
});
{
  /* <View style={styles.tabBarContainer}>
          <TouchableOpacity
            style={
              activeTab === "Delivery"
                ? styles.tabButton
                : styles.tabButtonInactive
            }
            activeOpacity={0.8}
            onPress={() => setActiveTab("Delivery")}
          >
            <Text
              style={
                activeTab === "Delivery"
                  ? styles.tabButtonText
                  : styles.tabButtonTextInactive
              }
            >
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === "Pick-up"
                ? styles.tabButton
                : styles.tabButtonInactive
            }
            activeOpacity={0.8}
            onPress={() => setActiveTab("Pick-up")}
          >
            <Text
              style={
                activeTab === "Pick-up"
                  ? styles.tabButtonText
                  : styles.tabButtonTextInactive
              }
            >
              Pick-up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContent}>
          {activeTab === "Delivery" ? (
            <View>
              <View style={styles.deliveryInfoRow}>
                <Text style={styles.deliveryText}>
                  Min. Order{"\n"}
                  <Text style={styles.deliveryTextBold}>15 SR</Text>
                </Text>
                <View style={styles.divider} />
                <Text style={styles.deliveryText}>
                  Delivery Time{"\n"}
                  <Text style={styles.deliveryTextBold}>15-20 min</Text>
                </Text>
                <View style={styles.divider} />
                <Text style={styles.deliveryText}>
                  Delivery Fee{"\n"}
                  <Text style={styles.deliveryTextBold}>18 SR</Text>
                </Text>
              </View>
              <BrandDetailsDeliveryBox />
            </View>
          ) : (
            <View>
              <View
                style={[
                  styles.deliveryInfoRow,
                  { justifyContent: "space-evenly" },
                ]}
              >
                {renderPickupDistance()}
                <View style={styles.divider} />
                <Text style={styles.deliveryText}>
                  Prep Time{"\n"}
                  <Text style={styles.deliveryTextBold}>15-20 min</Text>
                </Text>
              </View>
              <CollectYourOrderContainer />
            </View>
          )}
        </View> */
}
