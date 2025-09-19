import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Logo from "../../assets/svg/Logo";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import PhoneNumberInput from "../components/PhoneNumberInputtext";

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
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isValidPhone, setIsValidPhone] = useState(false);

  const handlePhoneChange = (phone: string, country: Country) => {
    setPhoneNumber(phone);
    setSelectedCountry(country);

    // Validate phone number
    const cleanNumber = phone.replace(/\D/g, "");
    const isValid = cleanNumber.length >= (country.phoneLength || 7);
    setIsValidPhone(isValid);

    // console.log("Phone:", phone, "Country:", country);
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);

    // Re-validate phone number with new country
    if (phoneNumber) {
      const cleanNumber = phoneNumber.replace(/\D/g, "");
      const isValid = cleanNumber.length >= (country.phoneLength || 7);
      setIsValidPhone(isValid);
    }

    // console.log("Selected Country:", country);
  };

  const handleLogin = () => {
    if (
      phoneNumber.trim() &&
      password.trim() &&
      selectedCountry &&
      isValidPhone
    ) {
      const cleanNumber = phoneNumber.replace(/\D/g, "");
      const fullNumber = `${selectedCountry.dial_code}${cleanNumber}`;
      // console.log("Login with:", fullNumber);
      navigation.navigate("Home");
    } else {
      // console.log("Please enter valid phone number and password");
      // You could show an alert or error message here
    }
  };

  const isFormValid = isValidPhone && password.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
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

        {/* Phone number input with country selector */}
        <View style={styles.phoneInputContainer}>
          <PhoneNumberInput
            defaultCountry="AE"
            placeholder="Enter phone number"
            onCountryChange={handleCountryChange}
            onPhoneChange={handlePhoneChange}
            value={phoneNumber}
            style={styles.phoneInput}
          />
          {phoneNumber && !isValidPhone && (
            <Text style={styles.errorText}>
              Please enter a valid phone number
            </Text>
          )}
        </View>

        {/* Password input with eye toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={secureText}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            textContentType="password"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSecureText(!secureText)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableOpacity>

        {/* Sign in button */}
        <CustomButton
          title="Sign In"
          backgroundColor={isFormValid ? "#ffab00" : "#E0E0E0"}
          onPress={handleLogin}
          style={styles.buttonStyle}
          textColor={isFormValid ? "#000000" : "#999999"}
          disabled={!isFormValid}
        />

        {/* Register link */}
        <View style={styles.registerSection}>
          <Text style={styles.noAccount}>If you don't have an account</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.registerText}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  passwordContainer: {
    position: "relative",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -10.5 }],
  },
  errorText: {
    fontSize: 14,
    color: "#FF3B30",
    marginTop: 8,
    marginLeft: 4,
  },
  forgotWrapper: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotText: {
    color: "#017851",
    fontWeight: "600",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  buttonStyle: {
    paddingVertical: 16,
    marginBottom: 20,
  },
  registerSection: {
    alignItems: "center",
    marginTop: 20,
  },
  noAccount: {
    color: "#717171",
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 12,
  },
  registerText: {
    color: "#017851",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
