import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { countries } from "../utils/countries";
import CountryPicker from "./CountryPicker";

interface Country {
  name: string;
  code: string;
  emoji: string;
  unicode: string;
  image: any;
  dial_code: string;
  phoneLength: number;
}

interface PhoneNumberInputProps {
  defaultCountry?: string;
  onCountryChange?: (country: Country) => void;
  onPhoneChange?: (phone: string, country: Country) => void;
  placeholder?: string;
}

const PhoneNumberInputtext: React.FC<PhoneNumberInputProps> = ({
  defaultCountry = "US",
  onCountryChange,
  onPhoneChange,
  placeholder = "Phone number",
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

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    onPhoneChange?.(text, selectedCountry);
  };

  return (
    <View>
      <View style={styles.phoneInputContainer}>
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => setIsPickerVisible(true)}
        >
          <Image source={selectedCountry.image} style={styles.flag} />
          <Text style={styles.dialCode}>
            {selectedCountry.dial_code || "+1"}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TextInput
          style={styles.phoneInput}
          placeholder={placeholder}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
        />
      </View>

      <CountryPicker
        visible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        onSelect={(country) => {
          setSelectedCountry(country);
          onCountryChange?.(country);
        }}
        selectedCountry={selectedCountry}
      />
    </View>
  );
};

export default PhoneNumberInputtext;

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
  countrySelector: { flexDirection: "row", alignItems: "center" },
  flag: { width: 24, height: 24, marginRight: 8, borderRadius: 2 },
  dialCode: { fontSize: 16, fontWeight: "500", marginRight: 4 },
  separator: {
    width: 1,
    height: 30,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
  phoneInput: { flex: 1, fontSize: 16 },
});
