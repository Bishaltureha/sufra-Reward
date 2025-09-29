import { StyleSheet, View, KeyboardAvoidingView, Text } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Logo from "../../assets/svg/Logo";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FloatingLabelInput from "../components/FloatingLabelInput";
import CustomCheckbox from "../components/CustomCheckbox";
import { useLocalization } from "../context/LocalizationContext";
import RTLText from "../components/RTLText";
import { scale } from "../utils/dimen";

type Props = NativeStackScreenProps<RootStackParamList, "InformationScreen">;

const InformationScreen = ({ navigation }: Props) => {
  const { t } = useLocalization();

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveOffers, setReceiveOffers] = useState(false);

  // const handleRegister = () => {
  //   // You can now access all form data here
  //   const formData = { firstName, lastName, email, acceptTerms, receiveOffers };
  //   console.log("Form Data:", formData);

  //   // Navigate to Home
  //   navigation.navigate("Home");
  // };
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleRegister = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert("Please fill all fields.");
      return;
    }

    if (!acceptTerms) {
      alert("Please accept Terms & Conditions.");
      return;
    }

    // Form data ready
    const formData = { firstName, lastName, email, acceptTerms, receiveOffers };
    console.log("Form Data:", formData);

    // Navigate to Home
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Header */}
      <Header
        image={<Logo height={scale(35)} width={scale(123)} />}
        title={undefined}
        onBackPress={undefined}
        titleStyle={undefined}
        containerStyle={undefined}
      />

      {/* Content */}
      <View style={styles.subContent}>
        <RTLText style={styles.title}>{t("info.title")}</RTLText>

        <View style={{ gap: scale(10), marginTop: scale(20) }}>
          <FloatingLabelInput
            label={t("info.firstName")}
            keyboardType="ascii-capable"
            value={firstName}
            onChangeText={setFirstName}
          />
          <FloatingLabelInput
            label={t("info.lastName")}
            keyboardType="ascii-capable"
            value={lastName}
            onChangeText={setLastName}
          />
          <FloatingLabelInput
            label={t("info.email")}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Checkboxes */}
        <View style={styles.checkboxRow}>
          <CustomCheckbox checked={acceptTerms} onChange={setAcceptTerms} />
          <RTLText style={styles.checkboxText}>
            {t("info.acceptTerms")}
            <RTLText style={{ textDecorationLine: "underline" }}>
              {t("info.termsAndConditions")}
            </RTLText>
          </RTLText>
        </View>

        <View style={styles.checkboxRow}>
          <CustomCheckbox checked={receiveOffers} onChange={setReceiveOffers} />
          <RTLText style={styles.checkboxText}>
            {t("info.receiveOffers")}
          </RTLText>
        </View>
      </View>

      {/* Fixed button at bottom */}
      <View style={styles.footer}>
        <CustomButton
          title={t("welcome.register")}
          backgroundColor="#ffab00"
          onPress={handleRegister}
          style={styles.buttonStyle}
          textColor="#000000"
          disabled={
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !isValidEmail(email) ||
            !acceptTerms
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default InformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  subContent: {
    flex: 1,
    padding: scale(20),
  },
  title: {
    fontSize: scale(24),
    fontWeight: "600",
    color: "#4A4A4A",
    textAlign: "left",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(16),
  },
  checkboxText: {
    color: "#000000",
    fontSize: scale(14),
    fontWeight: "400",
    marginStart: scale(8),
    flexShrink: 1,
  },
  footer: {
    padding: scale(20),
    backgroundColor: "#ffffff",
  },
  buttonStyle: {
    paddingVertical: scale(16),
    marginBottom: scale(20),
  },
});
