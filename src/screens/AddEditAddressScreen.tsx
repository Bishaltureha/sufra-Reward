import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { DrawerParamList, Address } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAddressContext } from "../context/AddressContext";

type AddressType = "Home" | "Work" | "Other";

type AddEditAddressScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "AddEditAddress"
>;

type AddEditAddressScreenRouteProp = RouteProp<
  DrawerParamList,
  "AddEditAddress"
>;

const AddEditAddressScreen = () => {
  const navigation = useNavigation<AddEditAddressScreenNavigationProp>();
  const route = useRoute<AddEditAddressScreenRouteProp>();
  const isEdit = route.params?.address !== undefined;
  const existingAddress = route.params?.address;
  const { addAddress, updateAddress, deleteAddress } = useAddressContext();

  const [selectedType, setSelectedType] = useState<AddressType>(
    existingAddress?.type || "Home"
  );
  const [customType, setCustomType] = useState(
    existingAddress?.customType || ""
  );
  const [fullAddress, setFullAddress] = useState(
    existingAddress?.fullAddress || ""
  );
  const [buildingNo, setBuildingNo] = useState(
    existingAddress?.buildingNo || ""
  );
  const [floor, setFloor] = useState(existingAddress?.floor || "");
  const [apartment, setApartment] = useState(existingAddress?.apartment || "");
  const [name, setName] = useState(existingAddress?.name || "");
  const [phone, setPhone] = useState(existingAddress?.phone || "");
  const [additionalInfo, setAdditionalInfo] = useState(
    existingAddress?.additionalInfo || ""
  );

  const addressTypes: AddressType[] = ["Home", "Work", "Other"];

  const isFormValid =
    (selectedType !== "Other" || customType.trim()) &&
    fullAddress.trim() &&
    buildingNo.trim() &&
    name.trim() &&
    phone.trim();
  const handleSave = () => {
    if (!isFormValid) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert("Error", "Phone number must be 8-15 digits");
      return;
    }

    const addressData: Address = {
      id: existingAddress?.id,
      type: selectedType,
      customType: selectedType === "Other" ? customType : undefined,
      fullAddress,
      buildingNo,
      floor,
      apartment,
      name,
      phone,
      additionalInfo,
    };

    if (isEdit) {
      updateAddress(addressData);
    } else {
      addAddress(addressData);
    }

    Alert.alert(
      "Success",
      `Address ${isEdit ? "updated" : "added"} successfully`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleDelete = () => {
    if (!existingAddress?.id) return;

    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteAddress(existingAddress.id!);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={scale(24)} color="#4A4A4A" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>
            {isEdit ? "Edit Address" : "Add New Address"}
          </Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Address Type Selection */}
          <Text style={styles.sectionTitle}>Address Type*</Text>
          <View style={styles.typeContainer}>
            {addressTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  selectedType === type && styles.typeButtonSelected,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.typeText,
                    selectedType === type && styles.typeTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Type Input (shown when "Other" is selected) */}
          {selectedType === "Other" && (
            <View style={styles.customTypeWrapper}>
              <FloatingLabelInput
                label="Custom Address Type*"
                value={customType}
                onChangeText={setCustomType}
                // placeholder="e.g., Gym, Friend's House"
              />
            </View>
          )}

          {/* Full Address */}
          <Text style={styles.sectionTitle}>Location Details</Text>
          <View style={styles.inputWrapper}>
            <FloatingLabelInput
              label="Full Address*"
              value={fullAddress}
              onChangeText={setFullAddress}
              //   placeholder="Street, Area, City"
            />
          </View>

          {/* Building Details */}
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <FloatingLabelInput
                label="Building No.*"
                value={buildingNo}
                onChangeText={setBuildingNo}
              />
            </View>
            <View style={styles.halfInput}>
              <FloatingLabelInput
                label="Floor"
                value={floor}
                onChangeText={setFloor}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <FloatingLabelInput
              label="Apartment/Unit No."
              value={apartment}
              onChangeText={setApartment}
            />
          </View>

          {/* Contact Details */}
          <Text style={styles.sectionTitle}>Contact Details</Text>
          <View style={styles.inputWrapper}>
            <FloatingLabelInput
              label="Recipient Name*"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <FloatingLabelInput
              label="Phone Number*"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Additional Info */}
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <TextInput
            style={styles.additionalInfoInput}
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            placeholder="Delivery instructions, landmarks, etc."
            placeholderTextColor="#999999"
            multiline
            numberOfLines={4}
          />

          {/* Delete Button (only in edit mode) */}
          {isEdit && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.deleteButtonText}>Delete Address</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Bottom Save Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!isFormValid}
        >
          <Text style={styles.saveButtonText}>
            {isEdit ? "Update Address" : "Save Address"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddEditAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    height: scale(50),
    alignItems: "center",
    paddingHorizontal: scale(16),
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E6EAF1",
  },
  backButton: {
    padding: scale(4),
    marginRight: scale(8),
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#4A4A4A",
  },
  spacer: {
    width: scale(36),
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: scale(16),
    paddingBottom: scale(100),
  },
  sectionTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#4A4A4A",
    marginTop: scale(20),
    marginBottom: scale(12),
  },
  typeContainer: {
    flexDirection: "row",
    gap: scale(12),
  },
  typeButton: {
    flex: 1,
    height: scale(48),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: "#E6EAF1",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  typeButtonSelected: {
    backgroundColor: "#017851",
    borderColor: "#017851",
  },
  typeText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    color: "#4A4A4A",
  },
  typeTextSelected: {
    color: "#ffffff",
  },
  customTypeWrapper: {
    marginTop: scale(12),
    marginBottom: scale(12),
  },
  inputWrapper: {
    marginBottom: scale(12),
  },
  row: {
    flexDirection: "row",
    gap: scale(12),
    marginBottom: scale(12),
  },
  halfInput: {
    flex: 1,
  },
  additionalInfoInput: {
    height: scale(100),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: "#E6EAF1",
    padding: scale(12),
    fontSize: scale(14),
    fontFamily: "Rubik-Regular",
    color: "#4A4A4A",
    textAlignVertical: "top",
  },
  deleteButton: {
    height: scale(48),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: "#FF4444",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(24),
  },
  deleteButtonText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#FF4444",
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: "#E6EAF1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    paddingBottom: scale(24),
    marginBottom: scale(20),
  },
  saveButton: {
    backgroundColor: "#F6B01F",
    height: scale(52),
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  saveButtonText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#000000",
  },
});
