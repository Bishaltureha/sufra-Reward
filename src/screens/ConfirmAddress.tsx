import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RootStackParamList } from "../types";
import {
  NavigationProp,
  useNavigation,
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { scale } from "../utils/dimen";
import FloatingLabelInput from "../components/FloatingLabelInput";
import LoctionPointer from "../../assets/svg/LoctionPointer";

type ConfirmAddressRouteProp = RouteProp<RootStackParamList, "ConfirmAddress">;

const ConfirmAddress = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<ConfirmAddressRouteProp>();

  // Get the location data from route params
  const { latitude, longitude, address } = route.params;

  // Form state
  const [addressName, setAddressName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [floor, setFloor] = useState("");
  const [doorNo, setDoorNo] = useState("");
  const [instructions, setInstructions] = useState("");

  // Error states
  const [errors, setErrors] = useState({
    addressName: "",
    city: "",
    street: "",
    buildingName: "",
    floor: "",
    doorNo: "",
  });

  // Parse address and pre-fill fields when component mounts
  useEffect(() => {
    parseAndFillAddress(address);
  }, [address]);

  const parseAndFillAddress = (fullAddress: string) => {
    // Parse the address string to extract components
    // Example: "Al Barsha Marina Mall, 2781 Build, Riyadh, SA"
    const parts = fullAddress.split(",").map((part) => part.trim());

    if (parts.length >= 1) {
      setStreet(parts[0] || ""); // First part usually street/building
    }
    if (parts.length >= 2) {
      setBuildingName(parts[1] || ""); // Second part could be building
    }
    if (parts.length >= 3) {
      setCity(parts[2] || ""); // Third part is usually city
    }
    if (parts.length >= 4) {
      setArea(parts[3] || ""); // Fourth part could be area/region
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.goBack();
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      addressName: "",
      city: "",
      street: "",
      buildingName: "",
      floor: "",
      doorNo: "",
    };

    if (!addressName.trim()) {
      newErrors.addressName = "Address name is required";
      isValid = false;
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!street.trim()) {
      newErrors.street = "Street is required";
      isValid = false;
    }

    if (!buildingName.trim()) {
      newErrors.buildingName = "Building/Villa name is required";
      isValid = false;
    }

    if (!floor.trim()) {
      newErrors.floor = "Floor is required";
      isValid = false;
    }

    if (!doorNo.trim()) {
      newErrors.doorNo = "Door number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      const completeAddress = {
        latitude,
        longitude,
        fullAddress: address,
        addressName,
        city,
        area,
        street,
        buildingName,
        floor,
        doorNo,
        instructions,
      };

      console.log("Complete address data:", completeAddress);

      navigation.navigate("Payment", {
        deliveryAddress: completeAddress,
      });
    } else {
      Alert.alert("Error", "Please fill all required fields");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <AntDesign name="left" size={scale(20)} color="#017851" />
        </TouchableOpacity>
        <View style={styles.subHeader}>
          <Text style={styles.newAddress}>Add New Address</Text>
        </View>
        <View style={{ width: scale(30) }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          source={require("../../assets/image/LoctionBackground.png")}
          style={styles.mapImage}
        >
          <LoctionPointer />
        </ImageBackground>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>

          <View style={styles.addressContainer}>
            <View style={styles.addressTextContainer}>
              <Text
                style={styles.addressText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {address}
              </Text>
            </View>

            <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <FloatingLabelInput
            label="Address Name*"
            value={addressName}
            onChangeText={setAddressName}
            errorText={errors.addressName}
          />

          <View style={styles.row}>
            <FloatingLabelInput
              label="City*"
              value={city}
              onChangeText={setCity}
              width="48%"
              errorText={errors.city}
            />
            <FloatingLabelInput
              label="Area"
              value={area}
              onChangeText={setArea}
              width="48%"
            />
          </View>

          <FloatingLabelInput
            label="Street*"
            value={street}
            onChangeText={setStreet}
            errorText={errors.street}
          />

          <FloatingLabelInput
            label="Building/Villa Name*"
            value={buildingName}
            onChangeText={setBuildingName}
            errorText={errors.buildingName}
          />

          <View style={styles.row}>
            <FloatingLabelInput
              label="Floor*"
              value={floor}
              onChangeText={setFloor}
              width="48%"
              keyboardType="numeric"
              errorText={errors.floor}
            />
            <FloatingLabelInput
              label="Door No*"
              value={doorNo}
              onChangeText={setDoorNo}
              width="48%"
              errorText={errors.doorNo}
            />
          </View>

          <FloatingLabelInput
            label="Address Instructions"
            value={instructions}
            onChangeText={setInstructions}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: scale(1),
    borderBottomColor: "#f0f0f0",
    justifyContent: "space-between",
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  subHeader: {
    marginStart: scale(8),
    flexDirection: "column",
    alignItems: "flex-start",
  },
  newAddress: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(17),
  },
  content: {
    flex: 1,
  },
  mapImage: {
    width: "100%",
    height: scale(130),
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    padding: scale(16),
  },
  sectionTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#4A4A4A",
    marginBottom: scale(12),
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressTextContainer: {
    flex: 1,
    marginRight: scale(12),
  },
  addressText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#717171",
    lineHeight: scale(20),
  },
  editBtn: {
    paddingVertical: scale(4),
  },
  editText: {
    color: "#017851",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    textDecorationLine: "underline",
  },
  divider: {
    width: "100%",
    height: scale(1),
    backgroundColor: "#E6EAF1",
    marginVertical: scale(20),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footer: {
    padding: scale(16),
    borderTopWidth: scale(1),
    borderTopColor: "#f0f0f0",
  },
  confirmButton: {
    backgroundColor: "#F6B01F",
    paddingVertical: scale(16),
    borderRadius: scale(5),
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#000000",
    fontSize: scale(18),
    fontWeight: "600",
    fontFamily: "Rubik-SemiBold",
  },
});
