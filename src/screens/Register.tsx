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

  const handlePhoneChange = (phone: string, country: Country) => {
    setPhone(phone);
    setSelectedCountry(country);
    console.log("📞 Phone:", phone, "🌍 Country:", country);
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    console.log("🌍 Selected Country:", country);
  };

  const handleContinue = () => {
    if (phone.trim() && selectedCountry) {
      const fullNumber = `${selectedCountry.dial_code}${phone}`;
      console.log("➡️ Proceed with number:", fullNumber);
      navigation.navigate("Otp");
    } else {
      console.log("⚠️ Phone number required");
    }
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
      <View style={styles.subContent}>
        <Text style={styles.title}>
          Enter your phone number {"\n"}and continue
        </Text>

        {/* 📞 Phone input */}
        <View style={{ marginTop: 20 }}>
          <PhoneNumberInputtext
            defaultCountry="US"
            placeholder="Enter phone number"
            onCountryChange={handleCountryChange}
            onPhoneChange={handlePhoneChange}
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <CustomButton
          title="Continue"
          backgroundColor="#ffab00"
          onPress={handleContinue}
          style={styles.buttonStyle}
          textColor="#000000"
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
  },
  footer: {
    padding: 20,
  },
  buttonStyle: {
    paddingVertical: 16,
    marginBottom: 20,
  },
});
