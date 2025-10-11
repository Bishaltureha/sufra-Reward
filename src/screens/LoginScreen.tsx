import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Logo from "../../assets/svg/Logo";
import CustomButton from "../components/CustomButton";
import { AuthStackParamList, RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PhoneNumberInput from "../components/PhoneNumberInputtext";
import { useLocalization } from "../context/LocalizationContext";
import RTLText from "../components/RTLText";
import RTLTextInput from "../components/RTLTextInput";
import { scale } from "../utils/dimen";

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, "Login">,
  NativeStackScreenProps<RootStackParamList>
>;

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
  const { t } = useLocalization();
  const [secureText, setSecureText] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isValidPhone, setIsValidPhone] = useState(false);

  const handlePhoneChange = (phone: string, country: Country) => {
    setPhoneNumber(phone);
    setSelectedCountry(country);

    const cleanNumber = phone.replace(/\D/g, "");
    const isValid = cleanNumber.length >= (country.phoneLength || 7);
    setIsValidPhone(isValid);
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);

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
      navigation.navigate("MainStack", { screen: "Home" });
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
        image={<Logo height={scale(35)} width={scale(123)} />}
        title={undefined}
        onBackPress={undefined}
        titleStyle={undefined}
        containerStyle={undefined}
      />

      <View style={styles.content}>
        <RTLText style={styles.heading}>{t("login.title")}</RTLText>

        {/* Phone number input with country selector */}
        <View style={styles.phoneInputContainer}>
          <PhoneNumberInput
            defaultCountry="AE"
            placeholder={t("phone.placeholder")}
            onCountryChange={handleCountryChange}
            onPhoneChange={handlePhoneChange}
            value={phoneNumber}
            style={styles.phoneInput}
          />
          {phoneNumber && !isValidPhone && (
            <RTLText style={styles.errorText}>{t("phone.invalid")}</RTLText>
          )}
        </View>

        {/* Password input with eye toggle */}
        <View style={styles.passwordContainer}>
          <RTLTextInput
            placeholder={t("login.passwordPlaceholder")}
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
            hitSlop={{
              top: scale(10),
              bottom: scale(10),
              left: scale(10),
              right: scale(10),
            }}
          >
            <Ionicons
              name={secureText ? "eye-off" : "eye"}
              size={scale(21)}
              color="#6D6D6D"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot password link */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgetPassword")}
          style={styles.forgotWrapper}
          hitSlop={{
            top: scale(10),
            bottom: scale(10),
            left: scale(10),
            right: scale(10),
          }}
        >
          <RTLText style={styles.forgotText}>
            {t("login.forgotPassword")}
          </RTLText>
        </TouchableOpacity>

        {/* Sign in button */}
        <CustomButton
          title={t("login.signIn")}
          backgroundColor={isFormValid ? "#ffab00" : "#E0E0E0"}
          onPress={handleLogin}
          style={styles.buttonStyle}
          textColor={isFormValid ? "#000000" : "#999999"}
          disabled={!isFormValid}
        />

        {/* Register link */}
        <View style={styles.registerSection}>
          <RTLText style={styles.noAccount}>{t("login.noAccount")}</RTLText>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <RTLText style={styles.registerText}>
              {t("login.registerNow")}
            </RTLText>
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
    padding: scale(20),
    width: "100%",
  },
  heading: {
    fontSize: scale(24),
    fontWeight: "600",
    color: "#4A4A4A",
    textAlign: "left",
    marginBottom: scale(8),
    lineHeight: scale(32),
  },
  phoneInputContainer: {
    marginTop: scale(30),
    marginBottom: scale(20),
  },
  phoneInput: {
    marginBottom: 0,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: scale(20),
  },
  input: {
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    width: "100%",
    padding: scale(16),
    borderRadius: scale(8),
    fontSize: scale(16),
    backgroundColor: "#ffffff",
  },
  eyeIcon: {
    position: "absolute",
    right: scale(16),
    top: "50%",
    transform: [{ translateY: -scale(10.5) }],
  },
  errorText: {
    fontSize: scale(14),
    color: "#FF3B30",
    marginTop: scale(8),
    marginStart: scale(4),
  },
  forgotWrapper: {
    alignSelf: "flex-end",
    marginBottom: scale(30),
  },
  forgotText: {
    color: "#017851",
    fontWeight: "600",
    fontSize: scale(15),
    textDecorationLine: "underline",
  },
  buttonStyle: {
    paddingVertical: scale(16),
    marginBottom: scale(20),
  },
  registerSection: {
    alignItems: "center",
    marginTop: scale(20),
  },
  noAccount: {
    color: "#717171",
    fontSize: scale(15),
    fontWeight: "400",
    textAlign: "center",
    marginBottom: scale(12),
  },
  registerText: {
    color: "#017851",
    fontSize: scale(18),
    fontWeight: "600",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
