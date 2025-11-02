import React from "react";
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
import { scale } from "../utils/dimen";
import BigLocationLogo from "../../assets/svg/BigLocationLogo";
import { useLocation } from "../hooks/useLocation";

interface LocationModalProps {
  visible: boolean;
  onClose: () => void;
  onEnableLocation?: (locationData: any) => void | Promise<void>;
  onManualAddress?: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({
  visible,
  onClose,
  onEnableLocation,
  onManualAddress,
}) => {
  const { isLoading, requestLocationPermission } = useLocation();

  const handleEnableLocation = async () => {
    const granted = await requestLocationPermission();

    if (!granted) {
      // Show alert with options
      Alert.alert(
        "Location Permission Required",
        "This app needs access to your location to provide better service. Please allow location access.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => {
              Linking.openSettings();
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      // Success - call parent callback if provided, otherwise just close
      if (onEnableLocation) {
        await onEnableLocation(null);
      } else {
        onClose();
      }
    }
  };

  const handleManualAddress = () => {
    if (onManualAddress) {
      onManualAddress();
    } else {
      onClose();
      // Navigate to manual address entry screen
      // navigation.navigate("AddAddressManually");
      console.log("Manual address entry");
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
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.enableLocationButtonText}>
                  Enable Location
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.manualAddressButton}
              onPress={handleManualAddress}
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
