import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MainStackParamList, Address } from "../types";
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
import { useAddressContext } from "../context/AddressContext";

type ConfirmAddressRouteProp = RouteProp<MainStackParamList, "ConfirmAddress">;

const ConfirmAddress = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const route = useRoute<ConfirmAddressRouteProp>();
  const { addAddress, updateAddress } = useAddressContext();

  // Destructure all route params
  const { latitude, longitude, address, mode, existingAddress } = route.params;

  // Form state
  const [addressName, setAddressName] = useState(existingAddress?.name || "");
  const [city, setCity] = useState(
    existingAddress?.fullAddress?.split(",")[2] || ""
  );
  const [area, setArea] = useState("");
  const [street, setStreet] = useState(
    existingAddress?.fullAddress?.split(",")[0] || ""
  );
  const [buildingName, setBuildingName] = useState(
    existingAddress?.buildingNo || ""
  );
  const [floor, setFloor] = useState(existingAddress?.floor || "");
  const [doorNo, setDoorNo] = useState(existingAddress?.apartment || "");
  const [instructions, setInstructions] = useState(
    existingAddress?.additionalInfo || ""
  );

  // Validation errors
  const [errors, setErrors] = useState({
    addressName: "",
    city: "",
    street: "",
    buildingName: "",
    floor: "",
    doorNo: "",
  });

  useEffect(() => {
    if (address && !existingAddress) parseAndFillAddress(address);
  }, [address]);

  const parseAndFillAddress = (fullAddress: string) => {
    const parts = fullAddress.split(",").map((p) => p.trim());
    if (parts.length >= 1) setStreet(parts[0]);
    if (parts.length >= 2) setBuildingName(parts[1]);
    if (parts.length >= 3) setCity(parts[2]);
    if (parts.length >= 4) setArea(parts[3]);
  };

  const handleBack = () => navigation.goBack();

  const handleEdit = () => navigation.goBack();

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
    if (!validateForm()) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const completeAddress: Address = {
      id: existingAddress?.id,
      type: existingAddress?.type || "Home",
      customType: existingAddress?.customType,
      fullAddress: address,
      buildingNo: buildingName,
      floor,
      apartment: doorNo,
      name: addressName,
      phone: existingAddress?.phone || "",
      additionalInfo: instructions,
      showMap: true,
    };

    // Save or update address
    if (mode === "edit" && existingAddress?.id) {
      updateAddress(completeAddress);
    } else {
      addAddress(completeAddress);
    }

    // ✅ smart navigation logic
    if (route.params?.from === "payment") {
      navigation.navigate("Payment", {
        deliveryAddress: {
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
        },
      });
    } else {
      navigation.navigate("Home", {
        screen: "MyAddresses",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <AntDesign name="left" size={scale(20)} color="#017851" />
        </TouchableOpacity>
        <View style={styles.subHeader}>
          <Text style={styles.newAddress}>
            {mode === "edit" ? "Edit Address" : "Add New Address"}
          </Text>
        </View>
        <View style={{ width: scale(30) }} />
      </View>

      {/* Scrollable content */}
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

          {/* Inputs */}
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

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>
            {mode === "edit" ? "Update Address" : "Confirm Address"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmAddress;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
  content: { flex: 1 },
  mapImage: {
    width: "100%",
    height: scale(130),
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: { padding: scale(16) },
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
  editBtn: { paddingVertical: scale(4) },
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
