import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Logo from "../../assets/svg/Logo";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import PhoneNumberInputtext from "../components/PhoneNumberInputtext";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

interface Country {
  code: string;
  name: string;
  dial_code: string;
  emoji?: string;
  unicode?: string;
  image?: any;
  phoneLength?: number;
}

const LoginScreen = ({ navigation }: Props) => {
  const [secureText, setSecureText] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handlePhoneChange = (phone: string, country: Country) => {
    setPhoneNumber(phone);
    setSelectedCountry(country);
    console.log("📞 Phone:", phone, "🌍 Country:", country);
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    console.log("🌍 Selected Country:", country);
  };

  return (
    <View style={styles.container}>
      <Header
        image={<Logo height={35} width={123} />}
        title={undefined}
        onBackPress={undefined}
        titleStyle={undefined}
        containerStyle={undefined}
      />

      <View style={styles.content}>
        <Text style={styles.heading}>
          Enter your phone number{"\n"}and password
        </Text>

        {/* 📞 Phone number input with country selector */}
        <View style={{ marginTop: 20 }}>
          <PhoneNumberInputtext
            defaultCountry="US"
            placeholder="Enter phone number"
            onCountryChange={handleCountryChange}
            onPhoneChange={handlePhoneChange}
          />
        </View>

        {/* 🔑 Password input with eye toggle */}
        <View style={{ position: "relative", marginTop: 20 }}>
          <TextInput
            placeholder="Password"
            secureTextEntry={secureText}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSecureText(!secureText)}
          >
            <Ionicons
              name={secureText ? "eye-off" : "eye"}
              size={21}
              color="#6D6D6D"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot password link */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgetPassword")}
          style={styles.forgotWrapper}
        >
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableOpacity>

        {/* Sign in button */}
        <CustomButton
          title="Sign In"
          backgroundColor="#ffab00"
          onPress={() => {
            if (phoneNumber.trim() && selectedCountry) {
              const fullNumber = `${selectedCountry.dial_code}${phoneNumber}`;
              console.log("✅ Login with:", fullNumber);
              navigation.navigate("Home");
            } else {
              console.log("⚠️ Enter phone & password");
            }
          }}
          style={styles.buttonStyle}
          textColor="#000000"
        />

        {/* Register link */}
        <Text style={styles.noAccount}>If you don't have an account</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4A4A4A",
    textAlign: "left",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    width: "100%",
    padding: 16,
    borderRadius: 6,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  forgotWrapper: {
    marginTop: 20,
  },
  forgotText: {
    color: "#017851",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "right",
    textDecorationLine: "underline",
  },
  buttonStyle: {
    paddingVertical: 16,
    marginTop: 20,
  },
  noAccount: {
    color: "#717171",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 40,
    textAlign: "center",
  },
  registerText: {
    color: "#017851",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 40,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
