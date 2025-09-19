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
import FloatingLabelInput from "../components/FloatingLabelInput";
import CustomCheckbox from "../components/CustomCheckbox";

type Props = NativeStackScreenProps<RootStackParamList, "InformationScreen">;

const InformationScreen = ({ navigation }: Props) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveOffers, setReceiveOffers] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
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
          Enter your information to {"\n"}continue
        </Text>

        <View style={{ gap: 10, marginTop: 20 }}>
          <FloatingLabelInput
            label="First Name*"
            keyboardType="ascii-capable"
          />
          <FloatingLabelInput label="Last Name*" keyboardType="ascii-capable" />
          <FloatingLabelInput label="Email Address*" keyboardType="default" />
        </View>

        {/* Checkboxes */}
        <View style={styles.checkboxRow}>
          <CustomCheckbox checked={acceptTerms} onChange={setAcceptTerms} />
          <Text style={styles.checkboxText}>
            I accept the{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Terms and Conditions
            </Text>
          </Text>
        </View>

        <View style={styles.checkboxRow}>
          <CustomCheckbox checked={receiveOffers} onChange={setReceiveOffers} />
          <Text style={styles.checkboxText}>Receive offers and promotions</Text>
        </View>
      </View>

      {/* Fixed button at bottom */}
      <View style={styles.footer}>
        <CustomButton
          title={"Register"}
          backgroundColor="#ffab00"
          onPress={() => navigation.navigate("Login")}
          style={styles.buttonStyle}
          textStyle={undefined}
          textColor={"#000000"}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4A4A4A",
    textAlign: "left",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  checkboxText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 8,
    flexShrink: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  buttonStyle: {
    paddingVertical: 16,
    marginBottom: 20,
  },
});
