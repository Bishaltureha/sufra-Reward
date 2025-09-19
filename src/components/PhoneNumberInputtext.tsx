import React, { useMemo, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { countries, getInputMaxLength } from "../utils/countries";
import CountryPicker from "./CountryPicker";

interface Country {
  name: string;
  code: string;
  emoji: string;
  unicode: string;
  image1x1: any;
  image4x3: any;
  dial_code: string;
  phoneLength: number;
  nativeName: string;
  language: string;
  languageCode: string;
  phoneFormat: {
    pattern: string;
    spacingChars: number;
  };
  maxLength: number;
}

interface PhoneNumberInputProps {
  defaultCountry?: string;
  onCountryChange?: (country: Country) => void;
  onPhoneChange?: (phone: string, country: Country, isValid: boolean) => void;
  placeholder?: string;
  value?: string;
  editable?: boolean;
  style?: any;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  defaultCountry = "US",
  onCountryChange,
  onPhoneChange,
  placeholder = "Phone number",
  value,
  editable = true,
  style,
}) => {
  const validCountries = useMemo(() => {
    return countries
      .filter((c) => c.dial_code)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    return (
      validCountries.find(
        (c) => c.code.toLowerCase() === defaultCountry.toLowerCase()
      ) || validCountries[0]
    );
  });

  const [phoneNumber, setPhoneNumber] = useState(value || "");
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  /** Format phone number using pattern from countries.ts */
  const formatPhoneNumber = (text: string, country: Country): string => {
    const digitsOnly = text.replace(/\D/g, "");
    const { pattern } = country.phoneFormat || { pattern: "" };

    if (!pattern) return digitsOnly;

    let result = "";
    let digitIndex = 0;

    for (let i = 0; i < pattern.length && digitIndex < digitsOnly.length; i++) {
      if (pattern[i].toLowerCase() === "x") {
        result += digitsOnly[digitIndex++];
      } else {
        result += pattern[i];
      }
    }

    return result;
  };

  /** Handle typing */
  const handlePhoneNumberChange = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    if (digitsOnly.length <= selectedCountry.phoneLength) {
      const formattedText = formatPhoneNumber(text, selectedCountry);
      setPhoneNumber(formattedText);

      // 🔥 Check if valid (exact length)
      const isValid = digitsOnly.length === selectedCountry.phoneLength;
      onPhoneChange?.(formattedText, selectedCountry, isValid);
    }
  };

  /** Handle country switch */
  const handleCountrySelect = (country: Country) => {
    const previousCountry = selectedCountry;
    setSelectedCountry(country);
    onCountryChange?.(country);

    if (previousCountry.code !== country.code && phoneNumber) {
      const digitsOnly = phoneNumber.replace(/\D/g, "");
      if (digitsOnly.length <= country.phoneLength) {
        const reformattedNumber = formatPhoneNumber(digitsOnly, country);
        setPhoneNumber(reformattedNumber);

        const isValid = digitsOnly.length === country.phoneLength;
        onPhoneChange?.(reformattedNumber, country, isValid);
      } else {
        setPhoneNumber("");
        onPhoneChange?.("", country, false);
      }
    } else {
      const digitsOnly = phoneNumber.replace(/\D/g, "");
      const isValid = digitsOnly.length === country.phoneLength;
      onPhoneChange?.(phoneNumber, country, isValid);
    }
  };

  useEffect(() => {
    if (value !== undefined && value !== phoneNumber) {
      setPhoneNumber(value);
    }
  }, [value]);

  return (
    <View style={style}>
      <View style={[styles.phoneInputContainer, !editable && styles.disabled]}>
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => editable && setIsPickerVisible(true)}
          disabled={!editable}
        >
          <View style={styles.flagContainer}>
            {selectedCountry.image1x1 &&
            typeof selectedCountry.image1x1 === "function" ? (
              <View style={styles.flagWrapper}>
                <selectedCountry.image1x1
                  width={28}
                  height={28}
                  style={styles.flagSvg}
                />
              </View>
            ) : selectedCountry.emoji ? (
              <Text style={styles.emojiFlag}>{selectedCountry.emoji}</Text>
            ) : (
              <View style={styles.fallbackFlag}>
                <Text style={styles.fallbackFlagText}>
                  {selectedCountry.code}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.dialCode}>
            {selectedCountry.dial_code || "+1"}
          </Text>
          {editable && (
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
          )}
        </TouchableOpacity>

        <View style={styles.separator} />

        <TextInput
          style={styles.phoneInput}
          placeholder={placeholder}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
          editable={editable}
          placeholderTextColor="#999"
          maxLength={getInputMaxLength(selectedCountry)}
        />
      </View>

      <CountryPicker
        visible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        onSelect={handleCountrySelect}
        selectedCountry={selectedCountry}
      />
    </View>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 55,
    backgroundColor: "#FFF",
  },
  disabled: {
    backgroundColor: "#F5F5F5",
    borderColor: "#D0D0D0",
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  flagContainer: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  flagWrapper: {
    width: 28,
    height: 28,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  flagSvg: {
    position: "absolute",
  },
  emojiFlag: {
    fontSize: 18,
    textAlign: "center",
  },
  fallbackFlag: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  fallbackFlagText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#666",
  },
  dialCode: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 4,
    color: "#333",
  },
  separator: {
    width: 1,
    height: 30,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});
