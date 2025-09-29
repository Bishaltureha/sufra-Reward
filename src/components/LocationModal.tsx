import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { scale } from "../utils/dimen";
import BigLocationLogo from "../../assets/svg/BigLocationLogo";

const LocationModal = ({
  visible,
  onClose,
  onEnableLocation,
  onManualAddress,
}) => {
  const [loading, setLoading] = useState(false);

  const handleEnableLocation = async () => {
    try {
      setLoading(true);

      // Check current permission status
      const { status: existingStatus } =
        await Location.getForegroundPermissionsAsync();

      let finalStatus = existingStatus;

      // Agar permission nahi hai to request karo
      if (existingStatus !== "granted") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus === "denied") {
        // 3 option wala alert - Deny, Settings, Allow
        Alert.alert(
          "Location Permission Required",
          "This app needs access to your location to provide better service. Please allow location access.",
          [
            {
              text: "Deny",
              onPress: () => {
                setLoading(false);
              },
              style: "cancel",
            },
            {
              text: "Settings",
              onPress: () => {
                setLoading(false);
                Linking.openSettings();
              },
            },
            {
              text: "Allow",
              onPress: async () => {
                // Retry permission request
                const { status } =
                  await Location.requestForegroundPermissionsAsync();
                if (status === "granted") {
                  fetchLocation();
                } else {
                  setLoading(false);
                }
              },
            },
          ],
          { cancelable: false }
        );
        return;
      }

      if (finalStatus !== "granted") {
        setLoading(false);
        return;
      }

      // Get location
      await fetchLocation();
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to get location. Please try again.");
      console.error(error);
    }
  };

  const fetchLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Get address
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address[0],
      };

      setLoading(false);
      onEnableLocation(locationData);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to get location. Please try again.");
      console.error(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Icon name="close" size={scale(18)} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Modal Content */}
          <View style={styles.modalContentCenter}>
            <BigLocationLogo height={scale(106)} width={scale(106)} />
            <Text style={styles.modalMainTitle}>
              Missing Location Information!
            </Text>
            <Text style={styles.modalSubDescription}>
              Enable location access or manually add{"\n"}your address to
              proceed.
            </Text>

            <TouchableOpacity
              style={styles.enableLocationButton}
              onPress={handleEnableLocation}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.enableLocationButtonText}>
                  Enable Location
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.manualAddressButton}
              onPress={onManualAddress}
            >
              <Text style={styles.manualAddressButtonText}>
                Add Address Manually
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "100%",
    height: scale(462),
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    position: "absolute",
    bottom: 0,
  },
  closeButton: {
    position: "absolute",
    top: scale(20),
    right: scale(20),
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: "#A5ACBD",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1,
  },
  modalContentCenter: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(50),
    paddingHorizontal: scale(16),
    gap: scale(10),
  },
  modalMainTitle: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(22),
    color: "#4A4A4A",
    textAlign: "center",
  },
  modalSubDescription: {
    textAlign: "center",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(15),
    color: "#6D6D6D",
    lineHeight: scale(22),
  },
  enableLocationButton: {
    width: "100%",
    height: scale(52),
    borderRadius: scale(5),
    backgroundColor: "#017851",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(16),
  },
  enableLocationButtonText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(18),
    color: "#FFFFFF",
  },
  manualAddressButton: {
    width: "100%",
    height: scale(52),
    borderRadius: scale(5),
    backgroundColor: "#F6B01F",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(8),
  },
  manualAddressButtonText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(18),
    color: "#000000",
  },
});
