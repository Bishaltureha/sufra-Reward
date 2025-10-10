// import { StyleSheet, View, Platform, TextInput } from "react-native";
// import React, { useRef, useState, useEffect, useCallback } from "react";
// import Header from "../components/Header";
// import Logo from "../../assets/svg/Logo";
// import CustomButton from "../components/CustomButton";
// import { RootStackParamList } from "../types";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { useLocalization } from "../context/LocalizationContext";
// import RTLText from "../components/RTLText";
// import RTLTextInput from "../components/RTLTextInput";
// import { scale } from "../utils/dimen";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// type Props = NativeStackScreenProps<RootStackParamList, "Otp">;

// const OTP_LENGTH = 4;
// const RESEND_TIMEOUT = 120;

// const OtpScreen = ({ navigation }: Props) => {
//   const { t } = useLocalization();

//   // ✅ Manage OTP as array of digits
//   const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
//   const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);

//   // ✅ Refs for OTP inputs
//   const inputRefs = useRef<Array<TextInput | null>>([]);

//   // ✅ Countdown timer
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   // ✅ Format mm:ss
//   const formatTime = useCallback((seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   }, []);

//   // ✅ Handle OTP input
//   const handleChange = useCallback(
//     (text: string, index: number) => {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);

//       if (text && index < OTP_LENGTH - 1) {
//         inputRefs.current[index + 1]?.focus();
//       } else if (!text && index > 0) {
//         inputRefs.current[index - 1]?.focus();
//       }
//     },
//     [otp]
//   );

//   // ✅ Handle resend
//   const handleResend = useCallback(() => {
//     if (timeLeft === 0) {
//       setTimeLeft(RESEND_TIMEOUT);
//       setOtp(Array(OTP_LENGTH).fill(""));
//       inputRefs.current[0]?.focus();
//     }
//   }, [timeLeft]);

//   // ✅ Handle confirm
//   const handleConfirm = useCallback(() => {
//     const code = otp.join("");
//     if (code.length === OTP_LENGTH) {
//       console.log("Entered OTP:", code);
//       navigation.navigate("InformationScreen");
//     }
//   }, [otp, navigation]);

//   const code = otp.join("");
//   const isOtpComplete = code.length === OTP_LENGTH;

//   return (
//     <View style={styles.container}>
//       {/* Header with Logo */}
//       <Header
//         image={<Logo height={scale(35)} width={scale(123)} />}
//         title={undefined}
//         onBackPress={undefined}
//         titleStyle={undefined}
//         containerStyle={undefined}
//       />

//       <KeyboardAwareScrollView
//         contentContainerStyle={styles.scrollContent}
//         enableOnAndroid={true}
//         enableAutomaticScroll={true}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//         extraScrollHeight={scale(20)}
//         keyboardOpeningTime={0}
//       >
//         <View style={styles.subContent}>
//           <RTLText style={styles.title}>{t("otp.title")}</RTLText>

//           {/* Timer Row */}
//           <View style={styles.timerRow}>
//             <RTLText style={styles.label}>{t("otp.codeLabel")}</RTLText>
//             {timeLeft > 0 && (
//               <RTLText style={styles.timer}>
//                 {formatTime(timeLeft)} {t("otp.leftSuffix")}
//               </RTLText>
//             )}
//           </View>

//           {/* OTP Input Row */}
//           <View style={styles.otpRow}>
//             {otp.map((digit, i) => (
//               <RTLTextInput
//                 key={i}
//                 ref={(ref) => {
//                   inputRefs.current[i] = ref;
//                 }}
//                 value={digit}
//                 onChangeText={(text) => handleChange(text, i)}
//                 keyboardType="number-pad"
//                 maxLength={1}
//                 style={styles.input}
//               />
//             ))}
//           </View>

//           {/* Resend Code */}
//           <View style={styles.resendRow}>
//             <RTLText style={styles.resendText}>{t("otp.didntReceive")}</RTLText>
//             <RTLText
//               style={[
//                 styles.resendLink,
//                 { color: timeLeft > 0 ? "#B0B0B0" : "#017851" },
//               ]}
//               onPress={handleResend}
//             >
//               {t("otp.resendCode")}
//             </RTLText>
//           </View>
//         </View>

//         {/* Fixed Confirm Button */}
//         <View style={styles.footer}>
//           <CustomButton
//             title={t("common.confirm")}
//             backgroundColor={isOtpComplete ? "#ffab00" : "#B0B0B0"}
//             onPress={handleConfirm}
//             disabled={!isOtpComplete}
//             style={styles.buttonStyle}
//             textColor="#000000"
//           />
//         </View>
//       </KeyboardAwareScrollView>
//     </View>
//   );
// };

// export default OtpScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "space-between",
//   },
//   subContent: {
//     padding: scale(20),
//   },
//   title: {
//     fontSize: scale(24),
//     fontWeight: "600",
//     color: "#4A4A4A",
//   },
//   timerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: scale(20),
//   },
//   label: {
//     fontSize: scale(15),
//     fontWeight: "400",
//     color: "#717171",
//   },
//   timer: {
//     fontSize: scale(15),
//     fontWeight: "700",
//     color: "#017851",
//   },
//   otpRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: scale(20),
//   },
//   input: {
//     borderWidth: scale(1),
//     borderColor: "#E6E6E6",
//     width: scale(79),
//     height: scale(65),
//     textAlign: "center",
//     fontSize: scale(20),
//     fontWeight: "600",
//     borderRadius: scale(6),
//   },
//   resendRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: scale(25),
//   },
//   resendText: {
//     color: "#717171",
//     fontSize: scale(15),
//   },
//   resendLink: {
//     textDecorationLine: "underline",
//     fontSize: scale(15),
//     fontWeight: "600",
//   },
//   footer: {
//     padding: scale(20),
//     paddingBottom: scale(34),
//   },
//   buttonStyle: {
//     paddingVertical: scale(16),
//     marginBottom: scale(20),
//   },
// });
import { StyleSheet, View, Platform, TextInput, Alert } from "react-native";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Logo from "../../assets/svg/Logo";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLocalization } from "../context/LocalizationContext";
import RTLText from "../components/RTLText";
import RTLTextInput from "../components/RTLTextInput";
import { scale } from "../utils/dimen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/slice/user";

type Props = NativeStackScreenProps<RootStackParamList, "Otp">;

const OTP_LENGTH = 4;
const RESEND_TIMEOUT = 120;

const OtpScreen = ({ navigation }: Props) => {
  const { t } = useLocalization();
  const dispatch = useAppDispatch();
  const phoneNumber = useAppSelector((state) => state.user.phoneNumber);

  // ✅ Manage OTP as array of digits
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const [isVerifying, setIsVerifying] = useState(false);

  // ✅ Refs for OTP inputs
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // ✅ Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // ✅ Format mm:ss
  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }, []);

  // ✅ Handle OTP input
  const handleChange = useCallback(
    (text: string, index: number) => {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (!text && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  // ✅ Handle resend
  const handleResend = useCallback(async () => {
    if (timeLeft === 0) {
      try {
        // TODO: Call your resend OTP API here
        // await resendOTPAPI(phoneNumber);

        setTimeLeft(RESEND_TIMEOUT);
        setOtp(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();

        console.log("OTP resent to:", phoneNumber);
      } catch (error) {
        Alert.alert("Error", "Failed to resend OTP");
      }
    }
  }, [timeLeft, phoneNumber]);

  // ✅ Handle confirm - Verify OTP and decide navigation
  const handleConfirm = useCallback(async () => {
    const code = otp.join("");
    if (code.length === OTP_LENGTH) {
      setIsVerifying(true);

      try {
        // TODO: Replace with your actual API call
        const response = await verifyOTPAPI(phoneNumber, code);

        // Backend response structure:
        // {
        //   success: boolean,
        //   isNewUser: boolean,
        //   user: { id, phone, name?, email?, isProfileComplete? }
        // }

        if (response.success) {
          if (response.isNewUser || !response.user.isProfileComplete) {
            // New user OR profile incomplete - save basic data and go to InformationScreen
            dispatch(
              setUser({
                id: response.user.id,
                phone: response.user.phone,
                isProfileComplete: false,
              })
            );
            navigation.replace("InformationScreen");
          } else {
            // Existing user with complete profile - save full data and go to Home
            dispatch(
              setUser({
                id: response.user.id,
                phone: response.user.phone,
                name: response.user.name,
                email: response.user.email,
                isProfileComplete: true,
              })
            );
            navigation.replace("Home");
          }
        } else {
          Alert.alert("Error", "Invalid OTP. Please try again.");
          setOtp(Array(OTP_LENGTH).fill(""));
          inputRefs.current[0]?.focus();
        }
      } catch (error) {
        Alert.alert("Error", "Failed to verify OTP. Please try again.");
        console.error("OTP verification error:", error);
      } finally {
        setIsVerifying(false);
      }
    }
  }, [otp, navigation, phoneNumber, dispatch]);

  const code = otp.join("");
  const isOtpComplete = code.length === OTP_LENGTH;

  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      <Header
        image={<Logo height={scale(35)} width={scale(123)} />}
        title={undefined}
        onBackPress={undefined}
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
          <RTLText style={styles.title}>{t("otp.title")}</RTLText>

          {/* Timer Row */}
          <View style={styles.timerRow}>
            <RTLText style={styles.label}>{t("otp.codeLabel")}</RTLText>
            {timeLeft > 0 && (
              <RTLText style={styles.timer}>
                {formatTime(timeLeft)} {t("otp.leftSuffix")}
              </RTLText>
            )}
          </View>

          {/* OTP Input Row */}
          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <RTLTextInput
                key={i}
                ref={(ref) => {
                  inputRefs.current[i] = ref;
                }}
                value={digit}
                onChangeText={(text) => handleChange(text, i)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.input}
                editable={!isVerifying}
              />
            ))}
          </View>

          {/* Resend Code */}
          <View style={styles.resendRow}>
            <RTLText style={styles.resendText}>{t("otp.didntReceive")}</RTLText>
            <RTLText
              style={[
                styles.resendLink,
                { color: timeLeft > 0 ? "#B0B0B0" : "#017851" },
              ]}
              onPress={handleResend}
            >
              {t("otp.resendCode")}
            </RTLText>
          </View>
        </View>

        {/* Fixed Confirm Button */}
        <View style={styles.footer}>
          <CustomButton
            title={
              isVerifying
                ? t("common.verifying") || "Verifying..."
                : t("common.confirm")
            }
            backgroundColor={
              isOtpComplete && !isVerifying ? "#ffab00" : "#B0B0B0"
            }
            onPress={handleConfirm}
            disabled={!isOtpComplete || isVerifying}
            style={styles.buttonStyle}
            textColor="#000000"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default OtpScreen;

// ✅ Mock API function - Replace with your actual API
async function verifyOTPAPI(phone: string | null, otp: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock response - Replace with actual API call
  // Example: const response = await fetch('YOUR_API_ENDPOINT', {...});

  return {
    success: true,
    isNewUser: false, // Backend will determine this
    user: {
      id: 1,
      phone: phone || "",
      name: "John Doe", // Will be null for new users
      email: "john@example.com", // Will be null for new users
      isProfileComplete: true, // false for new users
    },
  };
}

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
  },
  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(20),
  },
  label: {
    fontSize: scale(15),
    fontWeight: "400",
    color: "#717171",
  },
  timer: {
    fontSize: scale(15),
    fontWeight: "700",
    color: "#017851",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(20),
  },
  input: {
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    width: scale(79),
    height: scale(65),
    textAlign: "center",
    fontSize: scale(20),
    fontWeight: "600",
    borderRadius: scale(6),
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(25),
  },
  resendText: {
    color: "#717171",
    fontSize: scale(15),
  },
  resendLink: {
    textDecorationLine: "underline",
    fontSize: scale(15),
    fontWeight: "600",
  },
  footer: {
    padding: scale(20),
    paddingBottom: scale(34),
  },
  buttonStyle: {
    paddingVertical: scale(16),
    marginBottom: scale(20),
  },
});
