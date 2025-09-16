import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { countries } from "../utils/countries";

interface Country {
  name: string;
  code: string;
  emoji: string;
  unicode: string;
  image: any;
  dial_code: string;
  phoneLength: number;
}

interface CountryPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  selectedCountry?: Country;
}

const { height: screenHeight } = Dimensions.get("window");

const CountryPicker: React.FC<CountryPickerProps> = ({
  visible,
  onClose,
  onSelect,
  selectedCountry,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const validCountries = useMemo(() => {
    return countries
      .filter((c) => c.dial_code) // must have dial_code
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return validCountries;
    const query = searchQuery.toLowerCase();
    return validCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        (c.dial_code && c.dial_code.includes(query))
    );
  }, [searchQuery, validCountries]);

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={[
        styles.countryItem,
        selectedCountry?.code === item.code && styles.selectedCountryItem,
      ]}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <Image source={item.image} style={styles.flagImage} />
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.countryCode}>{item.dial_code}</Text>
      </View>
      {selectedCountry?.code === item.code && (
        <MaterialIcons name="check" size={20} color="#007AFF" />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>Select Country</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <MaterialIcons name="clear" size={20} color="#666" />
              </TouchableOpacity>
            ) : null}
          </View>

          <FlatList
            data={filteredCountries}
            renderItem={renderItem}
            keyExtractor={(item) => item.code}
          />

          {filteredCountries.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No countries found</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: "flex-end" },
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  bottomSheet: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.7,
    padding: 20,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bottomSheetTitle: { fontSize: 18, fontWeight: "600" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    marginBottom: 10,
  },
  searchInput: { flex: 1, fontSize: 16, marginLeft: 8 },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedCountryItem: { backgroundColor: "#F0F8FF" },
  flagImage: { width: 28, height: 28, marginRight: 12, borderRadius: 4 },
  countryInfo: { flex: 1 },
  countryName: { fontSize: 16, fontWeight: "500" },
  countryCode: { fontSize: 14, color: "#666" },
  noResultsContainer: { padding: 20, alignItems: "center" },
  noResultsText: { color: "#666" },
});
