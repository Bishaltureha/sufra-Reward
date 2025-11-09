import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Logo from "../../assets/svg/Logo";
import CustomButton from "../components/CustomButton";
import { AuthStackParamList, RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import PhoneNumberInput from "../components/PhoneNumberInputtext";
import { useLocalization } from "../context/LocalizationContext";
import RTLText from "../components/RTLText";
import { scale } from "../utils/dimen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch } from "../store/hooks";
import { setPhoneNumber } from "../store/slice/user";

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, "Register">,
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

const Register = ({ navigation }: Props) => {
  const { t } = useLocalization();
  const dispatch = useAppDispatch();
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

      // Save phone number to Redux
      dispatch(setPhoneNumber(fullNumber));

      console.log("Proceed with number:", fullNumber);

      // TODO: Call your API to send OTP here
      // await sendOTPAPI(fullNumber);

      navigation.navigate("Otp");
    } else {
      console.log("Please enter a valid phone number");
      // You could show an alert or error message here
    }
  };

  // const handleContinue = async () => {
  //   if (!selectedCountry || !isValidPhone) {
  //     console.log("Please enter valid phone number");
  //     return;
  //   }

  //   const cleanNumber = phone.replace(/\D/g, "");
  //   const fullNumber = `${selectedCountry.dial_code}${cleanNumber}`;

  //   try {
  //     const response = await fetch(
  //       "http://192.168.0.108:3000/api/auth/request-otp",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ mobile: fullNumber }),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log("📲 OTP Request Response:", data);

  //     if (response.ok) {
  //       // Save number globally
  //       dispatch(setPhoneNumber(fullNumber));

  //       // Navigate to OTP screen
  //       navigation.navigate("Otp");
  //     } else {
  //       alert(data.message || "Something went wrong");
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     alert("Network error. Please try again.");
  //   }
  // };

  return (
    <View style={styles.container}>
      <Header
        image={<Logo height={scale(35)} width={scale(123)} />}
        title={undefined}
        onBackPress={() => navigation.goBack()}
        titleStyle={undefined}
        containerStyle={undefined}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={scale(20)}
        keyboardOpeningTime={0}
      >
        <View style={styles.subContent}>
          <RTLText style={styles.title}>{t("register.title")}</RTLText>

          <View style={styles.phoneInputContainer}>
            <PhoneNumberInput
              defaultCountry="SA"
              placeholder={t("phone.placeholder")}
              onCountryChange={handleCountryChange}
              onPhoneChange={handlePhoneChange}
              value={phone}
              style={styles.phoneInput}
            />

            {phone && !isValidPhone && (
              <RTLText style={styles.errorText}>{t("phone.invalid")}</RTLText>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <CustomButton
            title={t("common.continue")}
            backgroundColor={isValidPhone ? "#ffab00" : "#E0E0E0"}
            onPress={handleContinue}
            style={styles.buttonStyle}
            textColor={isValidPhone ? "#000000" : "#999999"}
            disabled={!isValidPhone}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  subContent: {
    padding: scale(20),
  },
  title: {
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
  errorText: {
    fontSize: scale(14),
    color: "#FF3B30",
    marginTop: scale(8),
    marginStart: scale(4),
  },
  termsText: {
    fontSize: scale(14),
    color: "#717171",
    textAlign: "center",
    lineHeight: scale(20),
    marginTop: scale(40),
  },
  footer: {
    padding: scale(20),
    // paddingBottom: Platform.OS === "ios" ? scale(34) : scale(20),
    paddingBottom: scale(34),
  },
  buttonStyle: {
    paddingVertical: scale(16),
    marginBottom: scale(20),
  },
});
