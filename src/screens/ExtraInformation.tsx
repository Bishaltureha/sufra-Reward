import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../assets/svg/BackArrow";
import Entypo from "@expo/vector-icons/Entypo";
import { scale } from "../utils/dimen";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerParamList, MainStackParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomCheckbox from "../components/CustomCheckbox";

type ExtraInformationscreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, "ExtraInformation">,
  NativeStackNavigationProp<MainStackParamList>
>;

const dataSets: Record<string, string[]> = {
  Gender: ["Male", "Female", "Other"],
  Nationality: [
    "Afghanistan",
    "Albania",
    "Australia",
    "Bangladesh",
    "Canada",
    "China",
    "France",
    "Germany",
    "India",
    "Japan",
    "Mexico",
    "Saudi Arabia",
    "Spain",
    "Sri Lanka",
    "Thailand",
    "Turkey",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uzbekistan",
  ],
  "Preferred Channels of Communication": [
    "Email",
    "SMS",
    "Push Notifications",
    "Phone Call",
    "In-App Message",
    "WhatsApp",
  ],
  "Favorite Cuisines": [
    "Mediterranean",
    "Thai",
    "Chinese",
    "Indian",
    "Italian",
    "Japanese",
    "Mexican",
    "French",
  ],
  Allergens: [
    "Egg",
    "Fish",
    "Gluten",
    "Milk",
    "Mustard",
    "Peanuts",
    "Sesame",
    "Shellfish",
    "Soybeans",
    "Wheat",
  ],
};

const ExtraInformation = () => {
  const navigation = useNavigation<ExtraInformationscreenNavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({
    Gender: ["Male"],
    Nationality: ["Uzbekistan"],
    "Preferred Channels of Communication": [
      "SMS",
      "Email",
      "Push Notifications",
    ],
    "Favorite Cuisines": ["Mediterranean", "Thai", "Chinese"],
    Allergens: ["Soybeans", "Mustard", "Peanuts"],
  });

  const [birthDate, setBirthDate] = useState(new Date(1990, 11, 31));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOpenModal = (field: string) => {
    if (field === "Birth Date") {
      setShowDatePicker(true);
    } else {
      setSelectedField(field);
      setSearchQuery("");
      setModalVisible(true);
    }
  };

  const handleSelectItem = (item: string) => {
    if (!selectedField) return;

    const current = selectedItems[selectedField] || [];
    const singleSelect = ["Gender", "Nationality"].includes(selectedField);

    let updated: string[];
    if (singleSelect) {
      updated = [item];
    } else {
      updated = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];
    }

    setSelectedItems({
      ...selectedItems,
      [selectedField]: updated,
    });
  };

  const getDataForField = () => {
    if (!selectedField) return [];
    const data = dataSets[selectedField] || [];
    return data.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderRow = (label: string) => {
    let value = "—";
    if (label === "Birth Date") {
      value = birthDate.toLocaleDateString();
    } else {
      value = selectedItems[label]?.join(", ") || "—";
    }

    return (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <View style={styles.rowContent}>
          <Text style={styles.infoValue} numberOfLines={1}>
            {value}
          </Text>
          <TouchableOpacity onPress={() => handleOpenModal(label)}>
            <Entypo name="chevron-thin-down" size={22} color="#52525B" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const filteredData = getDataForField();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Extra Information</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {renderRow("Birth Date")}
        {renderRow("Gender")}
        {renderRow("Nationality")}
        {renderRow("Preferred Channels of Communication")}
        {renderRow("Favorite Cuisines")}
        {renderRow("Allergens")}
      </View>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            const payload = {
              birthDate: birthDate.toISOString().split("T")[0],
              gender: selectedItems["Gender"]?.[0] || "",
              nationality: selectedItems["Nationality"]?.[0] || "",
              preferredChannels:
                selectedItems["Preferred Channels of Communication"] || [],
              favoriteCuisines: selectedItems["Favorite Cuisines"] || [],
              allergens: selectedItems["Allergens"] || [],
            };

            navigation.navigate({
              name: "ProfileInformation",
              params: { ...payload, fromExtra: true }, // ✅ flag to detect source
              merge: true,
            });
          }}
        >
          <Text style={styles.saveButtonText}>SAVE MY CHANGES</Text>
        </TouchableOpacity>
      </View>

      {/* Multi-select modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalHeader}>{selectedField}</Text>

            <View style={styles.searchBox}>
              <TextInput
                placeholder="Type and filter..."
                placeholderTextColor="#9E9E9E"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
              />
            </View>

            <FlatList
              data={filteredData}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isChecked =
                  selectedItems[selectedField || ""]?.includes(item) || false;

                return (
                  <TouchableOpacity
                    style={styles.checkboxRow}
                    activeOpacity={0.7}
                    onPress={() => handleSelectItem(item)}
                  >
                    <Text style={styles.checkboxLabel}>{item}</Text>
                    <CustomCheckbox
                      checked={isChecked}
                      onChange={() => handleSelectItem(item)}
                    />
                  </TouchableOpacity>
                );
              }}
            />

            <TouchableOpacity
              style={styles.saveModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.saveModalText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Birth Date Picker Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalHeader}>Birth Date</Text>

            {Platform.OS === "ios" ? (
              <DateTimePicker
                value={birthDate}
                mode="date"
                display="spinner"
                onChange={(event, date) => {
                  if (date) setBirthDate(date);
                }}
                style={{ backgroundColor: "white" }}
              />
            ) : (
              <DateTimePicker
                value={birthDate}
                mode="date"
                display="calendar"
                onChange={(event, date) => {
                  if (date) {
                    setBirthDate(date);
                    setShowDatePicker(false);
                  }
                }}
              />
            )}

            {Platform.OS === "ios" && (
              <TouchableOpacity
                style={styles.saveModalButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.saveModalText}>SAVE</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ExtraInformation;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
    borderBottomWidth: scale(1),
    borderBottomColor: "#E6EAF1",
    paddingHorizontal: scale(16),
  },
  backButton: {
    padding: scale(4),
    marginRight: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: { flex: 1, alignItems: "center" },
  headerTitle: {
    fontWeight: "700",
    fontSize: scale(24),
    color: "#747474",
  },
  spacer: { width: scale(36) },
  contentContainer: { padding: scale(16), gap: scale(16) },
  infoRow: {
    width: "100%",
    paddingVertical: scale(12),
    borderBottomWidth: 2,
    borderBottomColor: "rgba(76, 78, 81, 0.5)",
  },
  infoLabel: {
    color: "rgba(76, 78, 81, 0.5)",
    fontWeight: "700",
    fontSize: scale(14),
    marginBottom: scale(4),
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoValue: {
    flex: 1,
    fontWeight: "700",
    fontSize: scale(16),
    color: "#52525B",
    marginRight: scale(8),
  },
  footer: { padding: scale(24) },
  saveButton: {
    backgroundColor: "#D86642",
    borderRadius: scale(100),
    paddingVertical: scale(18),
    alignItems: "center",
  },
  saveButtonText: {
    fontWeight: "500",
    fontSize: scale(16),
    textTransform: "uppercase",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: scale(16),
    borderTopLeftRadius: scale(16),
    paddingTop: scale(16),
    paddingHorizontal: scale(16),
    paddingBottom: scale(32),
    maxHeight: "80%",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3A3A3A",
    marginBottom: 12,
  },
  searchBox: {
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 12,
  },
  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#333",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#C6C6C6",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    backgroundColor: "#3E7E68",
    borderRadius: 2,
  },
  saveModalButton: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#D86642",
    borderRadius: 100,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  saveModalText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
