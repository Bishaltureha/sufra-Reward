import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Logo from "../../assets/svg/Logo";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PhoneNumberInput from "../components/PhoneNumberInputtext";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

interface Country {
  code: string;
  name: string;
  dial_code: string;
  emoji?: string;
  unicode?: string;
  image?: any;
  phoneLength?: number;
}

const Register = ({ navigation }: Props) => {
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isValidPhone, setIsValidPhone] = useState(false);

  const handlePhoneChange = (phone: string, country: Country) => {
    setPhone(phone);
    setSelectedCountry(country);

    // Validate phone number
    const cleanNumber = phone.replace(/\D/g, "");
    const isValid = cleanNumber.length >= (country.phoneLength || 7);
    setIsValidPhone(isValid);

    console.log("Phone:", phone, "Country:", country, "Valid:", isValid);
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);

    // Re-validate phone number with new country
    if (phone) {
      const cleanNumber = phone.replace(/\D/g, "");
      const isValid = cleanNumber.length >= (country.phoneLength || 7);
      setIsValidPhone(isValid);
    }

    console.log("Selected Country:", country);
  };

  const handleContinue = () => {
    if (phone.trim() && selectedCountry && isValidPhone) {
      const cleanNumber = phone.replace(/\D/g, "");
      const fullNumber = `${selectedCountry.dial_code}${cleanNumber}`;
      console.log("Proceed with number:", fullNumber);
      navigation.navigate("Otp");
    } else {
      console.log("Please enter a valid phone number");
      // You could show an alert or error message here
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      {/* Header */}
      <Header
        image={<Logo height={35} width={123} />}
        title={undefined}
        onBackPress={() => navigation.goBack()}
        titleStyle={undefined}
        containerStyle={undefined}
      />

      {/* Content */}
      <View style={styles.subContent}>
        <Text style={styles.title}>
          Enter your phone number {"\n"}and continue
        </Text>

        {/* Phone input */}
        <View style={styles.phoneInputContainer}>
          <PhoneNumberInput
            defaultCountry="AE"
            placeholder="Enter phone number"
            onCountryChange={handleCountryChange}
            onPhoneChange={handlePhoneChange}
            value={phone}
            style={styles.phoneInput}
          />

          {/* Validation message */}
          {phone && !isValidPhone && (
            <Text style={styles.errorText}>
              Please enter a valid phone number
            </Text>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <CustomButton
          title="Continue"
          backgroundColor={isValidPhone ? "#ffab00" : "#E0E0E0"}
          onPress={handleContinue}
          style={styles.buttonStyle}
          textColor={isValidPhone ? "#000000" : "#999999"}
          disabled={!isValidPhone}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  subContent: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4A4A4A",
    textAlign: "left",
    marginBottom: 8,
    lineHeight: 32,
  },
  phoneInputContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  phoneInput: {
    marginBottom: 0,
  },
  errorText: {
    fontSize: 14,
    color: "#FF3B30",
    marginTop: 8,
    marginLeft: 4,
  },
  termsText: {
    fontSize: 14,
    color: "#717171",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 40,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  buttonStyle: {
    paddingVertical: 16,
    marginBottom: 20,
  },
});
