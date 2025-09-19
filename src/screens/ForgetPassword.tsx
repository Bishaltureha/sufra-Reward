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

type Props = NativeStackScreenProps<RootStackParamList, "ForgetPassword">;

interface Country {
  code: string;
  name: string;
  dial_code: string;
  emoji?: string;
  unicode?: string;
  image?: any;
  phoneLength?: number;
}

const ForgetPassword = ({ navigation }: Props) => {
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isValidPhone, setIsValidPhone] = useState(false);

  const handlePhoneChange = (phoneNumber: string, country: Country) => {
    setPhone(phoneNumber);
    setSelectedCountry(country);

    // Basic validation - check if phone number has minimum length
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    const isValid = cleanNumber.length >= (country.phoneLength || 7);
    setIsValidPhone(isValid);

    console.log("Phone:", phoneNumber, "Country:", country, "Valid:", isValid);
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    // console.log("Selected Country:", country);

    // Re-validate phone number with new country
    if (phone) {
      const cleanNumber = phone.replace(/\D/g, "");
      const isValid = cleanNumber.length >= (country.phoneLength || 7);
      setIsValidPhone(isValid);
    }
  };

  const handleSendPassword = () => {
    if (phone.trim() && selectedCountry && isValidPhone) {
      const cleanNumber = phone.replace(/\D/g, "");
      const fullNumber = `${selectedCountry.dial_code}${cleanNumber}`;
      // console.log("Sending to:", fullNumber);

      // Navigate to verification screen or show success message
      navigation.navigate("Home");
    } else {
      console.log("Please enter a valid phone number");
      // You could show an error message here
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
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.subtitle}>
          Please enter the phone number you {"\n"}registered with
        </Text>

        {/* Phone input with country picker */}
        <View style={styles.phoneInputContainer}>
          <PhoneNumberInput
            defaultCountry="AE"
            placeholder="Phone number"
            onCountryChange={handleCountryChange}
            onPhoneChange={handlePhoneChange}
            value={phone}
            style={styles.phoneInput}
          />
        </View>

        {/* Show validation message */}
        {phone && !isValidPhone && (
          <Text style={styles.errorText}>
            Please enter a valid phone number
          </Text>
        )}
      </View>

      {/* Fixed button at bottom */}
      <View style={styles.footer}>
        <CustomButton
          title="Send Password"
          backgroundColor={isValidPhone ? "#ffab00" : "#E0E0E0"}
          onPress={handleSendPassword}
          style={styles.buttonStyle}
          textColor={isValidPhone ? "#000000" : "#999999"}
          disabled={!isValidPhone}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4A4A4A",
    textAlign: "left",
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 15,
    fontWeight: "400",
    color: "#717171",
    textAlign: "left",
    lineHeight: 22,
  },
  phoneInputContainer: {
    marginBottom: 16,
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
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  buttonStyle: {
    paddingVertical: 16,
    marginBottom: 20,
  },
});
