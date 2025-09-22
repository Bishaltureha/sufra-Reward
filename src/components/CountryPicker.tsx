import React, { useMemo, useState, useCallback } from "react";
import { View, Modal, FlatList, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { countries } from "../utils/countries";
import { scale } from "../utils/dimen";
import { useLocalization } from "../context/LocalizationContext";
import RTLText from "./RTLText";
import RTLTextInput from "./RTLTextInput";

const FallbackFlag = ({ countryCode }: { countryCode: string }) => (
  <View style={styles.fallbackFlag}>
    <RTLText style={styles.fallbackFlagText}>{countryCode}</RTLText>
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
  const { t } = useLocalization();

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
          <RTLText style={styles.countryCode}>{item.dial_code}</RTLText>

          {/* Flag */}
          <View style={styles.flagContainer}>
            {item.image4x3 && typeof item.image4x3 === "function" ? (
              <item.image4x3 width={scale(24)} height={scale(18)} style={styles.flagSvg} />
            ) : item.emoji ? (
              <RTLText style={styles.emojiFlag}>{item.emoji}</RTLText>
            ) : (
              <FallbackFlag countryCode={item.code} />
            )}
          </View>

          {/* Country Name with Native Name */}
          <RTLText style={styles.countryName} numberOfLines={1}>
            {displayName}
          </RTLText>

          {isSelected && (
            <MaterialIcons name="check" size={scale(20)} color="#007AFF" />
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
              <RTLText style={styles.bottomSheetTitle}>
                {t("countryPicker.selectTitle")}
              </RTLText>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={scale(24)} color="#444" />
              </TouchableOpacity>
            </View>

            {/* Search bar */}
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={scale(20)} color="#666" />
              <RTLTextInput
                style={styles.searchInput}
                placeholder={t("countryPicker.searchPlaceholder")}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#878787"
                returnKeyType="search"
                autoCorrect={false}
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <MaterialIcons name="clear" size={scale(20)} color="#666" />
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
                  <MaterialIcons name="search-off" size={scale(48)} color="#ccc" />
                  <RTLText style={styles.noResultsText}>
                    {t("countryPicker.noResultsTitle")}
                  </RTLText>
                  <RTLText style={styles.noResultsSubtext}>
                    {t("countryPicker.noResultsSubtitle")}
                  </RTLText>
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
    maxHeight: screenHeight * 0.95,
    minHeight: screenHeight * 0.8,
  },
  modalHandle: {
    width: scale(40),
    height: scale(4),
    backgroundColor: "#ddd",
    borderRadius: scale(2),
    alignSelf: "center",
    marginVertical: scale(8),
  },
  safeAreaContainer: {
    flex: 1,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingVertical: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  bottomSheetTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#222",
  },
  closeButton: {
    padding: scale(4),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scale(20),
    marginTop: scale(12),
    marginBottom: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    backgroundColor: "#ffffff",
    borderRadius: scale(5),
    borderWidth: scale(1),
    borderColor: "#E8E8E8",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    // Android elevation
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: scale(16),
    marginStart: scale(8),
    color: "#333",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(14),
    borderBottomWidth: scale(1.5),
    borderBottomColor: "#eee",
    marginStart: scale(20),
  },
  selectedCountryItem: {
    backgroundColor: "#F0F8FF",
  },
  flagContainer: {
    width: scale(24),
    height: scale(18),
    marginHorizontal: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  flagSvg: {
    borderRadius: scale(4),
  },
  emojiFlag: {
    fontSize: scale(18),
    width: scale(24),
    textAlign: "center",
  },
  fallbackFlag: {
    width: scale(24),
    height: scale(18),
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: "#CCC",
  },
  fallbackFlagText: {
    fontSize: scale(10),
    fontWeight: "bold",
    color: "#666",
  },
  countryName: {
    flex: 1,
    fontSize: scale(16),
    fontWeight: "400",
    color: "#333",
  },
  countryCode: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#FF9800",
    width: scale(50),
    textAlign: "right",
  },
  noResultsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(40),
  },
  noResultsText: {
    fontSize: scale(16),
    color: "#666",
    marginTop: scale(12),
    fontWeight: "500",
  },
  noResultsSubtext: {
    fontSize: scale(14),
    color: "#999",
    marginTop: scale(4),
    textAlign: "center",
  },
})
;
