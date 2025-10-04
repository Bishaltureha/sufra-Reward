import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { scale } from "../../utils/dimen";
import WhiteLocation from "../../../assets/svg/WhiteLocation";
import LocationModal from "../LocationModal";
import * as Location from "expo-location";

interface RedBoxLocationPermissionProps {
  onEnable?: () => void; // external callback
}

const RedBoxLocationPermission: React.FC<RedBoxLocationPermissionProps> = ({
  onEnable,
}) => {
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
  return (
    <>
      <View style={styles.container}>
        <WhiteLocation />
        <Text style={styles.text}>Enable Location Access to Continue</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleEnableLocationPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Enable</Text>
        </TouchableOpacity>
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

export default RedBoxLocationPermission;

const styles = StyleSheet.create({
  container: {
    height: scale(54),
    borderRadius: scale(8),
    backgroundColor: "#FF617E",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: scale(10),
  },
  text: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
    color: "#ffffff",
    flex: 1,
    marginLeft: scale(8),
  },
  button: {
    width: scale(86),
    height: scale(38),
    backgroundColor: "#D4556C",
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
    color: "#ffffff",
  },
});
