import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import Logo from "../../assets/svg/Logo";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Otp">;

const OtpScreen = ({ navigation }: Props) => {
  // ✅ Manage OTP digits separately
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  // ✅ Timer (120s)
  const [timeLeft, setTimeLeft] = useState(120);

  // ✅ TextInput refs for auto focus
  const otp1Ref = useRef<TextInput>(null);
  const otp2Ref = useRef<TextInput>(null);
  const otp3Ref = useRef<TextInput>(null);
  const otp4Ref = useRef<TextInput>(null);

  // ✅ Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // ✅ Format mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ✅ Combine OTP digits
  const otp = otp1 + otp2 + otp3 + otp4;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with Logo */}
        <Header
          image={<Logo height={35} width={123} />}
          title={undefined}
          onBackPress={undefined}
          titleStyle={undefined}
          containerStyle={undefined}
        />

        <View style={styles.subContent}>
          <Text style={styles.title}>
            Verify your phone and login {"\n"}your account
          </Text>

          {/* Timer Row */}
          <View style={styles.timerRow}>
            <Text style={styles.label}>2FA Confirmation Code</Text>
            {timeLeft > 0 && (
              <Text style={styles.timer}>{formatTime(timeLeft)} Left</Text>
            )}
          </View>

          {/* OTP Input Row */}
          <View style={styles.otpRow}>
            <TextInput
              ref={otp1Ref}
              value={otp1}
              onChangeText={(text) => {
                setOtp1(text);
                if (text) otp2Ref.current?.focus();
              }}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.input}
            />
            <TextInput
              ref={otp2Ref}
              value={otp2}
              onChangeText={(text) => {
                setOtp2(text);
                if (text) otp3Ref.current?.focus();
                else otp1Ref.current?.focus();
              }}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.input}
            />
            <TextInput
              ref={otp3Ref}
              value={otp3}
              onChangeText={(text) => {
                setOtp3(text);
                if (text) otp4Ref.current?.focus();
                else otp2Ref.current?.focus();
              }}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.input}
            />
            <TextInput
              ref={otp4Ref}
              value={otp4}
              onChangeText={(text) => {
                setOtp4(text);
                if (!text) otp3Ref.current?.focus();
              }}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.input}
            />
          </View>

          {/* Resend Code */}
          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn’t receive the code?</Text>
            <Text
              style={[
                styles.resendLink,
                { color: timeLeft > 0 ? "#B0B0B0" : "#017851" },
              ]}
              onPress={() => {
                if (timeLeft === 0) {
                  setTimeLeft(120);
                  setOtp1("");
                  setOtp2("");
                  setOtp3("");
                  setOtp4("");
                  otp1Ref.current?.focus();
                }
              }}
            >
              Resend Code
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Confirm Button */}
      <View style={styles.footer}>
        <CustomButton
          title={"Confirm"}
          backgroundColor={otp.length === 4 ? "#ffab00" : "#B0B0B0"} // ✅ Disabled color
          onPress={() => {
            if (otp.length === 4) {
              console.log("Entered OTP:", otp);
              navigation.navigate("InformationScreen");
            }
          }}
          disabled={otp.length !== 4}
          style={styles.buttonStyle}
          textColor={"#000000"}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  scroll: { flexGrow: 1 },
  subContent: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "600", color: "#4A4A4A" },
  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  label: { fontSize: 15, fontWeight: "400", color: "#717171" },
  timer: { fontSize: 15, fontWeight: "700", color: "#017851" },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    width: 79,
    height: 65,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    borderRadius: 6,
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  resendText: { color: "#717171", fontSize: 15 },
  resendLink: {
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "600",
  },
  footer: { padding: 20 },
  buttonStyle: { paddingVertical: 16, marginBottom: 20 },
});
