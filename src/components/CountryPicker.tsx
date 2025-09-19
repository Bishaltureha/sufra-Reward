import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { countries } from "../utils/countries";

const FallbackFlag = ({ countryCode }: { countryCode: string }) => (
  <View style={styles.fallbackFlag}>
    <Text style={styles.fallbackFlagText}>{countryCode}</Text>
  </View>
);

interface Country {
  name: string;
  nativeName: string;
  code: string;
  emoji: string;
  unicode: string;
  image1x1: any;
  image4x3: any;
  dial_code: string;
  phoneLength: number;
  language: string;
  languageCode: string;
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
      .filter((c) => c.dial_code && c.dial_code.trim() !== "")
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return validCountries;
    const query = searchQuery.toLowerCase().trim();
    return validCountries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.nativeName?.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query) ||
        country.language?.toLowerCase().includes(query) ||
        (country.dial_code && country.dial_code.includes(query))
    );
  }, [searchQuery, validCountries]);

  const handleCountrySelect = useCallback(
    (country: Country) => {
      onSelect(country);
      setSearchQuery("");
      onClose();
    },
    [onSelect, onClose]
  );

  const handleClose = useCallback(() => {
    setSearchQuery("");
    onClose();
  }, [onClose]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const renderCountryItem = useCallback(
    ({ item }: { item: Country }) => {
      const isSelected = selectedCountry?.code === item.code;

      // Format display name with native name in parentheses
      const displayName =
        item.nativeName && item.nativeName !== item.name
          ? `${item.name} (${item.nativeName})`
          : item.name;

      return (
        <TouchableOpacity
          style={[styles.countryItem, isSelected && styles.selectedCountryItem]}
          onPress={() => handleCountrySelect(item)}
          activeOpacity={0.7}
        >
          {/* Dial Code */}
          <Text style={styles.countryCode}>
            {item.dial_code.replace("+", "")}
          </Text>

          {/* Flag */}
          <View style={styles.flagContainer}>
            {item.image4x3 && typeof item.image4x3 === "function" ? (
              <item.image4x3 width={24} height={18} style={styles.flagSvg} />
            ) : item.emoji ? (
              <Text style={styles.emojiFlag}>{item.emoji}</Text>
            ) : (
              <FallbackFlag countryCode={item.code} />
            )}
          </View>

          {/* Country Name with Native Name */}
          <Text style={styles.countryName} numberOfLines={1}>
            {displayName}
          </Text>

          {isSelected && (
            <MaterialIcons name="check" size={20} color="#007AFF" />
          )}
        </TouchableOpacity>
      );
    },
    [selectedCountry, handleCountrySelect]
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={handleClose}
          activeOpacity={1}
        />
        <View style={styles.bottomSheet}>
          <View style={styles.modalHandle} />
          <SafeAreaView style={styles.safeAreaContainer}>
            {/* Header */}
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Select Country</Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#444" />
              </TouchableOpacity>
            </View>

            {/* Search bar */}
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={20} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search country or language"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#878787"
                returnKeyType="search"
                autoCorrect={false}
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <MaterialIcons name="clear" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </View>

            {/* Country list */}
            <FlatList
              data={filteredCountries}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={() => (
                <View style={styles.noResultsContainer}>
                  <MaterialIcons name="search-off" size={48} color="#ccc" />
                  <Text style={styles.noResultsText}>No countries found</Text>
                  <Text style={styles.noResultsSubtext}>
                    Try adjusting your search terms
                  </Text>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBackground: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: screenHeight * 0.9,
    minHeight: screenHeight * 0.7,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
    alignSelf: "center",
    marginVertical: 8,
  },
  safeAreaContainer: {
    flex: 1,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android elevation
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: "#eee",
    marginLeft: 20,
  },
  selectedCountryItem: {
    backgroundColor: "#F0F8FF",
  },
  flagContainer: {
    width: 24,
    height: 18,
    marginHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  flagSvg: {
    borderRadius: 4,
  },
  emojiFlag: {
    fontSize: 18,
    width: 24,
    textAlign: "center",
  },
  fallbackFlag: {
    width: 24,
    height: 18,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  fallbackFlagText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#666",
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
  },
  countryCode: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FF9800",
    width: 50,
    textAlign: "right",
  },
  noResultsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
    fontWeight: "500",
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
    textAlign: "center",
  },
});
