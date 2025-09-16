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
import PhoneNumberInputtext from "../components/PhoneNumberInputtext";

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

  const handlePhoneChange = (phoneNumber: string, country: Country) => {
    setPhone(phoneNumber);
    setSelectedCountry(country);
    console.log("📞 Phone:", phoneNumber, "🌍 Country:", country);
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    console.log("🌍 Selected Country:", country);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <Header
        image={<Logo height={35} width={123} />}
        title={undefined}
        onBackPress={undefined}
        titleStyle={undefined}
        containerStyle={undefined}
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.subtitle}>
          Please enter the phone number you {"\n"}registered with
        </Text>

        {/* ✅ Phone input with country picker */}
        <PhoneNumberInputtext
          defaultCountry="US"
          placeholder="Phone number"
          onCountryChange={handleCountryChange}
          onPhoneChange={handlePhoneChange}
        />
      </View>

      {/* Fixed button at bottom */}
      <View style={styles.footer}>
        <CustomButton
          title="Send Password"
          backgroundColor="#ffab00"
          onPress={() => {
            if (phone.trim() && selectedCountry) {
              const fullNumber = `${selectedCountry.dial_code}${phone}`;
              console.log("📤 Sending to:", fullNumber);
              navigation.navigate("Home");
            } else {
              console.log("⚠️ Phone number required");
            }
          }}
          style={styles.buttonStyle}
          textColor="#000000"
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
  },
  subtitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "400",
    color: "#717171",
    textAlign: "left",
  },
  footer: {
    padding: 20,
  },
  buttonStyle: {
    paddingVertical: 16,
    marginBottom: 20,
  },
});
